import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as auth from '../../utils/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../utils/UseForm.js';

import './Register.css';
import LogoLink from '../LogoLink/LogoLink.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function Register() {
  const defaultUser = {
    email: '',
    password: '',
    name: ''
  };

  const history = useHistory();
  const { userLoggined } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, errors, errMessage, setErrMessage, setIsValid } = useFormWithValidation(defaultUser);

  function handleRegister(email, password, name) {
    setIsValid(false); //блокируем сабмит во время отправки запроса

    return auth.register(email, password, name)
      .then((res) => {
        if (!res) return;

        return auth.authorize(email, password)
          .then(() => {
            userLoggined();
            history.push('/movies');
          })
      })
        .catch(err => {
          if (err.status === 400) {
            setErrMessage('Некорректные данные name или email');
          }

          if (err.status === 409) {
            setErrMessage('Данный емеил уже занят');
          }
        })
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {email, password, name} = values;

    handleRegister(email, password, name);
  }

  return (
    <section className="register">
      <div className="register__container">
        <div className="register__linkToMain">
          <LogoLink />
        </div>
        <h2 className="register__title">
          Добро пожаловать!
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="register__form"
          name="register-form"
        >
          <div className="register__inputsBlock">
            <label>
              <span className="register__formLabelText">Имя</span>
              <input
                onChange={handleChange}
                value={values.name}
                className="register__input"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                required
                pattern="^[а-яА-ЯёЁa-zA-Z- ]+$"
              />
              <ErrorMessage
                errorMessage={errors.name}
              />
            </label>
            <label>
              <span className="register__formLabelText">E&#8209;mail</span>
              <input
                onChange={handleChange}
                value={values.email}
                className="register__input"
                type="email"
                name="email"
                placeholder="E-mail"
                required
                pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,})"
              />
              <ErrorMessage
                errorMessage={errors.email}
              />
            </label>
            <label>
              <span className="register__formLabelText">Пароль</span>
              <input
                onChange={handleChange}
                value={values.password}
                className="register__input register__input_type_password"
                type="password"
                name="password"
                placeholder="Пароль"
                minLength="4"
                required
              />
              <ErrorMessage
                errorMessage={errors.password}
              />
            </label>
          </div>
          <div className="register__buttonsBlock">
            <ErrorMessage
              errorMessage={errMessage}
              style={{padding: '0 0 10px 0'}}
            />
            <button
              disabled={!isValid}
              className="register__buttonSubmit"
              type="submit"
              style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
            >
              Зарегистрироваться
            </button>
            <Link to="/signin" className="register__link">
              Уже зарегистрированы?
              <span className="register__linkText">Войти</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;