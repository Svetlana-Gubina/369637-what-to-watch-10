/* eslint-disable quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import type { Props } from "./SmallFilmCard.types";

function SmallFilmCard({ imgSrc, name, link }: Props): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imgSrc} alt={name} width={280} height={175} />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={link}>
          {name}
        </a>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
