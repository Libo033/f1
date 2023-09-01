import Footer from "@/Components/Footer";
import Layout from "@/Components/Layout";
import NextRace from "@/Components/NextRace";
import { IRace } from "@/Libs/interfaces";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [next, setNext] = useState<IRace>();

  useEffect(() => {
    fetch(`/api/v1/race/64f0e4711e6f179d4704bc31`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setNext(data.race);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  }, []);

  return (
    <Layout>
      <div className={styles.page}>
        {next && <NextRace {...next} />}
        <Footer />
      </div>
    </Layout>
  );
}
