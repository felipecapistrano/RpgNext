import { dbConnect } from "../../../db/connection";
import { Game, Resource } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { gameId, ...params } = req.body;

      const resource = await new Resource({
        ...params,
        gameId: gameId,
        active: true,
      }).save();
      return res.json(resource);
    }
  }
};
