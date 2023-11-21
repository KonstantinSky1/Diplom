import React from 'react';
import './InfoTooltip.css';
import notSuccessImg from '../../images/notSuccess.svg';

function InfoTooltip({ stateInfoTooltip, setStateInfoTooltip }) {
  function handleClose() {
    setStateInfoTooltip(false);
  }

  return (
    <div className={`popup ${stateInfoTooltip && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup_close-button"
          type="button"
          aria-label="закрыть окно"
          onClick={handleClose}
        >
        </button>
          <img
            className="popup__reg-image"
            src={notSuccessImg}
            alt="Что-то пошло не так"
          />
          <p className="popup__reg-text">Что-то пошло не так!</p>
      </div>
    </div>
  );
}

export default InfoTooltip;