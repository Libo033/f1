import React from "react";
import styles from "@/styles/Components.module.css";
import { Russo_One, Titillium_Web } from "next/font/google";
import { ILastRaceProps } from "@/Libs/interfaces";

const russo_one = Russo_One({ weight: "400", subsets: ["latin"] });
const titi = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const LastRace: React.FC<ILastRaceProps> = (props) => {
  return (
    <div className={styles.lastRace}>
      <h2 style={russo_one.style} className={styles.title}>
        Formula 1<br />
        Gran Prix {props.gp}
      </h2>
      <h3 style={titi.style} className={styles.circuit}>
        {props.name}
      </h3>
      <div className={styles.imageCircuitContainer}>
        <img
          className={styles.imageCircuit}
          src={props.circuit}
          alt="circuit"
        />
      </div>
    </div>
  );
};

export default LastRace;
