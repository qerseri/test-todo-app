import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "red";
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
    return (
        <button {...props} className={`${styles.button} ${styles[variant]}`}>
            {children}
        </button>
    );
};

Button.displayName = "Button";
