import { dbConnect } from "../../../db/connection";
import { User } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { _id, ...params } = req.body;
      const user = _id
        ? await User.findOneAndUpdate({ _id }, params, { new: true })
        : await new User({ ...params, active: true }).save();
      return res.json(user);
    }
    case "GET": {
      const users = await User.find({ active: true });
      return res.json(users);
    }
    case "DELETE": {
      const { _id } = req.body;
      await User.findOneAndUpdate({ _id }, { active: true });
      return res.json(true);
    }
    default:
      return res.send(`Unsupported method ${req.method}`);
  }
};
