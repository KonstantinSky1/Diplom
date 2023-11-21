import React from "react";
import { useHistory } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();

  return (
    <div className="pageNotFound">
      <div className="pageNotFound__content">
        <h2 className="pageNotFound__title">404</h2>
        <p className="pageNotFound__text">Страница не найдена</p>
      </div>
      <button
        className="pageNotFound__button"
        onClick={() => history.goBack()}
        type="button"
      >
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;