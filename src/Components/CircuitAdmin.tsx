import React from "react";
import styles from "@/styles/Components.module.css";
import { Titillium_Web } from "next/font/google";
import { IRace } from "@/Libs/interfaces";
import { NextRouter, useRouter } from "next/router";
import Image from "next/image";

const titi = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const CircuitAdmin: React.FC<IRace> = (props) => {
  const router: NextRouter = useRouter();

  const handleModify = (id: string) => {
    router.push(`/admin/dashboard/races/new/${id}`);
  };

  const handleDelete = (id: string, gp: string) => {
    if (confirm(`Estas seguro que quieres borrar el gp de ${gp}`)) {
      fetch(`/api/v1/race/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          location.reload();
        })
        .catch((error) => {
          if (error instanceof Error) console.log(error.message);
        });
    }
  };

  return (
    <article style={titi.style} className={styles.circuitAdmin}>
      <div className={styles.circuitAdminContainer1}>
        <p className={styles.circuitAdminTitle}>Grand Prix {props.gp}</p>
        <p className={styles.circuitAdminSubTitle}>{props.name}</p>
        <p className={styles.circuitAdminDate}>{props.date}</p>
      </div>
      <div className={styles.circuitAdminContainer2}>
        <p className={styles.circuitAdminInfoTxt}>Long: {props.long}m</p>
        <p className={styles.circuitAdminInfoTxt}>
          Turns: {props.curves.left + props.curves.rigth} ({props.curves.left}{" "}
          left - {props.curves.rigth} right)
        </p>
        <p className={styles.circuitAdminInfoTxt}>
          Record: {props.record || "No Data"}
        </p>
        <p className={styles.circuitAdminInfoTxt}>
          Pole: {props.pole || (props.suspended && "Suspended") || "Soon"}
        </p>
        <p className={styles.circuitAdminInfoTxt}>
          Best Lap:{" "}
          {props.best_lap || (props.suspended && "Suspended") || "Soon"}
        </p>
      </div>
      <div className={styles.circuitAdminContainer3}>
        <Image
          className={styles.circuitAdminImage}
          src={props.image}
          alt={props.name}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.circuitAdminButtonGroup}>
        <button
          onClick={() => handleModify(props._id)}
          className={styles.circuitAdminButton}
        >
          Modificar
        </button>
        <button
          onClick={() => handleDelete(props._id, props.gp)}
          className={styles.circuitAdminButton}
        >
          Borrar
        </button>
      </div>
    </article>
  );
};

export default CircuitAdmin;
