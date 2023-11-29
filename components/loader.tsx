function Loader() {
  return (
    <main className="flex fixed top-0  left-0 w-full bg-black dark:bg-gray-900 opacity-10 justify-center items-center h-screen">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-red-500  dark:bg-white rounded-full"></div>
        <div className="w-8 h-8 bg-red-500  dark:bg-white rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-red-500  dark:bg-white rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </main>
  );
}

export default Loader;
