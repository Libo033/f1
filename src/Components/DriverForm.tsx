import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "@/styles/Forms.module.css";
import { TextField } from "@mui/material";
import { Titillium_Web } from "next/font/google";
import { NextRouter, useRouter } from "next/router";

const titi = Titillium_Web({
  weight: "700",
  subsets: ["latin"],
});

const DriverForm: React.FC<{ id: string | undefined }> = ({ id }) => {
  const router: NextRouter = useRouter();
  const [modify, setModify] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [car, setCar] = useState<string>("");
  const [pts, setPts] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!modify) {
      const res = await fetch("/api/v1/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          nationality,
          car,
          pts,
        }),
      });

      const data = await res.json();

      if (data.added) {
        router.push("/admin/dashboard/drivers");
      }
    } else {
      const res = await fetch(`/api/v1/drivers/${modify}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          nationality,
          car,
          pts,
        }),
      });

      const data = await res.json();

      if (data.updated) {
        router.push("/admin/dashboard/drivers");
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/drivers/${id}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setCar(data.car);
          setPts(data.pts);
          setNationality(data.nationality);
          setModify(data._id);
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.log(error.message);
          }
        });
    }
  }, [id]);

  return (
    <form className={styles.form} onSubmit={(e: FormEvent) => handleSubmit(e)}>
      <h2 style={titi.style} className={styles.title}>
        {id ? "Modify driver" : "Add new driver"}
      </h2>
      <div className={styles.formContainer}>
        <TextField
          id="name"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setName(e.target.value)
          }
          value={name}
          variant="outlined"
          label="Name"
          size="small"
          autoComplete="off"
          required
        />
        <TextField
          id="nationality"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setNationality(e.target.value)
          }
          value={nationality}
          type="text"
          variant="outlined"
          label="Nationality"
          size="small"
          autoComplete="off"
          required
        />
        <TextField
          id="car"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setCar(e.target.value)
          }
          value={car}
          variant="outlined"
          label="Car"
          size="small"
          autoComplete="off"
          required
        />
        <TextField
          id="pts"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setPts(e.target.value)
          }
          value={pts}
          variant="outlined"
          label="PTS"
          size="small"
          autoComplete="off"
          required
        />
      </div>
      <button type="submit" style={titi.style}>
        {id ? "MODIFY" : "ADD"}
      </button>
    </form>
  );
};

export default DriverForm;
