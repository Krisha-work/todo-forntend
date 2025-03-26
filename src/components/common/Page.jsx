const Page = ({pageTitle}) => {
  return (
    <>
      <div className="home-container">
        <div className="home-form">
          <div>
            <div className="home-header">
              {pageTitle}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Page;
