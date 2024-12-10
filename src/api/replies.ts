import { Locales, Status } from '../types';

export type TArticle = {
  id: number;
  ext_id: number;
  rank: number;
  status: Status;
  highlight: {
    title: string;
    body: string;
  };
  public_urls: Record<Locales, string>;
  created_at: Date;
  updated_at: Date;
  published_at: Date | null;
  author: string;
  title: Record<Locales, string>;
};

export type TArticleReply = {
  next: string;
  previous: string;
  results: TArticle[];
};

export type TCategoriesReply = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: number;
      name: Record<Locales, string>;
      public: false;
      image_path: string;
    },
  ];
};

export type TInstanceReply = {
  plan: string;
  locales: string[];
  default_locale: string;
  currency: string;
  base_url: string;
  brand: string;
  logo: string;
  favicon: string;
  spinner: string;
  html_title: string;
  authentication_providers: string[];
  issue_tracker: string;
  n_weekly_aqi: number;
  n_weekly_lai: number;
  ticket_form: string;
  features: string[];
  license: {
    code: string;
    expires_at: Date;
    status: string;
    features: string[];
    limits: {
      agents: number;
    };
  };
};
