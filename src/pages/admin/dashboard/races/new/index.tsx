import Layout from "@/Components/Layout";
import RaceForm from "@/Components/RaceForm";
import Link from "next/link";
import React from "react";
import styles from "@/styles/Admin.module.css";

const index = () => {
  return (
    <Layout>
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
          <Link
            className={styles.breadcrumbLink}
            href={"/admin/dashboard/races"}
          >
            Calendar
          </Link>
          &nbsp;/&nbsp;
        </li>
        <li>
          <p className={styles.breadcrumbHome}>New</p>
        </li>
      </ul>
      <div className={styles.formContainer}>
        <RaceForm id={undefined} />
      </div>
    </Layout>
  );
};

export default index;
