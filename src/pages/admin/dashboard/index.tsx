import React from "react";
import styles from "@/styles/Admin.module.css";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { Titillium_Web } from "next/font/google";

const titi = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const Dashboard = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <ul className={styles.breadcrumbs}>
          <li>
            <Link className={styles.breadcrumbLink} href={"/admin"}>
              Admin
            </Link>
            &nbsp;/&nbsp;
          </li>
          <li>
            <p className={styles.breadcrumbHome}>
              Dashboard
            </p>
          </li>
        </ul>
        <div className={styles.dashboardContainer}>
          <Link href={"/admin/dashboard/drivers"} className={styles.dashboardDrivers}>
            <p style={titi.style}>2023 Drivers Standings</p>
            <img
              src="https://www.transparentpng.com/thumb/formula-one/red-cars-formula-1-png-images-photo-6.png"
              alt="helmet"
            />
          </Link>
          <Link href={"/admin/dashboard/races"} className={styles.dashboardDrivers}>
            <p style={titi.style}>2023 Calendar</p>
            <img
              src="https://www.transparentpng.com/thumb/formula-one/red-cars-formula-1-png-images-photo-6.png"
              alt="helmet"
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
