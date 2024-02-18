const HomePage = () => {
  return (
    <div className="p-5">
      <div>
        <header className="text-center text-2xl font-bold text-neutral-300">
          This is Todo App Project
        </header>
        <div className="mt-3 text-neutral-300">
          <p className="indent-8">
            This project made by{" "}
            <span className="font-bold text-xl italic text-rose-500">
              Tanawat Jinda
            </span>{" "}
            to show how basic NextJs can do. It's the Full Stack application
            with basic front-end and back-end and connecting to mongoDB.
          </p>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
