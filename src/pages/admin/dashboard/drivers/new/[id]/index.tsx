import Layout from "@/Components/Layout";
import React from "react";
import styles from "@/styles/Admin.module.css";
import DriverForm from "@/Components/DriverForm";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

const index = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query;

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
            <Link
              className={styles.breadcrumbLink}
              href={"/admin/dashboard/drivers"}
            >
              Drivers
            </Link>
            &nbsp;/&nbsp;
          </li>
          <li>
            <p className={styles.breadcrumbHome}>Modify</p>
          </li>
        </ul>
      </div>
      <div className={styles.formContainer}>
        <DriverForm id={id?.toString()} />
      </div>
    </Layout>
  );
};

export default index;
