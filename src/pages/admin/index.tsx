import React, { FormEvent } from "react";
import styles from "@/styles/Admin.module.css";
import { Titillium_Web } from "next/font/google";
import { TextField } from "@mui/material";

const titi = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const Admin = () => {
  const handleLogin = (Event: FormEvent) => {
    Event.preventDefault();
  };

  return (
    <div style={titi.style} className={styles.page}>
      <img
        className={styles.background}
        src="https://lezebre.lu/images/detailed/79/45335-Sticker-Formula-1-nouveau-logo.png"
        alt="formula1"
      />
      <form
        className={styles.formulario}
        onSubmit={(Event: FormEvent) => handleLogin(Event)}
        action="post"
      >
        <h1>Ingresar</h1>
        <TextField label="Email" type="email" />
        <TextField label="Contraseña" type="password" />
        <button type="submit" style={titi.style}>
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
};

export default Admin;
