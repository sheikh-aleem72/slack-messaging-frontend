// Layout for auth related pages
export const Auth = ({ children }) => {
  return (
    <>
      <div className="h-[100vh] w-full flex items-center justify-center bg-slack">
        {children}
      </div>
    </>
  );
};
