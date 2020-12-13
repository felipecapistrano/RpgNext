import { dbConnect } from "../../../db/connection";
import { Game, Resource } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { gameId, ...params } = req.body;

      const resource = await new Resource({
        ...params,
        game: gameId,
        active: true,
      }).save();
      await Game.updateOne(
        { _id: gameId, active: true },
        { $push: { resources: resource._id } }
      );
      return res.json(resource);
    }
  }
};
