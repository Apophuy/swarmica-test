import { Locales, Order, Status } from '../types';

export type TCategoriesRequest = {
  limit?: number;
  offset?: number;
  ordering?: Order;
  public?: boolean;
};

export type TArticlesRequest = {
  search: string;
  category?: number;
  locale?: Locales;
  status?: Status[];
  cursor?: string;
};
