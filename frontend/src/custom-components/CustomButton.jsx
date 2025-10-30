import { twMerge } from "tailwind-merge";

const CustomButton = ({
    className,
    children,
    type = "button",
    ...props
}) => {
    return (
        <button type={type} className={twMerge("w-full bg-black/20 p-3 rounded-xs", className)} {...props}>
            {children}
        </button>
    );
};

export default CustomButton;