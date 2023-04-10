type ButtonProps = {
  text: string;
  type?: "submit" | "reset";
  onClick?: any;
};

const Button = ({ text, onClick, type }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
