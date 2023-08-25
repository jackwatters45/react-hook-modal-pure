import { ReactNode, RefObject } from 'react';
export declare const ModalProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
interface ModalOptions {
    rightPositionDistance?: number;
}
export type ModalProps = {
    buttonRef: RefObject<HTMLElement>;
    closeModal: () => void;
    options?: ModalOptions;
};
export declare const useModal: ({ buttonRef, closeModal, options }: ModalProps) => {
    style: {
        right: string | number;
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
export type useModalParams = {
    buttonRef: RefObject<HTMLButtonElement>;
    closeModal: () => void;
};
export {};
//# sourceMappingURL=useModal.d.ts.map