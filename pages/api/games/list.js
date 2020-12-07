import { dbConnect } from "../../../db/connection";
import { Game } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const { playerId } = req.query;
      const games = await Game.find({ players: playerId, active: true });
      return res.json(games);
    }
    default:
      res.statusCode = 500;
      return res.send(`Unsupported method ${req.method}`);
  }
};
