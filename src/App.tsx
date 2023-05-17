import { ModalProps, ModalProvider, useModal, useModalTrigger } from './useModal';
import { styled } from 'styled-components';

const StyledModal = styled.div`
  background-color: red;
  width: fit-content;
  padding: 0 8px;
`;

const Modal = (props: ModalProps) => {
  const modalProps = useModal(props);

  return (
    <StyledModal {...modalProps}>
      <h1>Modal Content</h1>
    </StyledModal>
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
