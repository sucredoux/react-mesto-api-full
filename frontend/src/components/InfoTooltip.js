function InfoTooltip({
  isOpen,
  isSuccessful,
  name,
  textSuccess,
  textFailure,
  onClose,
}) {
  const classNameActive = `pop-up pop-up_type_${name} pop-up_opened`;
  const className = `pop-up pop-up_type_${name}`;

  const imageSuccess = "tooltip__image tooltip__image_type_success";
  const imageFailure = "tooltip__image tooltip__image_type_failure";

  return (
    <div className={isOpen ? classNameActive : className}>
      <div className="pop-up__block">
        <button
          type="button"
          aria-label="Закрыть"
          className={`pop-up__close pop-up__close_type_${name} button`}
          onClick={onClose}
        ></button>
        <div className="form__container pop-up__container tooltip__container">
          <span className={isSuccessful ? imageSuccess : imageFailure}></span>
          <p className="tooltip__text">
            {isSuccessful ? textSuccess : textFailure}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
