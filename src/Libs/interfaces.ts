import { SetStateAction } from "react";

export interface IRace {
  _id: string;
  year: number;
  gp: string;
  name: string;
  long: number;
  date: string; // formato: 3-5 de marzo
  curves: {
    left: number;
    rigth: number;
  };
  record: string; // formato: Lewis Hamilton - 1:27.264 - (2020)
  image: string;
  backgroud: string;
  podium: {
    first: string;
    second: string;
    third: string;
  };
  best_lap: string; // formato: Fernando Alonso - 1:14.014
  pole: string; // formato: Carlos Sainz
  suspended: boolean;
  raced: boolean;
}

export interface ILayoutProps {
  children: React.ReactNode;
}

export interface IOpenDrawer {
  setToggleDrawer: React.Dispatch<SetStateAction<boolean>>;
}

export interface ILastRaceProps {
  gp: string;
  name: string;
  circuit: string;
}

export interface IDriver {
  _id: string;
  name: string;
  car: string;
  pts: number;
  nationality: string;
}
