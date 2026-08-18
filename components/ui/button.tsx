import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
    type = "button",
    ...props
}: ButtonProps) {
    const classes = [
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? "btn--full" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} {...props} className={classes}>
            {children}
        </button>
    );
}
