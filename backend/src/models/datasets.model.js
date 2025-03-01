import mongoose, { Schema } from "mongoose";

const DatasetSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  clues: {
    type: [String],
    required: true,
  },
  fun_fact: {
    type: [String],
    required: true,
  },
  trivia: {
    type: [String],
    required: true,
  },
  user: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

// Export the model
export const DatasetModel = mongoose.model("Dataset", DatasetSchema);
