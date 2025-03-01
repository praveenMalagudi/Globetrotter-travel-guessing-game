import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

export const CityModel = mongoose.model("City", citySchema);
