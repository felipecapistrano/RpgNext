import { dbConnect } from "../../../db/connection";
import { Game } from "../../../db/schema";

import convert from "../../../db/convertId";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { owner, image, ...params } = req.body;

      const game = await new Game({
        ...params,
        image: image
          ? image
          : "https://www.josco.com.au/wp-content/uploads/2016/05/Image-Unavailable.jpg",
        owner: convert(owner),
        players: [convert(owner)],
        active: true,
      }).save();
      return res.json(game);
    }
  }
};
