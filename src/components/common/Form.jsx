const Form = ({ onSubmit, title }) => {
  return (
    <>
      <div className="user-container">
        <div className="user-form">
          <div>
            <form onSubmit={onSubmit}>
              <div className="user-header">
                <h1>{title}</h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
