"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../utils/redux/store/store";
import { Header, Loader } from "@/components";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import "swiper/css";
import * as reactToastify from "react-toastify";
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
           <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        </Provider>
      )}
    </>
  );
}

export default Providers;
