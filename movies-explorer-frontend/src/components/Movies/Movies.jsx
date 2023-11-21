import React, { useState, useEffect, useContext} from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js';
import { useFormWithValidation } from '../../utils/UseForm.js';
import { filterMovies } from '../../utils/filterMovies.js';
import { validateFilmToSend } from '../../utils/validateFilmToSend.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Movies() {
  const { setStateInfoTooltip } = useContext(CurrentUserContext);

  const defaultData = {
    search: ''
  };

  const [isRequest, setIsRequest] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState(JSON.parse(localStorage.getItem('checkboxStatus')) || false);
  const [movies, setMovies] = useState([]);
  const [valueSearch, setValueSearch] = useState(localStorage.getItem('valuesSearch') || '');
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [errMessageFind, setErrMessageFind] = useState(' ');
  const [stateErrReq, setStateErrReq] = useState(false);
  const [ErrMessageRequest, setErrMessageRequest] = useState('');
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('beatfilmMovies')) || []);
  const [savedMovies, setSavedMovies] = useState([]);
  const [compareId, setСompareId] = useState(false);
  const [disableBtnSearch, setDisableBtnSearch] = useState(false);
  const [disableBtnSaveMovie, setDisableBtnSaveMovie] = useState(false);

  const { values, handleChange, errors, errMessage, setErrMessage, setValues } = useFormWithValidation(defaultData);

  useEffect(() => {
    setValues(
      {
        search: valueSearch
      }
    );

    setDisableBtnSaveMovie(true);

    mainApi.getMovies()
      .then(res => {
        if (res) {
          setSavedMovies(res);
          setСompareId(true);
        }
      })
      .catch(err => {
        if (err) {
          setStateInfoTooltip(true);
        }
      })
      .finally(() => {
        setDisableBtnSaveMovie(false);
      })
  }, []);

  useEffect(() => {
    if ((localStorage.getItem('beatfilmMovies') === null) && !stateErrReq) {
      setErrMessageFind('Совершите свой первый поиск');
    }
  }, [errMessageFind]);

  useEffect(() => {
    if (!localStorage.getItem('beatfilmMovies') && isRequest) {
      setDisableBtnSearch(true);
      
      moviesApi.getIntitialMovies()
        .then(res => {
          setIsRequest(false);
          setErrMessageFind('');
          setIsLoadingMovies(false);
          setErrMessageRequest('');
          setAllMovies(res);
        })
        .catch(err => {
          if (err) {
            setStateErrReq(true);
            setIsRequest(false);
            setIsLoadingMovies(false);
            setErrMessageFind('');
            setErrMessageRequest('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          }
        })
        .finally(() => {
          setDisableBtnSearch(false);
        });
    }
  }, [isRequest]);

  useEffect(() => {
    localStorage.setItem('valuesSearch', valueSearch);
    localStorage.setItem('checkboxStatus', checkboxStatus);
    localStorage.setItem('filterMovies', JSON.stringify(filterMovies(checkboxStatus, allMovies, valueSearch)));

    setMovies(JSON.parse(localStorage.getItem('filterMovies')) || []);

    if ((JSON.parse(localStorage.getItem('filterMovies')).length === 0) && localStorage.getItem('beatfilmMovies')) {
      setErrMessageFind('Ничего не найдено');
    } else {
        setErrMessageFind('');
    }
  }, [isRequest, checkboxStatus, valueSearch]);

  function handleChangeCheckbox(event) {
    setCheckboxStatus(event.target.checked);
  }

  function handleMovieLike(film, setIsLiked, isLiked) {
    if (isLiked === false) {
      setDisableBtnSaveMovie(true);

      mainApi.postMovie(validateFilmToSend(film))
        .then(res => {
          if (res) {
            setIsLiked(true);
            setSavedMovies([res, ...savedMovies]);
          }
        })
        .catch(err =>{
          if (err) {
            setStateInfoTooltip(true);
          }
        })
        .finally(() => {
          setDisableBtnSaveMovie(false);
        });
    } else {
      let find_id = savedMovies.find(item => film.id === item.movieId ? item : '')._id;

      setDisableBtnSaveMovie(true);

      mainApi.deleteMovie(find_id)
        .then(res => {
          setIsLiked(false);

          let index;

          for (let i=0; i<savedMovies.length; i++) {
            if (res.movieId === savedMovies[i].movieId) {
              index = i;
            }
          }

          savedMovies.splice(index, 1);
        })
        .catch(err => {
          if (err) {
            setStateInfoTooltip(true);
          }
        })
        .finally(() => {
          setDisableBtnSaveMovie(false);
        });
    }
  }

  function handleSubmitSearch(event) {
    event.preventDefault();

    if (errors.search === 'Введите данные в указанном формате.') {
      setErrMessage('Пожалуйста уберите пробелы в начале или в конце строки');
      return;
    }

    if (values.search === '' || errors.search) {
      setErrMessage('Нужно ввести ключевое слово');
      return;
    }

    setIsRequest(true);
    setValueSearch(values.search);

    if (!localStorage.getItem('beatfilmMovies')) {
      setIsLoadingMovies(true); 
    } else {
      setIsLoadingMovies(false);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        values={values}
        handleChange={handleChange}
        errMessage={errMessage}
        checkboxStatus={checkboxStatus}
        handleChangeCheckbox={handleChangeCheckbox}
        disableBtnSearch={disableBtnSearch}
      />
      <MoviesCardList
        compareId={compareId}
        savedMovies={savedMovies}
        handleMovieLike={handleMovieLike}
        movies={movies}
        isLoadingMovies={isLoadingMovies}
        errMessage={errMessageFind || ErrMessageRequest}
        disableBtnSaveMovie={disableBtnSaveMovie}
      />
    </main>
  );
}

export default Movies;