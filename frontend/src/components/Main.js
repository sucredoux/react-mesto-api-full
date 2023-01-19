import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Main({
  cardsList,
  onClick,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardLike,
  onCardDelete
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <div className="profile__avatar-block">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар пользователя"
            />
            <button
              type="button"
              onClick={onEditAvatar}
              aria-label="Редактировать"
              className="profile__avatar-button button"
            ></button>
          </div>
          <div className="profile__person">
            <div className="profile__name-line">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__description">{currentUser.about}</p>
            </div>
            <button
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать"
              className="profile__edit-button button"
            ></button>
          </div>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить"
          className="profile__add button"
        ></button>
      </section>
      <section className="container">
        {cardsList.map((card) => (
          <Card
            key={card._id}
            card={card}
            id={card._id}
            link={card.link}
            title={card.name}
            owner={card.owner}
            likes={card.likes}
            onCardClick={onClick}
            onLikeClick={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
