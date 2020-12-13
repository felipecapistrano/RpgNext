import { dbConnect } from "../../../db/connection";
import { Notes } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { _id, userId, gameId, notes } = req.body;
      const note = _id
        ? await Notes.updateOne(
            { userId: userId, gameId: gameId },
            { notes: notes }
          )
        : await new Notes({
            userId: userId,
            gameId: gameId,
            notes: notes,
            active: true,
          }).save();
      return res.json(note);
    }
  }
};
