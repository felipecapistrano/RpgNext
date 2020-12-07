import { dbConnect } from "../../../db/connection";
import { User } from "../../../db/schema";

export default async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "POST": {
      const { name, password } = req.body;
      const user = await User.findOne({
        name: name,
        password: password,
        active: true,
      });
      if (user) {
        return res.json(user);
      } else {
        res.statusCode = 401;
        return res.send("User doesn't exist");
      }
    }
    default:
      res.statusCode = 500;
      return res.send(`Unsupported method ${req.method}`);
  }
};
