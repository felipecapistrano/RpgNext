import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

const GameSchema = Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  genre: String,
  image: String,
  description: String,
  permittedusers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  active: Boolean,
});

export const Game = mongoose.models.Game || mongoose.model("Game", GameSchema);
