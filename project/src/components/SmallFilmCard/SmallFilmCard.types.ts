/* eslint-disable quotes */
import type { FilmItemType } from "../app/app.types";

export type Props = Omit<FilmItemType, "id">;
