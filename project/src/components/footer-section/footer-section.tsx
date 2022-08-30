import React, { memo } from 'react';
import Logo from '../logo/logo';

function FooterSection(): JSX.Element {
  return (
    <footer className='page-footer'>
      <Logo classNameModifier={'logo__link--ligh'} />
      <div className='copyright'>
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default memo(FooterSection);
