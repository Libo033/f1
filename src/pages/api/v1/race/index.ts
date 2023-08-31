import clientPromise from "@/Libs/databases/mongodbConnect";
import { Db, InsertOneResult, MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/Libs/databases/cloudinaryConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("project-f1");

      const uploaded_image: UploadApiResponse = await cloudinary.uploader.upload(req.body.image, {
        upload_preset: "02-project-f1",
      });

      const new_race = {
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
        image: uploaded_image.secure_url,
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

      const added_race: InsertOneResult = await db
        .collection("races")
        .insertOne(new_race);

      if (!added_race) {
        throw new Error("Race cannot be uploaded");
      }

      return res.status(201).json({ added: added_race.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ Error: error.message });
      }
    }
  }
}
