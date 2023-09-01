import React, { FormEvent, useEffect, useState } from "react";
import styles from "@/styles/Forms.module.css";
import { Titillium_Web } from "next/font/google";
import { NextRouter, useRouter } from "next/router";
import { Checkbox, TextField } from "@mui/material";

const titi = Titillium_Web({
  weight: "700",
  subsets: ["latin"],
});

const RaceForm: React.FC<{ id: string | undefined }> = ({ id }) => {
  const router: NextRouter = useRouter();
  const [suspended, setSuspended] = useState<boolean>(false);
  const [raced, setRaced] = useState<boolean>(false);
  const [year, setYear] = useState<string>("");
  const [gp, setGp] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [long, setLong] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [left, setLeft] = useState<string>("");
  const [right, setRight] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [record, setRecord] = useState<string>("");
  const [first, setFirst] = useState<string>("");
  const [second, setSecond] = useState<string>("");
  const [third, setThird] = useState<string>("");
  const [bestLap, setBestLap] = useState<string>("");
  const [pole, setPole] = useState<string>("");
  const [button, setButton] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setButton(true)

    if (id) {
      fetch(`/api/v1/race/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          gp,
          name,
          long: parseInt(long),
          date,
          left: parseInt(left),
          rigth: parseInt(right),
          record,
          image,
          background,
          first,
          second,
          third,
          best_lap: bestLap,
          pole,
          suspended,
          raced,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.updated) {
            router.push("/admin/dashboard/races");
          }
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.log(error.message);
            router.push("/admin/dashboard/races");
          }
        });
    }

    fetch(`/api/v1/race`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        year: parseInt(year),
        gp,
        name,
        long: parseInt(long),
        date,
        left: parseInt(left),
        rigth: parseInt(right),
        record,
        image,
        background,
        first,
        second,
        third,
        best_lap: bestLap,
        pole,
        suspended,
        raced,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.added) {
          router.push("/admin/dashboard/races");
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/race/${id}`, { method: "GET" })
        .then((res) => res.json())
        .then(({ race }) => {
          setYear(race.year);
          setGp(race.gp);
          setName(race.name);
          setLong(race.long);
          setDate(race.date);
          setLeft(race.curves.left);
          setRight(race.curves.rigth);
          setRecord(race.record);
          setImage(race.image);
          setBackground(race.background);
          setFirst(race.podium.first);
          setSecond(race.podium.second);
          setThird(race.podium.third);
          setBestLap(race.best_lap);
          setPole(race.pole);
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
        {id ? "Modify race" : "Add new race"}
      </h2>
      <div className={styles.formContainer}>
        <TextField
          value={year}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setYear(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Year"
          size="small"
          autoComplete="off"
          required
        />
        <div className={styles.formContainerInputs}>
          <TextField
            value={gp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGp(e.target.value)
            }
            type="text"
            variant="outlined"
            label="GP"
            size="small"
            autoComplete="off"
            required
          />
          <TextField
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            type="text"
            variant="outlined"
            label="Name circuit"
            size="small"
            autoComplete="off"
            required
          />
        </div>
        <TextField
          value={long}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLong(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Long"
          size="small"
          autoComplete="off"
          required
        />
        <TextField
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Date"
          size="small"
          autoComplete="off"
          required
        />
        <div className={styles.formContainerInputs}>
          <TextField
            value={left}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLeft(e.target.value)
            }
            type="text"
            variant="outlined"
            label="Left Turns"
            size="small"
            autoComplete="off"
            required
          />
          <TextField
            value={right}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRight(e.target.value)
            }
            type="text"
            variant="outlined"
            label="Right Turns"
            size="small"
            autoComplete="off"
            required
          />
        </div>
        <TextField
          value={record}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRecord(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Record"
          size="small"
          autoComplete="off"
        />
        <TextField
          value={image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Image"
          size="small"
          autoComplete="off"
          required
        />
        <TextField
          value={background}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBackground(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Background Image"
          size="small"
          autoComplete="off"
          required
        />
        <div className={styles.formContainerInputs}>
          <TextField
            value={first}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirst(e.target.value)
            }
            type="text"
            variant="outlined"
            label="First Position"
            size="small"
            autoComplete="off"
            required={raced}
            disabled={suspended}
          />
          <TextField
            value={second}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSecond(e.target.value)
            }
            type="text"
            variant="outlined"
            label="Second Position"
            size="small"
            autoComplete="off"
            required={raced}
            disabled={suspended}
          />
          <TextField
            value={third}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setThird(e.target.value)
            }
            type="text"
            variant="outlined"
            label="Third Position"
            size="small"
            autoComplete="off"
            required={raced}
            disabled={suspended}
          />
        </div>
        <TextField
          value={bestLap}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBestLap(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Best Lap"
          size="small"
          autoComplete="off"
          required={raced}
          disabled={suspended}
        />
        <TextField
          value={pole}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPole(e.target.value)
          }
          type="text"
          variant="outlined"
          label="Pole"
          size="small"
          autoComplete="off"
          required={raced}
          disabled={suspended}
        />
        <div className={styles.CheckboxContainer}>
          <Checkbox
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSuspended(e.target.checked)
            }
            value={suspended}
            id="suspended"
          />
          <label htmlFor="suspended">Suspended</label>
        </div>
        <div className={styles.CheckboxContainer}>
          <Checkbox
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRaced(e.target.checked)
            }
            value={raced}
            id="raced"
          />
          <label htmlFor="raced">Raced</label>
        </div>
      </div>
      <button type="submit" disabled={button} style={titi.style}>
        {id ? "MODIFY" : "ADD"}
      </button>
    </form>
  );
};

export default RaceForm;
