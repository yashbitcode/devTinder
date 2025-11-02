import { useId } from "react";
import { twMerge } from "tailwind-merge";

const CustomInput = ({
    className,
    containerProps = {
        className: "w-full flex flex-col gap-1.5",
    },
    type = "text",
    value,
    name,
    label,
    id,
    ref,
    error,
    ...props
}) => {
    const defaultId = useId();
    const { className: contClasses, ...contProps } = containerProps;

    return (
        <div className={contClasses} {...contProps}>
            {
                label && <label htmlFor={id || defaultId}>{label}</label>
            }
            <input ref={ref} type={type} id={id || defaultId} name={name} value={value} className={twMerge("py-2 px-3 w-full border-2 border-gray-500 rounded-md flex flex-col gap-3", className)} {...props} />
            {
                error && (
                    <p className="text-red-500">{error}</p>
                )
            }
        </div>
    );
};

export default CustomInput;