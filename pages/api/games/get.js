import { dbConnect } from "../../../db/connection";
import { Game } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const game = await Game.findOne({ _id: id, active: true })
        .populate("players")
        .populate("owner")
        .populate("characters");
      if (game) {
        return res.json(game);
      } else {
        res.statusCode = 401;
        return res.send("Game doesn't exist");
      }
    }
    default:
      res.statusCode = 500;
      return res.send(`Unsupported method ${req.method}`);
  }
};
