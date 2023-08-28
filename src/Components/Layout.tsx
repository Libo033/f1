import Head from "next/head";
import React from "react";
import { Roboto } from "next/font/google";
import { ILayoutProps } from "@/Libs/interfaces";
import NavigationBar from "./NavigationBar";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const Layout: React.FC<ILayoutProps> = ({children}) => {
  return (
    <>
      <Head>
        <title>Formula 1</title>
      </Head>
      <div className={roboto.className}>
        <NavigationBar />
        {children}
      </div>
    </>
  );
};

export default Layout;
