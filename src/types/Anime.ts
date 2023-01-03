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
  format?: number;
  episodes?: number;
  duration?: number;

  characters: {
    nodes: Array<{
      id: string;
      name?: {
        full?: string;
      };
      image?: {
        large?: string;
        medium?: string;
      };
    }>;
  };

  staff: {
    nodes: Array<{
      id: string;
      name?: {
        full?: string;
      };
      primaryOccupations: Array<string>;
      image?: {
        large?: string;
        medium?: string;
      };
    }>;
  };
};
