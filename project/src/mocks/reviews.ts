import { v4 as uuidv4 } from 'uuid';
import type { Review } from '../components/app/app.types';
import { MAX_RATING } from '../pages/add-review/add-review.constants';

const randomNames = [
  'Joseph Thomas',
  'Heather Miller',
  'Collin Evans',
  'Jeremy Pierce',
  'Carrie Jones',
  'Christine Mcdaniel',
  'Deborah Garrison',
  'Dale Carroll',
  'Robert Wilson',
  'Ashley Moore',
  'Michael Rojas',
  'Helen Stevens',
  'Michelle Vega',
  'Nicholas Summers',
  'Randy Morrison',
  'Christopher Andrade',
  'Brenda Freeman',
  'Alan Monroe',
];

const randomText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt bibendum cursus. Aenean et mi tempus, laoreet leo et, facilisis mi. Cras tempus arcu sed ligula mollis, at accumsan nisi mollis. Nunc pharetra, magna ut dapibus pharetra, elit justo efficitur neque, non viverra felis turpis sodales metus. Proin porttitor rhoncus quam, tempor varius turpis ultrices quis. Aliquam erat volutpat. Etiam condimentum tempus sem, a aliquet libero rhoncus fringilla. Praesent vel mollis nulla. Mauris cursus molestie mi, ut gravida odio elementum sed. Duis et euismod metus. Aenean egestas tempus eleifend. Praesent sit amet erat et est consectetur facilisis. Vivamus congue, turpis eget accumsan venenatis, arcu tellus dignissim eros, sit amet malesuada lorem sapien id nibh.Integer sit amet volutpat leo. Curabitur quis nisl at elit mattis placerat malesuada ac magna. Morbi sed odio urna. Duis sagittis fermentum dolor id mattis. Morbi fringilla, turpis quis elementum aliquet, nisi velit maximus nisl, vitae tristique metus diam quis nulla. Curabitur dictum interdum leo. Phasellus in purus hendrerit, accumsan urna in, finibus ipsum. Aliquam commodo ligula in sagittis fermentum. Sed tempor diam lectus, sit amet venenatis enim vulputate ac. Curabitur eget mauris et enim mattis molestie. Donec felis libero, consectetur sit amet sagittis in, dapibus auctor metus. Aliquam dolor purus, ullamcorper nec tincidunt eu, ultrices eu ex. Donec at vestibulum est, volutpat accumsan lectus. Mauris vehicula tellus sed diam laoreet porta. In non faucibus arcu. Maecenas nec tortor vitae mauris lobortis sagittis blandit non sapien. Integer in fringilla diam, in pellentesque nulla. Donec vitae molestie urna. Nam iaculis mauris eu odio maximus, eu rutrum nunc congue. Nam in elit a ex tincidunt tristique at et tortor. Suspendisse pulvinar ullamcorper magna, condimentum pulvinar nisl vehicula non. Aliquam ultricies lorem sed ipsum posuere volutpat. Quisque cursus bibendum lectus, vitae laoreet sapien hendrerit ut. In vitae ligula odio. Curabitur pulvinar risus vel libero laoreet posuere. Proin aliquet viverra metus, pulvinar interdum quam placerat id. Proin lorem nibh, consequat eu mattis vitae, feugiat eget sem. Etiam feugiat tempus sapien, a maximus risus gravida vel. Etiam porttitor nisl quis lorem interdum tempor. Maecenas vel ligula in leo sagittis blandit. Aenean sit amet vehicula turpis. Aenean volutpat sem ut rhoncus auctor. Aenean tempor vehicula ipsum, eget venenatis massa sodales ac. Vestibulum auctor varius velit, eu accumsan dui consequat et. Aenean eget nunc eu tortor egestas fermentum nec ut felis. Praesent maximus tellus diam, nec rutrum nulla hendrerit vitae. Donec aliquet sit amet sem vitae imperdiet. Nunc tempus libero sed finibus cursus. Curabitur sollicitudin libero sem, ut mattis tortor laoreet quis. In nec mollis nulla. Nullam a auctor nunc.';

const sentences = randomText.split('.');

const MAX_REVIEWS = 20;
const MAX_REVIEW_LENGTH = 5;
const RANDOM_START_DATE = new Date('2012, 10, 10');

const getRandomInteger = (max: number): number =>
  Math.floor(Math.random() * max);

const getRandomFromArray = (arr: string[]) => arr[getRandomInteger(arr.length)];

const getrandomDate = (start: Date, end: Date): Date => {
  const newdate = new Date(
    start.getTime() + getRandomInteger(end.getTime() - start.getTime())
  );
  return newdate;
};

const getReviewMessage = () => {
  const message = Array.from(Array(MAX_REVIEW_LENGTH).keys())
    .map((key) => getRandomFromArray(sentences))
    .join('.');
  return message;
};

const getReview = (): Review => {
  const newReview = {
    id: Number(uuidv4()),
    author: getRandomFromArray(randomNames),
    text: getReviewMessage(),
    date: getrandomDate(RANDOM_START_DATE, new Date()),
    rate: Number((Math.random() * MAX_RATING).toFixed(1)),
  };
  return newReview;
};

export const getReviews = (): Review[] =>
  Array.from(Array(getRandomInteger(MAX_REVIEWS)).keys()).map((r) =>
    getReview()
  );
