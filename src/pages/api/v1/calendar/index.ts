import clientPromise from "@/Libs/databases/mongodbConnect";
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

      const races = await db.collection("races").find({}).toArray();

      res.status(200).json({ calendar: races });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ Error: error.message });
      }
    }
  }
}
