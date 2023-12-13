"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../utils/redux/store/store";
import { Header, Loader } from "@/components";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import "swiper/css";
import * as reactToastify from "react-toastify";
import image  from '../statics/wallpaper1.jpg'
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
          {children} {shouldShowHeaderAndFooter && <Footer />}
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
