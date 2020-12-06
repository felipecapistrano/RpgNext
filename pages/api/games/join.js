import { dbConnect } from "../../../db/connection";
import { Game } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { id, player } = req.body;
      const game = await Game.updateOne(
        { _id: id, active: true },
        { $push: { players: player } }
      );
      return res.json(game);
    }
  }
};
