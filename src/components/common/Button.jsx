const Button = ({ name, onClick, disabled }) => {
  return (
    <>
      <div className="user-btn">
        <button onClick={onClick} disabled={disabled}>
          {name}
        </button>
      </div>
    </>
  );
};

export default Button;
