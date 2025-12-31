'use client';

import { Plus, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { RecipeImportModal } from '@/components/RecipeImport/RecipeImportModal';
import { FabContainer } from '@/components/common/FabContainer';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHideOnScroll } from '@/hooks/useHideOnScroll';

export function RecipeListFab() {
  const router = useRouter();
  const fabHidden = useHideOnScroll();
  const [importModalVisible, setImportModalVisible] = useState(false);

  return (
    <>
      <FabContainer>
        <div
          className={`
            transition-transform duration-200 ease-out
            ${fabHidden ? 'scale-0' : 'scale-100'}
          `}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" className="size-14 rounded-full shadow-lg">
                <Plus className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="mb-2">
              <DropdownMenuItem onClick={() => router.push('/novy-recept')}>
                <Plus className="mr-2 size-4" />
                Vytvořit nový
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setImportModalVisible(true)}>
                <Sparkles className="mr-2 size-4" />
                Vytvořit pomocí AI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </FabContainer>
      <RecipeImportModal
        show={importModalVisible}
        onClose={() => setImportModalVisible(false)}
      />
    </>
  );
}
