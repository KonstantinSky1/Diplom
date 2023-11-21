import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import mainApi from '../../utils/MainApi.js';
import { useFormWithValidation } from '../../utils/UseForm.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

import './Profile.css';

function Profile() {
  const defaultUser = {
    name: '',
    email: ''
  };

  const { handleSignOut, currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { values,
          handleChange,
          isValid,
          setIsValid,
          errors,
          errMessage,
          setErrMessage,
          resetForm } = useFormWithValidation(defaultUser);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    switch(true) {
      case (values.name === currentUser.name) && (values.email === '') :
        setIsDisabled(false);
        break;
      case (values.email === currentUser.email) && (values.name === '') :
        setIsDisabled(false);
        break;
      case (values.name === currentUser.name) && (values.email !== currentUser.email) :
        setIsDisabled(true);
        break;
      case (values.email === currentUser.email) && (values.name !== currentUser.name) :
        setIsDisabled(true);
        break;
      case (values.email === currentUser.email) && (values.name === currentUser.name) :
        setIsDisabled(false);
        break;
      case (values.name === '') && (values.email === '') :
        setIsDisabled(false);
        break;
      default :
        setIsDisabled(true);
    }
  }, [values]);

  function handleUpdateUser(name, email) {
    setIsValid(false); //блокируем сабмит во время отправки запроса

    return mainApi.updateUser(name, email)
      .then(res => {
        setCurrentUser(res);
        setErrMessage('Ваши данные успешно изменены');
        setIsValid(false);
        resetForm();
      })
      .catch(err => {
        if (err === 409) {
          setErrMessage('Данный емеил уже занят');
          setIsValid(false);
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let {name, email} = values;

    //т.к. какой-либо value инпута может быть пустым, отправляем на сервер текущее значение чтобы не отправить пустое поле:
    name = name || currentUser.name;
    email = email || currentUser.email;

    handleUpdateUser(name, email);
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">
          {`Привет, ${currentUser.name}!`}
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="profile__form"
          name="profile-form"
        >
          <div className="profile__inputsBlock">
            <ErrorMessage
              style={{padding: '0 0 10px 0'}}
              errorMessage={errors.name}
            />
            <div className="profile__inputWrapper">
              <p className="profile__inputText">Имя</p>
              <input
                onChange={handleChange}
                value={values.name}
                className="profile__input"
                type="text"
                name="name"
                placeholder={currentUser.name}
                minLength="2"
                pattern="^[а-яА-ЯёЁa-zA-Z- ]+$"
              />
            </div>
            <span className="profile__line"></span>
            <div className="profile__inputWrapper">
              <p className="profile__inputText">E&#8209;mail</p>
              <input
                onChange={handleChange}
                value={values.email}
                className="profile__input"
                type="email"
                name="email"
                placeholder={currentUser.email}
                pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,})"
              />
            </div>
            <ErrorMessage
              errorMessage={errors.email}
            />
          </div>
          <ErrorMessage
            errorMessage={errMessage}
            style={{padding: '0 0 10px 0', textAlign: 'center'}}
          />
          <div className="profile__buttonsBlock">
            <button
              disabled={!isValid || !isDisabled}
              className="profile__buttonSubmit"
              type="submit"
              style={(!isValid || !isDisabled) ? {cursor: 'auto', opacity: '1', color: '#504B4A'} : null}
            >
              Редактировать
            </button>
            <Link
              onClick={handleSignOut}
              to="/"
              className="profile__logOutLink"
            >
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;