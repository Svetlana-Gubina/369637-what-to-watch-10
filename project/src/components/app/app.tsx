import React from 'react';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import type { Props } from './app.types';

function App({ films }: Props): JSX.Element {
  return <WelcomeScreen films={films} />;
}

export default App;
