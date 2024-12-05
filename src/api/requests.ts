export type TArticle = {
  next: string;
  previous: string;
  results: [
    {
      id: number;
      ext_id: number;
      rank: number;
      status: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      highlight: any;
      public_urls: string;
      created_at: Date;
      updated_at: Date;
      published_at: Date;
      author: string;
    },
  ];
};

export type TCategories = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: number;
      name: {
        en: string;
        hi: string;
      };
      public: false;
      image_path: string;
    },
  ];
};

export type TInstance = {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  license: any;
};
