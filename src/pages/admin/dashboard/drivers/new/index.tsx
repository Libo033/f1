import Layout from '@/Components/Layout'
import React from 'react'
import styles from '@/styles/Admin.module.css';
import DriverForm from '@/Components/DriverForm';
import Link from 'next/link';

const index = () => {

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
            <p className={styles.breadcrumbHome}>
              New
            </p>
          </li>
        </ul>
        <div className={styles.formContainer}>
          <DriverForm id={undefined}  />
        </div>
      </div>
    </Layout>
  )
}

export default index