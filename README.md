# React Modal Provider

React Modal Provider is a simple and powerful package that allows you to add modal functionality to your React applications with ease. It uses the React context API to manage the modal state and provides a set of hooks for triggering and controlling modals.

## Installation

Install the package using npm or yarn:

```bash
npm install react-hook-modal-pure
```

or

```bash
yarn add react-hook-modal-pure
```

## Usage

1. To use the package, you need to wrap your application in the `ModalProvider` component. This component provides the modal context to all child components.

```jsx
import { ModalProvider } from 'react-modal-provider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

2. Use the useModalTrigger hook in a component to create a trigger button:
   This hook provides the necessary props for a button that will trigger the modal.

```jsx
import { useModalTrigger } from 'react-modal-provider';

function MyComponent() {
  const { isModalVisible, useModalParams, buttonProps } = useModalTrigger();

  return (
    <>
      <button {...buttonProps}>Open Modal</button>
      {isModalVisible && <MyModal {...useModalParams} />}
    </>
  );
}
```

3. Use the useModal hook in a modal component to manage the modal's visibility and position:

This hook provides a ref for the modal and a style object that positions the modal next to the trigger button. It also automatically closes the modal when the user clicks outside of it or presses the Escape key.

```jsx
import { useModal } from 'react-modal-provider';

function MyModal({ closeModal }: { closeModal: () => void }) {
  const { style, ref } = useModal({ closeModal });

  return (
    <div ref={ref} style={style}>
      <h1>Hello, I'm a modal!</h1>
    </div>
  );
}
```

## API

### ModalProvider

- The `ModalProvider` component wraps your application and provides the modal context to all child components.

Props

- `children`: The child elements of the provider.

### useModalTrigger

The `useModalTrigger` hook provides the necessary props for a button that will trigger the modal.

Returns

- `isModalVisible`: A boolean indicating whether the modal is visible or not.
- `useModalParams`: An object containing the `buttonRef` and `closeModal` function to be passed to `useModal`.
- `buttonProps`: An object containing the necessary `onClick` and `ref` props for the trigger button.

### useModal

The `useModal` hook manages the modal's visibility and position based on the provided buttonRef and closeModal function.

Arguments

- `buttonRef`: A `RefObject<HTMLElement>` that points to the button that triggers the modal.
- `closeModal`: A function that closes the modal.

Returns

- `style`: An object with the CSS styles to position the modal correctly.
- `ref`: A `RefObject<HTMLDivElement>` that should be attached to the modal's outermost `div`.

## Example

Here's a simple example demonstrating how to use react-modal-provider:

```jsx
import { useModalTrigger } from 'react-modal-provider';

function ComponentUsingModal() {
  const { isModalVisible, useModalParams, buttonProps } = useModalTrigger();

  return (
    <div>
      <button {...buttonProps}>Open Modal</button>
      {isModalVisible && <Modal useModalParams={useModalParams} />}
    </div>
  );
}

export default MyComponent;
```

```jsx
import { useModal } from 'react-modal-provider';

function Modal(props) {
  const modalProps = useModal(props);

  return (
    <StyledModal {...modalProps}>
      <h1>Modal Content</h1>
    </StyledModal>
  );
}

export default Modal;
```

In this example, a button is created with the `buttonProps` from `useModalTrigger`, and when clicked, it will open a modal. The modal is managed by the `useModal` hook, which controls its visibility and positioning.
