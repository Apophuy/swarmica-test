export enum Locales {
  'ru' = 'ru',
  'en' = 'en',
}

export type Status = 'APPROVED' | 'ARCHIVED' | 'DRAFT' | 'PUBLISHED' | 'UNAPPROVED';

export type Order = 'id' | '-id';

export type TSearchParams = {
  search: string;
  category?: number;
  locale?: Locales;
  status?: Status[];
};
