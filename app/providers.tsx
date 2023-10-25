"use client"
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../utils/redux/store/store";
import { Header } from "@/components";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const path = usePathname();
  const shouldShowHeaderAndFooter = path !== '/login' && path !=='/register';
  return <Provider store={store}>{shouldShowHeaderAndFooter && <Header />}{children} {shouldShowHeaderAndFooter && <Footer />}</Provider>;
}

export default Providers;
