import clientPromise from "@/Libs/databases/mongodbConnect";
import { Db, DeleteResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/Libs/databases/cloudinaryConnect";
import { UploadApiResponse } from "cloudinary";

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
      let image: string = "";
      let background: string = "";

      const race: any = await db
        .collection("races")
        .find({ _id: new ObjectId(id) })
        .toArray();

      if (!req.body.image.includes("res.cloudinary.com")) {
        if (req.body.image === race[0].image) {
          image = race[0].image;
        } else {
          const public_id_image: string = race[0].image.slice(
            race[0].image.indexOf("02-project-f1/") + "02-project-f1/".length,
            race[0].image.length - 4
          );

          await cloudinary.uploader.destroy(
            "02-project-f1/" + public_id_image,
            {
              resource_type: "image",
            }
          );

          const uploaded_image: UploadApiResponse =
            await cloudinary.uploader.upload(req.body.image, {
              upload_preset: "02-project-f1",
            });

          image = uploaded_image.secure_url;
        }
      } else {
        image = req.body.image;
      }

      if (!req.body.background.includes("res.cloudinary.com")) {
        if (req.body.backgroud === race[0].backgroud) {
          background = race[0].backgroud;
        } else {
          const public_id_background: string = race[0].backgroud.slice(
            race[0].image.indexOf("02-project-f1/") + "02-project-f1/".length,
            race[0].image.length - 4
          );

          console.log(public_id_background)

          await cloudinary.uploader.destroy(
            "02-project-f1/" + public_id_background,
            {
              resource_type: "image",
            }
          );

          const uploaded_background: UploadApiResponse =
            await cloudinary.uploader.upload(req.body.background, {
              upload_preset: "02-project-f1",
            });

          background = uploaded_background.secure_url;
        }
      } else {
        background = req.body.background;
      }

      if (!id) {
        throw new Error("ID needed to modify a race");
      }

      const put_race = {
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
        image: image,
        backgroud: background,
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

      const race: any = await db
        .collection("races")
        .find({ _id: new ObjectId(id) })
        .toArray();

      if (race[0].image.length > 0) {
        const public_id_image: string = race[0].image.slice(
          race[0].image.indexOf("02-project-f1/") + "02-project-f1/".length,
          race[0].image.length - 4
        );

        await cloudinary.uploader.destroy("02-project-f1/" + public_id_image, {
          resource_type: "image",
        });
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
