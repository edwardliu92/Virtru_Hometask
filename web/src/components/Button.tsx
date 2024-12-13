import { FC } from "react";
import classNames from "classnames";

interface ButtonProps {
  style?: string;
  onClick: () => void;
  text: string;
}

const Button: FC<ButtonProps> = ({ style, onClick, text }) => {
  return (
    <button
      className={classNames(
        "px-4 py-2 bg-primary text-white border-none rounded cursor-pointer hover:bg-primary-light",
        style
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
