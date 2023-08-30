import Layout from "@/Components/Layout";
import { IRace } from "@/Libs/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin.module.css";
import CircuitAdmin from "@/Components/CircuitAdmin";

const Races = () => {
  const [races, setRaces] = useState<IRace[]>([]);

  useEffect(() => {
    fetch("/api/v1/calendar", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.calendar);
        setRaces(data.calendar);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  }, []);

  return (
    <Layout>
      <div>
        <ul className={styles.breadcrumbs}>
          <li>
            <Link className={styles.breadcrumbLink} href={"/admin"}>
              Admin
            </Link>
            &nbsp;/&nbsp;
          </li>
          <li>
            <Link className={styles.breadcrumbLink} href={"/admin/dashboard"}>
              Dashboard
            </Link>
            &nbsp;/&nbsp;
          </li>
          <li>
            <p className={styles.breadcrumbHome}>Calendar</p>
          </li>
        </ul>
      </div>
      <div style={{marginTop: "1.8rem"}}>
        <Link className={styles.addNewRace} href={"/admin/dashboard/races/new"}>
          Add Race
        </Link>
      </div>
      <section className={styles.allCircuits}>
        {races.length > 0 &&
          races.map((race: IRace) => <CircuitAdmin {...race} />)}
      </section>
    </Layout>
  );
};

export default Races;
