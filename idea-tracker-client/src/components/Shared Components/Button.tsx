type ButtonProps = {
  onSubmit?: any;
  text: string;
  onClick?: any;
};

const Button = ({ onSubmit, text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} onSubmit={onSubmit}>
      {text}
    </button>
  );
};

export default Button;
