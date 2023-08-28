import React from "react";
import { Roboto } from "next/font/google";
import styles from "@/styles/Components.module.css";
import Image from "next/image";
import { IOpenDrawer } from "@/Libs/interfaces";
import Link from "next/link";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const OpenDrawer: React.FC<IOpenDrawer> = ({ setToggleDrawer }) => {
  return (
    <div className={roboto.className + " " + styles.openDrawer}>
      <div className={styles.drawerContainerLogo}>
        <Image
          src={"/img/f1_logo.svg"}
          alt="formula1"
          width={138}
          height={138}
        />
        <Image
          onClick={() => setToggleDrawer(false)}
          className={styles.close}
          src={"/img/close.svg"}
          alt="cross"
          width={36}
          height={36}
        />
      </div>
      <ul className={styles.drawerContainerLinks}>
        <li className={styles.drawerLi}>
          <Link className={styles.link} href={"/calendar"}>
            Calendar
          </Link>
        </li>
        <li className={styles.drawerLi}>
          <Link className={styles.link} href={"/drivers"}>
            Drivers
          </Link>
        </li>
        <li className={styles.drawerLi}>
          <Link className={styles.link} href={"/teams"}>
            Teams
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OpenDrawer;
