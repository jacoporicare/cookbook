export = matchSorter;

interface Options {
  keys?: string[];
}

declare function matchSorter<T>(arr: T[], s: string, options?: Options): T[];
