import React, { useEffect, useState } from "react";
import styles from "@/styles/Admin.module.css";
import { Titillium_Web } from "next/font/google";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { IDriver } from "@/Libs/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { CircularProgress } from '@mui/material'

const titi = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const Drivers = () => {
  const router = useRouter();
  const [drivers, setDrivers] = useState<IDriver[]>([]);

  useEffect(() => {
    fetch("/api/v1/drivers?order=pts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data.drivers);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  }, []);

  const handleModify = (id: string): void => {
    router.push(`/admin/dashboard/drivers/new/${id}`);
  };

  const handleDelete = (driver: string, id: string) => {
    if (confirm(`Estas seguro que quieres borrar a ${driver}`)) {
      fetch(`/api/v1/drivers/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          if (data.deleted)
            setDrivers(drivers.filter((driver) => driver._id !== id));
        })
        .catch((error) => {
          if (error instanceof Error) console.log(error.message);
        });
    }
  };

  return (
    <Layout>
      <div className={styles.drivers}>
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
            <p className={styles.breadcrumbHome}>Drivers</p>
          </li>
        </ul>
        <div className={styles.tableContainer}>
          <h2 style={titi.style}>2023 Driver Standings</h2>
          <Link
            className={styles.addNewDriver}
            href={"/admin/dashboard/drivers/new"}
          >
            Add New Driver
          </Link>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>POS</th>
                <th>DRIVER</th>
                <th>NATIONALITY</th>
                <th>CAR</th>
                <th>PTS</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length > 0 ? (
                drivers.map((driver, index) => (
                  <tr key={driver._id}>
                    <td>{index + 1}</td>
                    <td>{driver.name}</td>
                    <td>{driver.nationality}</td>
                    <td>{driver.car}</td>
                    <td>{driver.pts}</td>
                    <td className={styles.buttonGroup}>
                      <button onClick={() => handleModify(driver._id)}>
                        <Image
                          src={"/img/gear.svg"}
                          alt="gear"
                          width={15}
                          height={15}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(driver.name, driver._id)}
                      >
                        <Image
                          src={"/img/bin.svg"}
                          alt="gear"
                          width={15}
                          height={15}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <CircularProgress />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Drivers;
