import { ReactNode, RefObject } from 'react';
export declare const ModalProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export type ModalProps = {
    buttonRef: RefObject<HTMLElement>;
    closeModal: () => void;
};
export declare const useModal: ({ buttonRef, closeModal }: ModalProps) => {
    style: {
        right: number;
    } | {
        right?: undefined;
    };
    ref: import("react").MutableRefObject<HTMLDivElement>;
};
export declare const useModalTrigger: () => {
    isModalVisible: boolean;
    useModalParams: {
        buttonRef: import("react").MutableRefObject<HTMLButtonElement>;
        closeModal: () => void;
    };
    buttonProps: {
        onClick: () => void;
        ref: import("react").MutableRefObject<HTMLButtonElement>;
    };
};
//# sourceMappingURL=useModal.d.ts.map