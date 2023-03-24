import mongoose from "mongoose";
const ShelveSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  book_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Shelves", ShelveSchema);
