const Input = ({ type, onClick, className, onChange, onKeyDown }) => {
  return (
    <input
      type={type}
      onClick={onClick}
      className={className}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
