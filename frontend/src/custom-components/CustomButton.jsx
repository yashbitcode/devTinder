import { twMerge } from "tailwind-merge";

const CustomButton = ({
    className,
    children,
    type = "button",
    ...props
}) => {
    return (
        <button type={type} className={twMerge("w-full bg-neutral-900 cursor-pointer p-3 rounded-md", className)} {...props}>
            {children}
        </button>
    );
};

export default CustomButton;