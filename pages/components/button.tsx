import { MouseEventHandler } from "react";

interface IButtonProps {
    name: string;
    className?: string;
    ico?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
    name,
    className,
    handleClick,
    ico
}: IButtonProps) => {
    return (
        <>
            <button 
                onClick={handleClick}
                className={`btn space-x-3 ${className}`}> 
                {!ico ? <></> : <i className={ico}/>}
                {name}
            </button>
        </>
    );
}

export {
    Button
};