import { RunContextStorage } from './run-context.storage';

export class RunContextStoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RunContextStoreError';
  }
}

export class RunContextVar<T> {
  private readonly symbol: symbol;

  constructor(
    private readonly name: string,
    private readonly defaultValue?: T,
  ) {
    this.symbol = Symbol(name);
  }

  set(value: T): void {
    const store = RunContextStorage.getStore();

    if (!store) {
      throw new RunContextStoreError('You cannot set value outside of run context');
    }

    store[this.symbol] = value;
  }

  clear(): void {
    const store = RunContextStorage.getStore();

    if (!store) {
      throw new RunContextStoreError('You cannot clear value outside of run context');
    }

    delete store[this.symbol];
  }

  get(): T {
    const store = RunContextStorage.getStore();

    if (!store || !(this.symbol in store)) {
      if (this.defaultValue === undefined) {
        throw new RunContextStoreError(`Variable "${this.name}" not found`);
      } else {
        return this.defaultValue;
      }
    } else {
      return store[this.symbol];
    }
  }

  exists(): boolean {
    const store = RunContextStorage.getStore();

    return !!(store && this.symbol in store);
  }
}
