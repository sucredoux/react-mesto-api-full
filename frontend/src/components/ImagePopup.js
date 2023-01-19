function ImagePopup(props) {
  const classNameActive = "pop-up pop-up_type_image pop-up_opened";
  const className = "pop-up pop-up_type_image";

  return (
    <div className={props.isOpen ? classNameActive : className}>
      <div className="pop-up__block">
        <button
          type="button"
          aria-label="Закрыть"
          className="pop-up__close pop-up__close_type_image button"
          onClick={props.onClose}
        ></button>
        <img
          className="pop-up__full-image"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <h3 className="pop-up__image-title">{props.card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
