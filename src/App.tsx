import { ModalProps, ModalProvider, useModal, useModalTrigger } from './useModal';

const Modal = (props: ModalProps) => {
  const modalProps = useModal(props);

  return (
    <div className="modal" {...modalProps}>
      <h1>Modal Content</h1>
    </div>
  );
};

export const ComponentUsingModal = () => {
  const { buttonProps, useModalParams, isModalVisible } = useModalTrigger();

  return (
    <>
      <button {...buttonProps}>Open Modal</button>
      {isModalVisible && <Modal {...useModalParams} />}
    </>
  );
};

function App() {
  return (
    <ModalProvider>
      <ComponentUsingModal />
    </ModalProvider>
  );
}

export default App;
