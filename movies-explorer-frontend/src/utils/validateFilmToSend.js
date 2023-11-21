import React from 'react';

import Joi from 'joi';
import validator from 'validator';

export function validateFilmToSend(film) {
//с API beatfilmMovies приходят некоторые невалидные значения для нашего API например null или просто строка вместо URL или пустая строка,
//поэтому заменяем их на такие чтобы наш API их принял. Новые значения никак не повлияют на функционал приложения, важно лишь чтобы наш API сохранил фильм.
  const schema = Joi.object({
    country: Joi.custom(v => (typeof v !== 'string' || v === '') ? ' ' : v),
    director: Joi.custom(v => (typeof v !== 'string' || v === '') ? ' ' : v),
    duration: Joi.custom(v => typeof v !== 'number' ? 0 : v),
    year: Joi.custom(v => typeof v !== 'string' ? ' ' : v),
    description: Joi.custom(v => (typeof v !== 'string' || v === '') ? ' ' : v),
    trailerLink: Joi.custom(v => (typeof v !== 'string') || !validator.isURL(v) ? 'ya.ru' : v),
    nameRU: Joi.custom(v => (typeof v !== 'string' || v === '') ? ' ' : v),
    nameEN: Joi.custom(v => (typeof v !== 'string' || v === '') ? ' ' : v),
  });

    const result = Joi.attempt(film, schema, {stripUnknown: true});
    result.thumbnail = `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`;
    result.image = `https://api.nomoreparties.co${film.image.url}`;
    result.movieId = film.id;

    return result;
  }