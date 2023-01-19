function Container(props) {
  return (
    <div
      className={`form__container ${props.container}__container ${props.container}__container_type_${props.name}`}
    >
      <h2
        className={`${props.container}__title ${props.container}__title_type_${props.name}`}
      >
        {props.title}
      </h2>
      <form
        name={`${props.formType}-form`}
        noValidate
        className={`form form_type_${props.name}`}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button
          type="submit"
          name={`${props.formType}-submit`}
          className={`form__button form__button_type_${props.container} button`}
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default Container;
