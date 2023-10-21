"use client"
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Header } from "@/components";
import Footer from "@/components/footer";
import { usePathname, useRouter } from "next/navigation";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const path = usePathname();
  const shouldShowHeaderAndFooter = path !== '/login' && path !=='/register';
  console.log(shouldShowHeaderAndFooter);
  return <Provider store={store}>{shouldShowHeaderAndFooter && <Header />}{children} {shouldShowHeaderAndFooter && <Footer />}</Provider>;
}

export default Providers;
