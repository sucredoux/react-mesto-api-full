import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [userData, setUserData] = useState({
    name: "",
    about: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
    about: "",
  });
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    about: "",
  });

  function handleChange(e) {
    let { name, value } = e.target;

    setUserData({
      ...userData,
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
        about: "",
      });
      setIsValid({
        name: "",
        about: "",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { name, about } = userData;
    props.onUpdateUser({ name, about });
  }

  useEffect(() => {
    setUserData({
      name: "",
      about: "",
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
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      hasError={hasError}
    >
      <input
        type="text"
        name="name"
        id="profile-name-input"
        className={`form__input form__profile-name-input ${
          isValid?.name ? "form__input_type_error" : "form__input_type_pop-up"
        }`}
        required
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        value={userData.name || ""}
        onChange={handleChange}
      />
      <span
        className={`profile-name-input-error form__input-error form__input-error_type_upper ${
          hasError ? "form__input-error_active" : ""
        }`}
      >
        {hasError ? errorMessage.name : ""}
      </span>
      <input
        type="text"
        name="about"
        id="profile-description-input"
        className={`form__input form__profile-description-input ${
          isValid?.about ? "form__input_type_error" : "form__input_type_pop-up"
        }`}
        required
        placeholder="Ваш род деятельности"
        minLength="4"
        maxLength="200"
        value={userData.about || ""}
        onChange={handleChange}
      />
      <span
        className={`profile-description-input-error form__input-error form__input-error_type_lower ${
          hasError ? "form__input-error_active" : ""
        }`}
      >
        {hasError ? errorMessage.about : ""}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
