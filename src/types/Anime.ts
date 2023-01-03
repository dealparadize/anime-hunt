export type Anime = {
  id: string;
  title: {
    english?: string;
    native?: string;
  };
  description?: string;
  type: string;
  genres?: [string];
  status: string;
  bannerImage?: string;
  coverImage?: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    color?: string;
  };
  averageScore?: string;
};
