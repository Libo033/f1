import React from "react";
import styles from "@/styles/Components.module.css";
import { IRace } from "@/Libs/interfaces";
import { Titillium_Web } from "next/font/google";
import Image from "next/image";

const titi = Titillium_Web({
  weight: "700",
  subsets: ["latin"],
});

const NextRace: React.FC<IRace> = (props) => {
  return (
    <div style={titi.style} className={styles.nextRace}>
      <div className={styles.nextRaceUp}>
        <p className={styles.nextRaceDate}>{props.date}</p>
      </div>
      <div className={styles.nextRaceDown}>
        <Image
          className={styles.nextRaceCircuitImage}
          src={props.image}
          alt={props.name}
          width={384}
          height={196}
        />
        <p className={styles.nextRaceGP}>&nbsp;GP&nbsp;{props.gp}&nbsp;2023</p>
      </div>
    </div>
  );
};

export default NextRace;
