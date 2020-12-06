import { dbConnect } from "../../../db/connection";
import { Character } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const characters = await Character.find({ game: id, active: true });
      return res.json(characters);
    }
    default:
      res.statusCode = 500;
      return res.send(`Unsupported method ${req.method}`);
  }
};
