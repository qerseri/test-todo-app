import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "red";
    isDisabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, isDisabled = false, ...props }) => {
    return (
        <button {...props} className={`${styles.button} ${styles[variant]} ${isDisabled && styles["button--disabled"]}`} disabled={isDisabled}>
            {children}
        </button>
    );
};

Button.displayName = "Button";
