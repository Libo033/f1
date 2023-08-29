import clientPromise from "@/Libs/databases/mongodbConnect";
import { IDriver } from "@/Libs/interfaces";
import { Db, MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("project-f1");
      const id = req.query.id?.toString();

      if (id) {
        const driver = await db
          .collection("drivers")
          .find({ _id: new ObjectId(id) })
          .toArray();

        return res.status(200).json(driver[0]);
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ Error: error.message });
      }
    }
  }
  if (req.method === "PUT") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("project-f1");
      const id = req.query.id?.toString();

      if (id) {
        const modify_driver: IDriver = {
          name: req.body.name,
          nationality: req.body.nationality,
          car: req.body.car,
          pts: req.body.pts,
        };

        const updated_driver = await db
          .collection("drivers")
          .updateOne({ _id: new ObjectId(id) }, { $set: modify_driver });

        return res.status(200).json({ updated: updated_driver.acknowledged });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ Error: error.message });
      }
    }
  }
  if (req.method === "DELETE") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("project-f1");
      const id = req.query.id?.toString();

      if (id) {
        const delete_driver = await db
          .collection("drivers")
          .deleteOne({ _id: new ObjectId(id) });

        return res.status(200).json({ deleted: delete_driver.acknowledged });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ Error: error.message });
      }
    }
  }
}
