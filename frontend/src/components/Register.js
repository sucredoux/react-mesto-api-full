import Container from "./Container";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import InfoTooltip from "./InfoTooltip";

function Register({
  loggedIn,
  isRegistered,
  onRegister,
  isSuccessful,
  isOpen,
  onClose,
  textSuccess,
  textFailure,
}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { email, password } = userData;
    onRegister({ email, password });
  }

  if (isRegistered) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <div className="content content_type_auth">
        <Container
          name="registration"
          title="Регистрация"
          buttonText="Зарегистрироваться"
          container="auth"
          formType="auth"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="register-email-input"
            className="form__input form__input_type_auth form__input_type_email"
            required
            placeholder="Email"
            minLength="2"
            maxLength="40"
            value={userData?.email}
            onChange={handleChange}
          />
          <span className="auth-email-input-error form__input-error form__input-error_type_upper"></span>
          <input
            type="password"
            name="password"
            id="register-password-input"
            className="form__input form__input_type_auth form__input_type_password"
            required
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            value={userData?.password}
            onChange={handleChange}
          />
          <span className="auth-password-input-error form__input-error form__input-error_type_lower"></span>
        </Container>
        <div className="auth__reminder">
          <p className="auth__reminder-text">
            Уже зарегистрированы?{" "}
            <Link to="signin" className="auth__reminder-link">
              Войти
            </Link>
          </p>
        </div>
        <InfoTooltip
          name="tooltip"
          isOpen={isOpen}
          onClose={onClose}
          isSuccessful={isSuccessful}
          textFailure={textFailure}
          textSuccess={textSuccess}
        />
      </div>
    </div>
  );
}

export default Register;
