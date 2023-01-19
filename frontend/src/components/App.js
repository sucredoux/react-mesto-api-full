import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { authApi } from "../utils/AuthApi";
import MobileHeader from "./MobileHeader";
import { useMediaQuery } from 'react-responsive'
import DeleteTooltip from "./DeleteToolTip";

function App() {
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isFullImagePopupOpen, setIsFullImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isDeleteTooltipPopupOpen, setIsDeleteTooltipPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({
    query: '(max-width: 400px)'
  })

  const tokenCheck = useCallback(async () => {
    try {
      setLoading(true);
      let jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("no token");
      }
      const user = await authApi.checkRegistration(jwt);
      if (!user) {
        throw new Error("invalid user");
      } else {
        setLoggedIn(true);
        setUserData(user);
      }
    } catch (err) {
      console.log("Ошибка " + err);
    } finally {
      setLoading(false);
    }
  }, []);

  const userLogin = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);
      const loginData = await authApi.signInUser({ email, password });
      if (!loginData) {
        throw new Error("Неверные имя или пароль пользователя");
      } else if (loginData.token) {
        localStorage.setItem("jwt", loginData.token);
        setLoggedIn(true);
        setUserData(loginData);
      }
      return loginData;
    } catch (err) {
      setIsSuccessful(false);
      handleInfoTooltip();
    } finally {
      setLoading(false);
    }
  }, []);

  const userRegister = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);
      const newUser = await authApi.registerUser({ email, password });
      if (newUser) {
        setUserData(newUser);
        setIsSuccessful(true);
      } else {
        setIsSuccessful(false);
      }
      handleInfoTooltip();
      return newUser;
    } catch (err) {
      setIsSuccessful(false);
      handleInfoTooltip();
      console.log("Ошибка " + err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck, loggedIn]);

  const userLogOut = useCallback(() => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData({});
  }, []);

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (loggedIn) {
      api
        .getAllInfo(jwt)
        .then(([userInfo, allCards]) => {
          setCurrentUser(userInfo);
          const results = allCards.map((item) => ({
            card: item,
            _id: item._id,
            link: item.link,
            name: item.name,
            owner: item.owner,
            likes: item.likes,
          })).reverse();
          setCards(results);
        })
        .catch((err) => {
          console.log("Ошибка ", err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    api
      .manageLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }
 
  function handleCardDelete(card) {
    closeAllPopups();
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(item) {
    setIsFullImagePopupOpen(true);
    setSelectedCard(item);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);

  }

  function handleDeleteTooltip(item) {
    setIsDeleteTooltipPopupOpen(true);
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false) ||
      setIsEditProfilePopupOpen(false) ||
      setIsAddPlacePopupOpen(false) ||
      setIsFullImagePopupOpen(false) ||
      setIsInfoTooltipPopupOpen(false) ||
      setIsDeleteTooltipPopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api

      .editAvatar({ avatar })
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newItem) => {
        setCards([newItem, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }

  if (loading) {
    return "...Loading";
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {isMobile && loggedIn ? (
            <MobileHeader
              loggedIn={loggedIn}
              userData={userData}
              onLogout={userLogOut}
            />
          ) : (
            <Header
              loggedIn={loggedIn}
              userData={userData}
              onLogout={userLogOut}
            />
          )}
          <Switch>
            <ProtectedRoute
              path="/"
              exact
              loggedIn={loggedIn}
              component={Main}
              cardsList={cards}
              onClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteTooltip}
            ></ProtectedRoute>
            <Route path="/signup">
              <Register
                loggedIn={loggedIn}
                name="register"
                title="Регистрация"
                buttonText="Зарегистрироваться"
                textSuccess="Вы успешно зарегистрировались!"
                textFailure="Что-то пошло не так! Попробуйте еще раз."
                onRegister={userRegister}
                isSuccessful={isSuccessful}
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
              />
            </Route>
            <Route path="/signin">
              <Login
                loggedIn={loggedIn}
                name="login"
                title="Вход"
                buttonText="Войти"
                textSuccess="Вы успешно зарегистрировались!"
                textFailure="Что-то пошло не так! Попробуйте еще раз."
                onLogin={userLogin}
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
                isSuccessful={isSuccessful}
              />
            </Route>
          </Switch>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          ></EditProfilePopup>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          ></AddPlacePopup>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
          <DeleteTooltip
            card={selectedCard}
            isOpen={isDeleteTooltipPopupOpen}
            onClose={closeAllPopups}
            onDeleteConsent={handleCardDelete}
          ></DeleteTooltip>
          <ImagePopup
            card={selectedCard}
            isOpen={isFullImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
