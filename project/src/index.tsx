import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const films = [
  {
    id: 1,
    imgSrc: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    link: 'film-page.html',
  },
  {
    id: 2,
    imgSrc: 'img/bohemian-rhapsody.jpg',
    name: 'Bohemian Rhapsody',
    link: 'film-page.html',
  },
  {
    id: 3,
    imgSrc: 'img/macbeth.jpg',
    name: 'Macbeth',
    link: 'film-page.html',
  },
  {
    id: 4,
    imgSrc: 'img/aviator.jpg',
    name: 'Aviator',
    link: 'film-page.html',
  },
  {
    id: 5,
    imgSrc: 'img/we-need-to-talk-about-kevin.jpg',
    name: 'We need to talk about Kevin',
    link: 'film-page.html',
  },
  {
    id: 6,
    imgSrc: 'img/what-we-do-in-the-shadows.jpg',
    name: 'What We Do in the Shadows',
    link: 'film-page.html',
  },
  {
    id: 7,
    imgSrc: 'img/revenant.jpg',
    name: 'Revenant',
    link: 'film-page.html',
  },
  {
    id: 8,
    imgSrc: 'img/johnny-english.jpg',
    name: 'Johnny English',
    link: 'film-page.html',
  },
  {
    id: 9,
    imgSrc: 'img/shutter-island.jpg',
    name: 'Shutter Island',
    link: 'film-page.html',
  },
  {
    id: 10,
    imgSrc: 'img/pulp-fiction.jpg',
    name: 'Pulp Fiction',
    link: 'film-page.html',
  },
  {
    id: 11,
    imgSrc: 'img/no-country-for-old-men.jpg',
    name: 'No Country for Old Men',
    link: 'film-page.html',
  },
  {
    id: 12,
    imgSrc: 'img/snatch.jpg',
    name: 'Snatch',
    link: 'film-page.html',
  },
  {
    id: 13,
    imgSrc: 'img/moonrise-kingdom.jpg',
    name: 'Moonrise Kingdom',
    link: 'film-page.html',
  },
  {
    id: 14,
    imgSrc: 'img/seven-years-in-tibet.jpg',
    name: 'Seven Years in Tibet',
    link: 'film-page.html',
  },
  {
    id: 15,
    imgSrc: 'img/midnight-special.jpg',
    name: 'Midnight Special',
    link: 'film-page.html',
  },
  {
    id: 16,
    imgSrc: 'img/war-of-the-worlds.jpg',
    name: 'War of the Worlds',
    link: 'film-page.html',
  },
  {
    id: 17,
    imgSrc: 'img/dardjeeling-limited.jpg',
    name: 'Dardjeeling Limited',
    link: 'film-page.html',
  },
  {
    id: 18,
    imgSrc: 'img/orlando.jpg',
    name: 'Orlando',
    link: 'film-page.html',
  },
  {
    id: 19,
    imgSrc: 'img/mindhunter.jpg',
    name: 'Mindhunter',
    link: 'film-page.html',
  },
  {
    id: 20,
    imgSrc: 'img/midnight-special.jpg',
    name: 'Midnight Special',
    link: 'film-page.html',
  },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={films} />
  </React.StrictMode>
);
