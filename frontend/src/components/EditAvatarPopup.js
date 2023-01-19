import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  function handleAvatarChange(e) {
    avatarRef.current = e.target.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        id="avatar-link-input"
        className="form__input form__input_type_pop-up form__input_type_avatar-link"
        required
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        onChange={handleAvatarChange}
      />
      <span className="avatar-link-input-error form__input-error form__input-error_type_upper"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
