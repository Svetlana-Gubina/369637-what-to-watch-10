import type { FilmItemType, Props as AppProps } from '../app/app.types';

export type Props = FilmItemType & Pick<AppProps, 'films'>;
