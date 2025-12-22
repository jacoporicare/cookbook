import * as cheerio from 'cheerio';
import { AbortController } from 'node-abort-controller';
import fetch from 'node-fetch';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { ParsedChatCompletion } from 'openai/resources/chat/completions';
import { z } from 'zod';

import { RecipeInput } from '../generated/graphql';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Fetches HTML content from a URL with a browser-like user agent
 */
async function fetchUrlContent(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'cs,en-US;q=0.9,en;q=0.8',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    throw new Error(
      'Nepodařilo se načíst recept z této URL. Zkontrolujte připojení k internetu.',
    );
  }
}

/**
 * Cleans HTML content by removing navigation, ads, scripts
 */
function cleanHtml(html: string): string {
  const $ = cheerio.load(html);

  // Remove unwanted elements
  $(
    'script, style, nav, header, footer, iframe, .ad, .advertisement, .cookie',
  ).remove();

  return $('body').html() || '';
}

// Zod schema for structured output - matches GraphQL RecipeInput and IngredientInput types
const IngredientSchema = z.object({
  name: z.string().describe('Název ingredience v nominativu'),
  amount: z.number().nullable().optional().describe('Množství (číslo)'),
  amountUnit: z
    .string()
    .nullable()
    .optional()
    .describe('Jednotka (g, ml, lžíce, ks, atd.)'),
  isGroup: z
    .boolean()
    .optional()
    .default(false)
    .describe(
      'True pokud je to nadpis skupiny (Těsto, Náplň, atd.), false pro běžnou ingredienci',
    ),
});

const RecipeSchema = z.object({
  title: z.string().describe('Název receptu'),
  directions: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Postup přípravy s číslovanými kroky oddělený \\n, formátovaný pomocí Markdown',
    ),
  sideDish: z.string().nullable().optional().describe('Doporučená příloha'),
  preparationTime: z
    .number()
    .int()
    .nullable()
    .optional()
    .describe('Celková doba přípravy v minutách'),
  servingCount: z.number().int().nullable().optional().describe('Počet porcí'),
  ingredients: z
    .array(IngredientSchema)
    .nullable()
    .optional()
    .describe('Seznam ingrediencí'),
  tags: z
    .array(z.string())
    .nullable()
    .optional()
    .describe('Tagy/kategorie receptu'),
});

// Type inference from Zod schema
type ParsedRecipe = z.infer<typeof RecipeSchema>;

/**
 * Parses recipe from cleaned HTML using OpenAI with structured output
 */
async function parseRecipeWithAI(cleanedHtml: string): Promise<RecipeInput> {
  const systemPrompt = `Jsi expert na extrakci receptů z webových stránek. Tvým úkolem je analyzovat HTML obsah a extrahovat recept do strukturovaného formátu.

PRAVIDLA PRO ZPRACOVÁNÍ:

1. **Ingredience**:
   - Normalizuj české názvy ingrediencí do nominativu (základního tvaru): "cukru" → "cukr", "mouky" → "mouka"
   - Zachovej co nejvíc z názvu ingredience, pokud je to možné, včetně doplňkových informací v závorkách (např. "600g vepřového maso (plec nebo kýta)" → {name: "vepřové maso (plec nebo kýta)", amount: 600, amountUnit: "g"})
   - Odděluj množství, jednotku a název: "150 g cukru" → {name: "cukr", amount: 150, amountUnit: "g"}
   - Rozpoznávej skupiny ingrediencí (Těsto, Náplň, Poleva atd.) a označ je pomocí isGroup: true
   - Pro skupiny nastav name na název skupiny a isGroup: true (bez amount/amountUnit)
   - Ignoruj nepovinné předložky a členy

2. **Postup přípravy**:
   - Používej číslované kroky (1., 2., 3., ...)
   - Formátuj pomocí Markdown: **tučně** pro důležité kroky, *kurzíva* pro poznámky
   - Každý krok na nový řádek oddělený \\n

3. **Ostatní pole**:
   - preparationTime: celková doba v minutách, často bude jako "15-20 minut" nebo "30 minut" nebo "45 min", "1h" apod.
   - servingCount: počet porcí
   - sideDish: doporučená příloha (pokud je zmíněna)
   - tags: kategorie receptu (např. "sladké", "hlavní jídlo", "pečení")

4. **Pouze title je povinný** - pro ostatní pole udělej best effort, pokud nejsou dostupná, vynechej je

PŘÍKLADY NORMALIZACE:

"150 g cukru krupice" → {name: "cukr krupice", amount: 150, amountUnit: "g"}
"600g vepřového maso (plec nebo kýta)" → {name: "vepřové maso (plec nebo kýta)", amount: 600, amountUnit: "g"}
"2 lžíce oleje" → {name: "olej", amount: 2, amountUnit: "lžíce"}
"špetka soli" → {name: "sůl", amountUnit: "špetka"}
"3 vejce" → {name: "vejce", amount: 3, amountUnit: "ks"}

SKUPINY:
Když vidíš sekce jako "Na těsto:", "Náplň:", "Poleva:", vytvoř nejdřív položku skupiny a pak ingredience pod ní:
{name: "Na těsto", isGroup: true}
{name: "mouka", amount: 250, amountUnit: "g"}`;

  try {
    const completion: ParsedChatCompletion<ParsedRecipe> =
      await openai.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Extrahuj recept z tohoto HTML:\n\n${cleanedHtml.substring(0, 50000)}`,
          },
        ],
        response_format: zodResponseFormat(RecipeSchema, 'recipe'),
        temperature: 0.2,
      });

    const parsed = completion.choices[0]?.message?.parsed;

    if (!parsed?.title || parsed.title.trim().length === 0) {
      throw new Error('Na této stránce nebyl nalezen žádný recept.');
    }

    const recipe: RecipeInput = {
      title: parsed.title,
      directions: parsed.directions ?? undefined,
      sideDish: parsed.sideDish ?? undefined,
      preparationTime: parsed.preparationTime ?? undefined,
      servingCount: parsed.servingCount ?? undefined,
      ingredients: parsed.ingredients?.map((ing) => ({
        name: ing.name,
        amount: ing.amount ?? undefined,
        amountUnit: ing.amountUnit ?? undefined,
        isGroup: ing.isGroup,
      })),
      tags: parsed.tags ?? undefined,
    };

    return recipe;
  } catch (error: unknown) {
    if (error instanceof OpenAI.APIError) {
      if (error.status === 429 || error.message.includes('rate_limit')) {
        throw new Error('Překročen limit požadavků. Zkuste to prosím později.');
      }
    }
    if (error instanceof Error && error.message.includes('nebyl nalezen')) {
      throw error;
    }
    throw new Error('Nastala neočekávaná chyba při importu receptu.');
  }
}

/**
 * Main function to import recipe from URL
 */
export async function importRecipeFromUrl(url: string): Promise<RecipeInput> {
  const html = await fetchUrlContent(url);
  const cleanedHtml = cleanHtml(html);
  const recipe = await parseRecipeWithAI(cleanedHtml);

  return recipe;
}
