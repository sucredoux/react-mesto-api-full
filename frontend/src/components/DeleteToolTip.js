import PopupWithForm from "./PopupWithForm";

function DeleteTooltip({
    isOpen,
    card,
    onClose,
    onDeleteConsent
  }) {
     
    function handleSubmit(e){
        e.preventDefault();
        onDeleteConsent(card);
    }

    return (
        <PopupWithForm
            name="confirm"
            card={card}
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        ></PopupWithForm>
    );
  }
  
  export default DeleteTooltip;
  