import clientPromise from "@/Libs/databases/mongodbConnect";
import { IDriver } from "@/Libs/interfaces";
import { Db, MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("project-f1");
      const { order } = req.query;

      if (order === "pts") {
        let drivers = await db.collection("drivers").find({}).toArray();

        drivers = drivers.sort((a, b) => b.pts - a.pts);

        return res.status(200).json({ drivers });
      } else {
        const drivers = await db.collection("drivers").find({}).toArray();

        return res.status(200).json({ drivers });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ Error: error.message });
      }
    }
  }
  if (req.method === "POST") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("project-f1");

      const new_driver = {
        name: req.body.name,
        nationality: req.body.nationality,
        car: req.body.car,
        pts: req.body.pts,
      };

      const added_driver = await db.collection("drivers").insertOne(new_driver);

      return res.status(200).json({ added: added_driver.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ Error: error.message });
      }
    }
  }
}
