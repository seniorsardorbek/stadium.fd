import { setUserLoc } from "@/utils/redux/store/dataSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const NotUserLoc = () => {

  const dispatch = useDispatch();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLoc({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          })
        );
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }
  return  <main className="mt-16 flex flex-col items-center justify-center gap-2">
  <h2 className="dark:text-white md:text-3xl text-lg text-center  p-5">
    Futbolist dasturga kirish esdan chiqibdi-ku!
  </h2>
  <div className="flex gap-5">
    <Link
      className="mt-16 text-md  dark:text-white md:px-4 px-2   py-1 rounded-lg border border-gray-900 dark:border-white w-40 md:w-56 text-center "
      href={"/"}
    >
      Bosh sahifaga qaytish{" "}
    </Link>
    <button
    onClick={getLocation}
      className="mt-16 text-md  dark:text-white md:px-4 px-2   py-1 rounded-lg border border-gray-900 dark:border-white w-40 md:w-56  text-center "
    >
      Joylashuvni aniqlash 
    </button>
  </div>
</main>
};

export default NotUserLoc;
