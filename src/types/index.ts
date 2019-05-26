export * from './models';
export * from './common';

export type SideDish = {
  title: string;
  sideWeight?: string;
  mainWeight?: string;
  multiplicator?: number;
};
