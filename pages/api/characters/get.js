import { dbConnect } from "../../../db/connection";
import { Character } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const { gameId } = req.query;
      const players = await Character.find({
        gameId: gameId,
        npc: false,
        active: true,
      });
      const npcs = await Character.find({
        gameId: gameId,
        npc: true,
        active: true,
      });
      return res.json({ players: players, npcs: npcs });
    }
    default:
      res.statusCode = 500;
      return res.send(`Unsupported method ${req.method}`);
  }
};
