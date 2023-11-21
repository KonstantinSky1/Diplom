import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as auth from '../../utils/Auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../utils/UseForm.js';

import './Login.css';
import LogoLink from '../LogoLink/LogoLink.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function Login() {
  const defaultUser = {
    email: '',
    password: ''
  };

  const history = useHistory();
  const { userLoggined } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, errors, errMessage, setErrMessage, setIsValid } = useFormWithValidation(defaultUser);

  function handleLogin(email, password) {
    setIsValid(false); //блокируем сабмит во время отправки запроса

    return auth.authorize(email, password)
      .then(() => {
        userLoggined();
        history.push('/movies');
      })
        .catch(err => {
          if (err.status === 401) {
            setErrMessage('Неверные почта или пароль');
          }

          if (err.status === 400) {
            setErrMessage('Некорректные данные email');
          }
        });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {email, password} = values;

    handleLogin(email, password);
  }

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__linkToMain">
          <LogoLink />
        </div>
        <h2 className="login__title">
          Рады видеть!
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="login__form"
          name="login-form"
        >
          <div className="login__inputsBlock">
            <label>
              <span className="login__formLabelText">E&#8209;mail</span>
              <input
                onChange={handleChange}
                value={values.email}
                className="login__input"
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
              <span className="login__formLabelText">Пароль</span>
              <input
                onChange={handleChange}
                value={values.password}
                className="login__input login__input_type_password"
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
          <div className="login__buttonsBlock">
            <ErrorMessage
              errorMessage={errMessage}
              style={{padding: '0 0 10px 0'}}
            />
            <button
              disabled={!isValid}
              className="login__buttonSubmit"
              type="submit"
              style={!isValid ? {backgroundColor: '#b4b6b8', cursor: 'auto', opacity: '1'} : null}
            >
              Войти
            </button>
            <Link to="/signup" className="login__link">
              Ещё не зарегистрированы?
              <span className="login__linkText">Регистрация</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;