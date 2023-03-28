import mongoose from "mongoose";
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: "User", },
});

export default mongoose.model("User", UserSchema);
