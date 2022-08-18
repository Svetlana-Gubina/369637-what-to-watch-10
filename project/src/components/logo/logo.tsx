import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Props } from './logo.types';

function Logo({ classNameModifier }: Props): JSX.Element {
  return (
    <div className='logo'>
      <Link to='/' className={`logo__link ${classNameModifier}`}>
        <span className='logo__letter logo__letter--1'>W</span>
        <span className='logo__letter logo__letter--2'>T</span>
        <span className='logo__letter logo__letter--3'>W</span>
      </Link>
    </div>
  );
}

export default memo(Logo);
