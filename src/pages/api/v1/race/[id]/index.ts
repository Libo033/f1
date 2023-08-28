import clientPromise from "@/Libs/databases/mongodbConnect";
import { IRace } from "@/Libs/interfaces";
import { Db, DeleteResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("project-f1");
      const id: string | undefined = req.query.id?.toString();

      if (id) {
        const race = await db
          .collection("races")
          .find({ _id: new ObjectId(id) })
          .toArray();

        return res.status(200).json({ race: race[0] });
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
      const id: string | undefined = req.query.id?.toString();

      if (!id) {
        throw new Error("ID needed to modify a race");
      }

      const put_race: IRace = {
        year: req.body.year,
        gp: req.body.gp,
        name: req.body.name,
        long: req.body.long,
        date: req.body.date,
        curves: {
          left: req.body.left,
          rigth: req.body.rigth,
        },
        record: req.body.record,
        image: req.body.image,
        backgroud: req.body.backgroud,
        podium: {
          first: req.body.first,
          second: req.body.second,
          third: req.body.third,
        },
        best_lap: req.body.best_lap,
        pole: req.body.pole,
        suspended: req.body.suspended,
        raced: req.body.raced,
      };

      const updated_race: UpdateResult = await db
        .collection("races")
        .updateOne({ _id: new ObjectId(id) }, { $set: put_race });

      return res.status(200).json({ updated: updated_race.acknowledged });
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
      const id: string | undefined = req.query.id?.toString();

      if (!id) {
        throw new Error("ID needed to delete a race");
      }

      const deleted_race: DeleteResult = await db
        .collection("races")
        .deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json({ deleted: deleted_race.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ Error: error.message });
      }
    }
  }
}
