import { dbConnect } from "../../../db/connection";
import { User } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { ...params } = req.body;
      const user = await new User({ ...params, active: true }).save();
      return res.json(user);
    }
  }
};
