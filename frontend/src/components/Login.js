import Container from "./Container";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Login({
  loggedIn,
  onLogin,
  isSuccessful,
  isOpen,
  onClose,
  textFailure,
  textSuccess,
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
    onLogin({ email, password });
  }

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="content content_type_auth">
        <Container
          name="auth"
          title="Вход"
          buttonText="Войти"
          container="auth"
          formType="auth"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="auth-email-input"
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
            id="auth-password-input"
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
        <InfoTooltip
          name="tooltip"
          isOpen={isOpen}
          onClose={onClose}
          isSuccessful={isSuccessful}
          textFailure={textFailure}
          textSuccess={textSuccess}
        ></InfoTooltip>
      </div>
    </div>
  );
}

export default Login;
