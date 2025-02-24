export class Ingredient {
  constructor(
    public name: string,
    public amount: number | null,
    public amountUnit: string | null,
    public isGroup: boolean,
  ) {}
}
