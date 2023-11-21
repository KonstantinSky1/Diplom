export function filterMovies(checkboxStatus, allMovies, valuesSearch) {
  return allMovies.filter(film => (film.nameRU).toLowerCase().includes(valuesSearch.toLowerCase()) &&
    (checkboxStatus === true ? film.duration <= 40 : film.duration > 40));
}

export function filterMoviesCheckboxStatus(checkboxStatus, allMovies) {
  return allMovies.filter(film => checkboxStatus === true ? film.duration <= 40 : film.duration > 40);
}