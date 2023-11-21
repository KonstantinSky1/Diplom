import React from "react";

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

function SearchForm({ handleSubmitSearch, values, handleChange, errMessage, checkboxStatus, handleChangeCheckbox, disableBtnSearch }) {
  return (
    <section className="searchForm">
      <div className="searchForm__container">
        <form
          onSubmit={handleSubmitSearch}
          noValidate
          name="search-form"
        >
          <div className="searchForm__search">
            <input
              pattern="^\S$|^\S[\s\S]*\S$"
              value={values.search}
              onChange={handleChange}
              className="searchForm__input"
              type="text"
              name="search"
              placeholder="Фильм"
              required
            />
            <button
              className="searchForm__button"
              type="submit"
              disabled={disableBtnSearch}
            >
              Поиск
            </button>
          </div>

          <ErrorMessage
            errorMessage = {errMessage}
            style={{position: 'absolute'}}
          />
          <div className="searchForm__filterCheckbox">
            <FilterCheckbox
              checkboxStatus={checkboxStatus}
              handleChangeCheckbox={handleChangeCheckbox}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;