function Loader() {
  return (
    <main className="flex fixed top-0  left-0 w-full bg-white dark:bg-gray-900  justify-center items-center h-screen">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-blue-200  dark:bg-white rounded-full"></div>
        <div className="w-8 h-8 bg-blue-200  dark:bg-white rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-200  dark:bg-white rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </main>
  );
}

export default Loader;
