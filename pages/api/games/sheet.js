import { dbConnect } from "../../../db/connection";
import { Game, Character } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { id, fields } = req.body;
      const game = await Game.findOneAndUpdate(
        { _id: id, active: true },
        { sheet: fields }
      );
      await Game.updateOne({ _id: game }, { characters: [] });
      await Character.updateMany({ game: id }, { active: false });

      return res.json(game);
    }
  }
};
