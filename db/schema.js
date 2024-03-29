import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

const CharacterSchema = Schema({
  name: { type: String, required: true },
  image: String,
  gameId: { type: Schema.Types.ObjectId, required: true, ref: "Game" },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  fields: [Object],
  npc: Boolean,
  active: Boolean,
});

export const Character =
  mongoose.models.Character || mongoose.model("Character", CharacterSchema);

const ResourceSchema = Schema({
  gameId: { type: Schema.Types.ObjectId, required: true, ref: "Game" },
  name: { type: String, required: true },
  link: { type: String, required: true },
  active: Boolean,
});

export const Resource =
  mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);

const NotesSchema = Schema({
  gameId: { type: Schema.Types.ObjectId, required: true, ref: "Game" },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  notes: { type: String, required: true },
  active: Boolean,
});

export const Notes =
  mongoose.models.Notes || mongoose.model("Notes", NotesSchema);

const GameSchema = Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  genre: String,
  image: String,
  description: String,
  sheet: [Object],
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  active: Boolean,
});

export const Game = mongoose.models.Game || mongoose.model("Game", GameSchema);
