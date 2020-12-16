import { dbConnect } from "../../../db/connection";
import { Resource } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const { gameId } = req.query;
      const resources = await Resource.find({
        gameId: gameId,
        active: true,
      });

      return res.json(resources);
    }
    default:
      res.statusCode = 500;
      return res.send(`Unsupported method ${req.method}`);
  }
};
