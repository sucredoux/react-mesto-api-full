import { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import logo from "../images/logo__image_v.svg";

function MobileHeader({ loggedIn, userData, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <header className="header mobile-log__header">
      <div>
        <div className="mobile-log__logo-group">
          <img className="header__logo" src={logo} alt="Логотип проекта" />
          <div>
            {isOpen ? (
              <button
                className="button mobile-log__button mobile-log__button_type_close"
                onClick={handleClose}
              ></button>
            ) : (
              <button
                className="button mobile-log__button mobile-log__button_type_menu"
                onClick={handleClick}
              ></button>
            )}
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="mobile-log__auth-block_opened">
          <p className="header__user">{loggedIn ? userData?.email : ""}</p>
          <div className="mobile-log__switch">
            <Switch>
              <Route path="/" exact>
                <Link
                  to="/signin"
                  className="auth__reminder-link"
                  onClick={onLogout}
                >
                  Выйти
                </Link>
              </Route>
              <Route path="/signin" exact>
                <Link to="/signup" className="auth__reminder-link">
                  Регистрация
                </Link>
              </Route>
              <Route path="/signup" exact>
                <Link to="/signin" className="auth__reminder-link">
                  Войти
                </Link>
              </Route>
            </Switch>
          </div>
        </div>
      ) : (
        <div className="mobile-log__auth-block"></div>
      )}
    </header>
  );
}

export default MobileHeader;
