export type FilmItemType = {
  id: number;
  imgSrc: string;
  name: string;
  link: string;
};

export type Props = {
  films: FilmItemType[];
};
