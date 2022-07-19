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
};

export type Props = {
  films: FilmItemType[];
};
