import { createPortal } from "react-dom";
import styles from "./modal.module.scss";
import React from "react";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    close: () => void;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, children, close }) => {
    if (!isOpen) return null;

    return createPortal(
        <>
            <div className={styles.backdrop} onClick={() => close()} />
            <div className={styles.modal}>{children}</div>
        </>,
        document.body
    );
};

Modal.displayName = "Modal";
