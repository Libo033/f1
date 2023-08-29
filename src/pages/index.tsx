import LastRace from "@/Components/LastRace";
import Layout from "@/Components/Layout";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <LastRace
        gp={"Arabia Saudi"}
        name={"Jeddah International Street Circuit"}
        circuit={
          "https://e00-marca.uecdn.es/deporte/motor/formula1/img/circuitos/bahrein.jpg"
        }
      />
    </Layout>
  );
}
