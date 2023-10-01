import mongoose from "mongoose";

const chatCollection = "mesagges";

const chatSchema = new mongoose.Schema({
  // user: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  message: {
    type: String,
    required: true,
  },
});

export const chatModel = mongoose.model(chatCollection, chatSchema);
