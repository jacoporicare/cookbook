declare module 'match-sorter' {
  export = matchSorter;

  interface Options {
    keys?: string[];
  }

  function matchSorter<T>(arr: T[], s: string, options?: Options): T[];
}
