import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import './MoviesCard.css';
import { formatDuration } from '../../utils/calcTime.js';

function MoviesCard({ film, handleMovieLike, savedMovies, compareId, handleSavedMovieDelete, disableBtnSaveMovie, disableBtnDelMovie }) {

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    (savedMovies || []).forEach(savedMovie => {
      if (savedMovie.movieId === film.id) {
        setIsLiked(true);
      }
    });
  }, [compareId]);

  function handleLike() {
    handleMovieLike(film, setIsLiked, isLiked);
  }

  function handleDelete() {
    handleSavedMovieDelete(film);
  }

  return (
    <li className="film-card">
      <div className="film-card__imageBlock">
  {/* в некоторых фильмах trailerLink не содержит URL и при клике возникают ужасные последствия, поэтому проверка: */}
        {
          (film.trailerLink === null || film.trailerLink === undefined || !film.trailerLink.includes('http')) ?
            <a href="#" style={{cursor: 'auto'}} onClick={(e) => e.preventDefault()}>
              <img
                className="film-card__image"
                src={(typeof film.image === 'string') ? film.image :`https://api.nomoreparties.co${film.image.url}`}
                alt={film.nameRU}
              />
            </a> :
            <a href={film.trailerLink} target="_blank">
              <img
                className="film-card__image"
                src={(typeof film.image === 'string') ? film.image :`https://api.nomoreparties.co${film.image.url}`}
                alt={film.nameRU}
              />
            </a>
        }
      </div>

      <div className="film-card__content">
        <div className="film-card__description">
          <h2 className="film-card__title">
            {film.nameRU}
          </h2>
          <div>
            <Switch>
                <Route path="/movies">
                  <button
                    onClick={handleLike}
                    className={`film-card__button-save-film ${isLiked && "film-card__button-save-film_type_saved"}`}
                    type="button"
                    aria-label="Сохранить фильм"
                    disabled={disableBtnSaveMovie}
                  ></button>
                </Route>

                <Route path="/saved-movies">
                  <button
                    onClick={handleDelete}
                    className="film-card__button-delete-film"
                    type="button"
                    aria-label="Удалить фильм"
                    disabled={disableBtnDelMovie}
                  ></button>
                </Route>
            </Switch>
          </div>
        </div>

        <p className="film-card__duration">
          {formatDuration(film.duration)}
        </p>
      </div>
    </li>
  );
}

export default MoviesCard;