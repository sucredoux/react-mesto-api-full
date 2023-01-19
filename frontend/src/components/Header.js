import logo from "../images/logo__image_v.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header({ loggedIn, userData, onLogout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта" />
      <div className="header__auth-block">
        <p className="header__user">{loggedIn ? userData?.email : ""}</p>
        <div className="header__switch">
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
    </header>
  );
}

export default Header;
