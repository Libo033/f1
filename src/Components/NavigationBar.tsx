import React, { useState } from "react";
import styles from "@/styles/Components.module.css";
import Link from "next/link";
import Image from "next/image";
import { Drawer } from "@mui/material";
import OpenDrawer from "./OpenDrawer";

const NavigationBar = () => {
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <ul className={styles.containerLogo}>
        <Link href={"/"}>
          <Image
            src={"/img/f1_logo.svg"}
            alt="formula"
            width={138}
            height={138}
          />
        </Link>
      </ul>
      <ul className={styles.containerLinks}>
        <li>
          <Link className={styles.link} href={"/calendar"}>
            Calendar
          </Link>
        </li>
        <li>
          <Link className={styles.link} href={"/drivers"}>
            Drivers
          </Link>
        </li>
        <li>
          <Link className={styles.link} href={"/teams"}>
            Teams
          </Link>
        </li>
      </ul>
      <ul className={styles.containerMenu}>
        <li>
          <Image
            onClick={() => setToggleDrawer(true)}
            className={styles.menu}
            src={"/img/menu.svg"}
            alt="formula"
            width={39}
            height={39}
          />
        </li>
        <Drawer onClose={() => setToggleDrawer(false)} open={toggleDrawer} anchor="top">
          <OpenDrawer setToggleDrawer={setToggleDrawer} />
        </Drawer>
      </ul>
    </nav>
  );
};

export default NavigationBar;
