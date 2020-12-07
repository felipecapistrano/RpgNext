import { dbConnect } from "../../../db/connection";
import { Game } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { gameId, userId } = req.body;
      const game = await Game.updateOne(
        { _id: gameId, active: true },
        { $push: { players: userId } }
      );
      return res.json(game);
    }
  }
};
