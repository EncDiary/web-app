import { observer } from "mobx-react-lite";
import { FC } from "react";
import ReactModal from "react-modal";
import { CrossIcon } from "../../assets/svg-icons";
import store from "../../store";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = observer(({ isOpen, closeModal, children }) => {
  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="onRequestClose Example"
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={store.appStore.isLoading ? "blur" : ""}
      closeTimeoutMS={200}
    >
      <button className="modal__cross" onClick={closeModal}>
        <CrossIcon />
      </button>
      <div className="modal__content">{children}</div>
    </ReactModal>
  );
});

export default Modal;
