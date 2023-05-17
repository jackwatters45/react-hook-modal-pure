import {
  useRef,
  useMemo,
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
  RefObject,
} from 'react';

interface ModalContextType {
  isModalActiveGlobal: boolean;
  SetIsModalActiveGlobal: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalActiveGlobal, SetIsModalActiveGlobal] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalActiveGlobal, SetIsModalActiveGlobal }}>
      {children}
    </ModalContext.Provider>
  );
};

export type ModalProps = {
  buttonRef: RefObject<HTMLElement>;
  closeModal: () => void;
};

export const useModal = ({ buttonRef, closeModal }: ModalProps) => {
  const rightPositionStyle = useMemo(() => {
    if (!buttonRef?.current) throw new Error('buttonRef is undefined');
    const buttonRect = buttonRef?.current?.getBoundingClientRect();
    const pickerRightLoc = buttonRect?.left + 270 ?? 0;
    return window.innerWidth - pickerRightLoc < 0 ? { right: 0 } : {};
  }, [buttonRef]);

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!modalRef.current) throw new Error('modalRef is undefined');
      if (!modalRef.current?.contains(e.target as Node)) closeModal();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal, modalRef]);

  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error('useModal must be used within a ModalProvider');
  const { SetIsModalActiveGlobal } = context;
  useEffect(() => {
    SetIsModalActiveGlobal(true);
    return () => SetIsModalActiveGlobal(false);
  }, [SetIsModalActiveGlobal]);

  return { style: rightPositionStyle, ref: modalRef };
};

export const useModalTrigger = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  return {
    isModalVisible,
    useModalParams: { buttonRef, closeModal: () => setIsModalVisible(false) },
    buttonProps: { onClick: () => setIsModalVisible(true), ref: buttonRef },
  };
};
