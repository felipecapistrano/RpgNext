import { dbConnect } from "../../../db/connection";
import { Game, Resource } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { _id, gameId } = req.body;
      await Resource.updateOne({ _id: _id }, { active: false });
      await Game.updateOne({ _id: gameId }, { $pull: { resources: _id } });
      return res.json(_id);
    }
  }
};
