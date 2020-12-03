import { dbConnect } from "../../../db/connection";
import { Game } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { id, fields } = req.body;
      const game = await Game.findOneAndUpdate(
        { _id: id, active: true },
        { sheet: fields }
      );
      return res.json(game);
    }
  }
};
