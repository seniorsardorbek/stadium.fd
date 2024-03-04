import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserLoc } from "../utils/redux/store/dataSlice";

const NotUserLoc = () => {
  const { UserLoc } = useSelector((state: any) => state.data);
  console.log(UserLoc);
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
    Joylashuvingiz uchun ruxsat bering!
  </h2>
  <div className="flex gap-5">
    <Link
      className="mt-16 text-xs md:text-sm  dark:text-white md:px-4 px-2   py-1 rounded-lg border border-gray-900 dark:border-white w-40 md:w-56 text-center "
      href={"/"}
    >
      Bosh sahifaga qaytish{" "}
    </Link>
    <button
    onClick={getLocation}
      className="mt-16 text-xs md:text-sm  dark:text-white md:px-4 px-2   py-1 rounded-lg border border-gray-900 dark:border-white w-40 md:w-56  text-center "
    >
      Joylashuvni aniqlash 
    </button>
  </div>
</main>
};

export default NotUserLoc;
