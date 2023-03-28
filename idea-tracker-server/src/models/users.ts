import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Provide a name"],
  },
  password: {
    type: String,
    required: [true, "Must provide a password"],
  },
  notes: [
    {
      title: {
        type: String,
        required: [true, "Title property is required"],
      },
      category: {
        type: String,
      },
      body: {
        type: String,
        required: [true, "Must provide a body for your notes"],
      },
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

export const UserModel = mongoose.model("users", UserSchema);
