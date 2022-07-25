/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
import React from 'react';
import PlayerComponent from './player-component/player-component';
import useUrlParam from '../../hooks/useUrlParam/useUrlParam';
import type { Props } from './player.types';

function Player({ films }: Props): JSX.Element | null {
  const currentFilm = useUrlParam(films);

  if (!currentFilm) {
    return null;
  }

  return (
    <div className='player'>
      <PlayerComponent
        id={currentFilm.id}
        imgSrc={currentFilm.imgSrc}
        name={currentFilm.name}
        isFullPage
      />
    </div>
  );
}

export default Player;
