import React from 'react';
import { Link } from 'react-router-dom';

import './NotLogginedNavigation.css';

function NotLogginedNavigation() {
  return (
    <div className="notLogginedNavigation">
      <Link
        to="/signup"
        className="notLogginedNavigation__registerLink"
      >
        Регистрация
      </Link>
      <Link
        to="/signin"
        className="notLogginedNavigation__loginLink"
      >
        Войти
      </Link>
    </div>
  );
}

export default NotLogginedNavigation;