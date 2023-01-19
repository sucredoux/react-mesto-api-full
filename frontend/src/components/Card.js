import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  link,
  title,
  owner,
  likes,
  onCardClick,
  onCardDelete,
  onLikeClick
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = owner === currentUser._id;

  const cardDeleteButtonClassName = ` button ${
    isOwn ? "item__delete item__delete_active" : "item__delete"
  }`;

  const isLiked = likes.some(id => id === currentUser._id);

  const cardLikeButtonClassName = `button ${
    isLiked ? "item__button item__button_active" : "item__button"
  }`;

  function handleClick() {
    onCardClick(card);
  };

  function handleLike() {
    onLikeClick(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (

    <div id="card" className="card card_type_default">
      <article className="item">
        <img
          className="item__image"
          src={link}
          alt={title}
          onClick={handleClick}
        />
        <button
          type="button"
          aria-label="Удалить"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <h2 className="item__title">{title}</h2>
        <div className="item__like-block">
          <button
            type="button"
            aria-label="Лайк"
            className={cardLikeButtonClassName}
            onClick={handleLike}
          ></button>
          <span className="item__like-counter">{likes.length}</span>
        </div>
      </article>
    </div>
  );
}

export default Card;
