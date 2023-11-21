import React from "react";

import './FilterCheckbox.css';

function FilterCheckbox({ checkboxStatus, handleChangeCheckbox }) {
  return (
    <div>
      <label className="filterCheckbox">
        <input
          className="filterCheckbox__input"
          type="checkbox"
          name="checkbox"
          defaultChecked={checkboxStatus}
          value={checkboxStatus}
          onChange={handleChangeCheckbox}
        />
        <span className="filterCheckbox__switch"></span>
      </label>
      <span className="filterCheckbox__text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;