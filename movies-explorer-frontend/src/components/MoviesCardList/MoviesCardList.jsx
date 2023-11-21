import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import useCurrentWidth from '../../utils/UseCurrentWidth.js';
import { getLoadStep, getInitialCount } from '../../utils/getMoviesCountWidth.js';


function MoviesCardList({ movies, isLoadingMovies, errMessage, handleMovieLike, savedMovies, compareId, handleSavedMovieDelete, disableBtnSaveMovie, disableBtnDelMovie }) {
  const moviesCardListRef = useRef();

  let location = useLocation();

  const { width } = useCurrentWidth(moviesCardListRef);

  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);

  useEffect(() => {
    setVisibleMoviesCount(getInitialCount(width));
  }, [width]);

  function handleLoadMoreMovies() {
    setVisibleMoviesCount(prev => prev + getLoadStep(width));
  }

  return (
    <section className="moviesCardList">
      <div
        className="moviesCardList__container"
        ref={moviesCardListRef}
      >
        {
          isLoadingMovies ? <Preloader /> :
          errMessage ? <ErrorMessage errorMessage={errMessage} style={{fontSize: '20px', lineHeight:'1em', textAlign: 'center'}} /> :
          <>
            <ul
              className="moviesCardList__list"
            >
              {
                (location.pathname === '/movies') && movies.slice(0, visibleMoviesCount).map(item =>
                  <MoviesCard
                    compareId={compareId}
                    savedMovies={savedMovies}
                    handleMovieLike={handleMovieLike}
                    film={item}
                    key={item.id}
                    disableBtnSaveMovie={disableBtnSaveMovie}
                  />
                )
              }
              {
                (location.pathname === '/saved-movies') && movies.map(item =>
                  <MoviesCard
                    handleSavedMovieDelete={handleSavedMovieDelete}
                    film={item}
                    key={item.movieId}
                    disableBtnDelMovie={disableBtnDelMovie}
                  />
                )
              }
            </ul>

            {
              (location.pathname === '/movies') && (visibleMoviesCount < movies.length) &&
              <button
                onClick={handleLoadMoreMovies}
                className="moviesCardList__button-add"
                type="button"
                aria-label="Кнопка ещё"
              >
                Ещё
              </button>
            }
          </>
        }
      </div>
    </section>
  );
}

export default MoviesCardList;