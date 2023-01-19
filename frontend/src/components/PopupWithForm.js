import Container from "./Container";

function PopupWithForm(props) {
  const classNameActive = `pop-up pop-up_type_${props.name} pop-up_opened`;
  const className = `pop-up pop-up_type_${props.name}`;

  return (
    <div className={props.isOpen ? classNameActive : className}>
      <div className="pop-up__block">
        <button
          type="button"
          aria-label="Закрыть"
          className={`pop-up__close pop-up__close_type_${props.name} button`}
          onClick={props.onClose}
        ></button>
        <Container
          container="pop-up"
          name={props.name}
          title={props.title}
          buttonText={props.buttonText}
          onSubmit={props.onSubmit}
          formType="profile"
          hasError={props.hasError}
        >
          {props.children}
        </Container>
      </div>
    </div>
  );
}

export default PopupWithForm;
