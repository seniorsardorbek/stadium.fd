"use client";
import { Header, Loader } from "@/src/components";
import Footer from "@/src/components/footer";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import * as reactToastify from "react-toastify";
import { store } from "../utils/redux/store/store";
interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const path = usePathname();
  
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const shouldShowHeaderAndFooter = path !== "/login" && path !== "/register";
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Provider store={store}>
          {shouldShowHeaderAndFooter && <Header />}
          {children} 
          <reactToastify.ToastContainer
            autoClose={3000}
            position={"top-right"}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
 
        </Provider>
      )}
    </>
  );
}

export default Providers;
