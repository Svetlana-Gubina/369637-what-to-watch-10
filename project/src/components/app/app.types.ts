export type Review = {
  id: number;
  author: string;
  text: string;
  date: Date;
  rate: number;
};

export type FilmItemType = {
  id: number;
  imgSrc: string;
  name: string;
  genre?: string;
  year?: string;
  description?: string;
  director?: string;
  cast?: string;
  runtime?: string;
  reviews?: Review[];
};

export type Props = {
  films: FilmItemType[];
};
