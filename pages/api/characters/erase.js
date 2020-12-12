import { dbConnect } from "../../../db/connection";
import { Game, Character } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { _id, gameId } = req.body;
      await Character.updateOne({ _id: _id }, { active: false });
      await Game.updateOne({ _id: gameId }, { $pull: { characters: _id } });
      return res.json(_id);
    }
  }
};
