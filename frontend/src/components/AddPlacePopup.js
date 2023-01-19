import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [imageData, setImageData] = useState({
    name: "",
    link: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
    about: "",
  });
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    link: "",
  });

  function handleImageData(e) {
    let { name, value } = e.target;
    setImageData({
      ...imageData,
      [name]: value,
    });
    setErrorMessage({
      ...errorMessage,
      [name]: e.target.validationMessage,
    });
    setIsValid({
      ...isValid,
      [name]: e.target.validity.valid,
    });
    if (e.target.validity.valid === false) {
      setHasError(true);
    } else {
      setHasError(false);
      setErrorMessage({
        name: "",
        link: "",
      });
      setIsValid({
        name: "",
        link: "",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { name, link } = imageData;
    props.onAddPlace({ name, link });
  }

  useEffect(() => {
    setImageData({
      name: "",
      link: "",
    });
    setErrorMessage({
      name: "",
      about: "",
    });
    setIsValid({
      name: "",
      about: "",
    });
    setHasError(false);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="place-name-input"
        className={`form__input form__input_type_place ${
          isValid?.name ? "form__input_type_error" : "form__input_type_pop-up"
        }`}
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={imageData.name || ""}
        onChange={handleImageData}
      />
      <span
        className={`place-name-input-error form__input-error form__input-error_type_upper ${
          hasError ? "form__input-error_active" : ""
        }`}
      >
        {hasError ? errorMessage.name : ""}
      </span>
      <input
        type="url"
        name="link"
        id="place-link-input"
        className={`form__input form__input_type_image-link ${
          isValid?.link ? "form__input_type_error" : "form__input_type_pop-up"
        }`}
        required
        placeholder="Ссылка на картинку"
        value={imageData.link || ""}
        onChange={handleImageData}
      />
      <span
        className={`place-link-input-error form__input-error form__input-error_type_lower ${
          hasError ? "form__input-error_active" : ""
        }`}
      >
        {hasError ? errorMessage.link : ""}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
