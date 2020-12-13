import { dbConnect } from "../../../db/connection";
import { Notes } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const { userId, gameId } = req.query;
      const notes = await Notes.findOne({
        userId: userId,
        gameId: gameId,
        active: true,
      });
      return res.json(notes);
    }
    default:
      res.statusCode = 500;
      return res.send(`Unsupported method ${req.method}`);
  }
};
