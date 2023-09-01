import React from "react";
import styles from "@/styles/Components.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLogoContainer}>
        <Image
          className={styles.footerLogo}
          src={"/img/f1_logo.svg"}
          alt="formula1"
          width={90}
          height={90}
        />
        <p>© 2003-2023 Formula One World Championship Limited</p>
      </div>
    </div>
  );
};

export default Footer;
