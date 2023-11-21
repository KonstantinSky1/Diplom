import React, { useState, useEffect, useContext } from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { useFormWithValidation } from '../../utils/UseForm.js';
import mainApi from '../../utils/MainApi.js';
import { filterMovies, filterMoviesCheckboxStatus } from '../../utils/filterMovies.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function SavedMovies() {
  const { setStateInfoTooltip } = useContext(CurrentUserContext);

  const defaultData = {
    search: ''
  };

  const [savedMovies, setSavedMovies] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [errMessageFind, setErrMessageFind] = useState('');
  const [disableBtnSearch, setDisableBtnSearch] = useState(false);
  const [disableBtnDelMovie, setdDsableBtnDelMovie] = useState(false);

  const { values, setValues, handleChange, errors, errMessage, setErrMessage } = useFormWithValidation(defaultData);

  useEffect(() => {
    setDisableBtnSearch(true);
    setIsLoadingMovies(true);

    mainApi.getMovies()
      .then(res => {
        if (res) {
          setSavedMovies(res);
          setMovies(filterMoviesCheckboxStatus(checkboxStatus, res));
        }
      })
      .catch(err => {
        if (err) {
          setStateInfoTooltip(true);
        }
      })
      .finally(() => {
        setIsLoadingMovies(false);
        setDisableBtnSearch(false);
      });
  }, []);

  useEffect(() => {
    setMovies(filterMovies(checkboxStatus, savedMovies, valueSearch));
    setIsRequest(false);

    if ((movies.length === 0) && (savedMovies.length > 0)) {
      setErrMessageFind('Ничего не найдено');
    } else {
      setErrMessageFind('');
    }
  }, [isRequest, checkboxStatus]);

  useEffect(() => {
    if ((movies.length === 0) && (savedMovies.length > 0)) {
      setErrMessageFind('Ничего не найдено');
    } else {
      setErrMessageFind('');
    }
  }, [movies]);

  useEffect(() => {
    setMovies(filterMoviesCheckboxStatus(checkboxStatus, savedMovies));
    setIsDelete(false);
  }, [isDelete]);

  function handleChangeCheckbox(event) {
    setCheckboxStatus(event.target.checked);
  }

  function handleSavedMovieDelete(film) {
    setdDsableBtnDelMovie(true);

    mainApi.deleteMovie(film._id)
      .then(res => {
        let index;

        for (let i=0; i<savedMovies.length; i++) {
          if (res.movieId === savedMovies[i].movieId) {
            index = i;
          }
        }

        savedMovies.splice(index, 1);

        setIsDelete(true);
        setValues(defaultData);
        setValueSearch('');
      })
      .catch(err => {
        if (err) {
          setStateInfoTooltip(true);
        }
      })
      .finally(() => {
        setdDsableBtnDelMovie(false);
      });
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
  }

  return (
    <main className="savedMovies">
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        values={values}
        handleChange={handleChange}
        errMessage={errMessage}
        handleChangeCheckbox={handleChangeCheckbox}
        disableBtnSearch={disableBtnSearch}
      />
      <MoviesCardList
        movies={movies}
        handleSavedMovieDelete={handleSavedMovieDelete}
        isLoadingMovies={isLoadingMovies}
        errMessage={errMessageFind}
        disableBtnDelMovie={disableBtnDelMovie}
      />
    </main>
  );
}

export default SavedMovies;