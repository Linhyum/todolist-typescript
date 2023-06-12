import React from "react";

const Button = ({
    children,
    className,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            className={`bg-gray-200 px-2 rounded-lg h-full border border-slate-700 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
