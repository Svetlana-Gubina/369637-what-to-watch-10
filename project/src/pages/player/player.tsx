import React from 'react';
import PlayerComponent from '../../components/player-component/player-component';
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
        imgSrc={currentFilm.previewImage}
        name={currentFilm.name}
        isFullPage
      />
    </div>
  );
}

export default Player;
