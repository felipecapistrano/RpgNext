import moongose from "mongoose";

export default function convert(string) {
  return moongose.Types.ObjectId(string);
}
