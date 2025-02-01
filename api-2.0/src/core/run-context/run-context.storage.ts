import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Store>();

type Store = Record<string | symbol, any>;

export const RunContextStorage = {
  run<T>(callback: () => T): T {
    const store: Store = {};

    return asyncLocalStorage.run(store, callback);
  },

  getStore(): Store | undefined {
    return asyncLocalStorage.getStore();
  },

  get<T extends keyof Store>(key: T): Store[T] {
    return this.getStore()?.[key];
  },
} as const;
