export const checkGenreMathFilter = (genre: string, activeGenre: number) => {
  let result;
  switch (activeGenre) {
    case 1:
      result = genre === 'Comedy';
      break;
    case 2:
      result = genre === 'Crime';
      break;
    case 3:
      result = genre === 'Documentary';
      break;
    case 4:
      result = genre === 'Drama';
      break;
    case 5:
      result = genre === 'Horror';
      break;
    case 6:
      result = genre === 'Adventure';
      break;
    case 7:
      result = genre === 'Romance';
      break;
    case 8:
      result = genre === 'Sci-Fi';
      break;
    case 9:
      result = genre === 'Thriller';
      break;
    default:
      result = true;
      break;
  }

  return result;
};
