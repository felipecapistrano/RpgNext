import { dbConnect } from "../../../db/connection";
import { Character, Game } from "../../../db/schema";

import convert from "../../../db/convertId";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { _id, user, image, game, ...params } = req.body;
      console.log(_id);
      const character = _id
        ? await Character.updateOne({ _id: _id }, { image: image, ...params })
        : await new Character({
            ...params,
            image: image
              ? image
              : "https://www.josco.com.au/wp-content/uploads/2016/05/Image-Unavailable.jpg",
            user: convert(user),
            game: convert(game),
            active: true,
          }).save();
      await Game.updateOne(
        { _id: game, active: true },
        { $push: { characters: character._id } }
      );

      return res.json(character);
    }
  }
};
