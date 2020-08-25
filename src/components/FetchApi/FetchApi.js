const Api = '29e884a4d6c7875743e082626c09e382';
const Url = `https://api.themoviedb.org/3/trending/all/day?api_key=${Api}`;
const UrlId = 'https://api.themoviedb.org/3/movie/';
const UrlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${Api}&language=en-US&query=`;
const getMovies = () => {
  return fetch(Url)
    .then(res => res.json())
    .then(res => res.results);
};
const getMoviesId = movieId => {
  return fetch(`${UrlId}${movieId}?api_key=${Api}&language=en-US`).then(res =>
    res.json(),
  );
};
const getMoviesCast = movieId => {
  return fetch(`${UrlId}${movieId}/credits?api_key=${Api}`).then(res =>
    res.json(),
  );
};
const getMoviesReview = movieId => {
  return fetch(
    `${UrlId}${movieId}/reviews?api_key=${Api}&language=en-US&page=1`,
  ).then(res => res.json());
};
const getMoviesSearch = query => {
  return fetch(`${UrlSearch}${query}&page=1&include_adult=false`).then(res =>
    res.json(),
  );
};

export default {
  getMovies,
  getMoviesId,
  getMoviesCast,
  getMoviesReview,
  getMoviesSearch,
};
