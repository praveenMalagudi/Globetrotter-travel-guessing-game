import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { DatasetModel } from "../models/datasets.model.js";
import { CityModel } from "../models/cities.model.js";
import mongoose from "mongoose";

export const getDataset = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const datasets = await DatasetModel.find();
  let datasetToReturn = null;

  for (const dataset of datasets) {
    const users = Array.isArray(dataset.user) ? dataset.user : [];

    if (users.some((user) => user.equals(userId))) {
      continue;
    } else {
      datasetToReturn = dataset;
      break;
    }
  }

  if (datasetToReturn) {
    if (!Array.isArray(datasetToReturn.user)) {
      datasetToReturn.user = [];
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    if (!datasetToReturn.user.includes(objectId)) {
      datasetToReturn.user.push(objectId);
      await datasetToReturn.save();
    }

    const clues = datasetToReturn.clues;

    const allCities = await CityModel.find();
    const randomCities = allCities.sort(() => 0.5 - Math.random()).slice(0, 3);

    const uniqueCities = [
      datasetToReturn.city,
      ...randomCities.map((city) => city.city),
    ];
    const uniqueOptions = [...new Set(uniqueCities)]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    return res.status(200).json(
      new ApiResponse(200, {
        clues,
        options: uniqueOptions,
        datasetId: datasetToReturn._id,
      })
    );
  }

  throw new ApiError(404, "No datasets available");
});

export const checkQuizAnswer = asyncHandler(async (req, res) => {
  const { datasetId, option } = req.body;

  const dataset = await DatasetModel.findById(datasetId);
  if (!dataset) {
    throw new ApiError(404, "Dataset not found");
  }

  const isCorrect = dataset.city === option;

  return res.status(200).json({
    isCorrect,
    trivia: dataset.trivia, // Assuming 'trivia' is a field in your dataset
    funFacts: dataset.fun_fact, // Assuming 'funFacts' is a field in your dataset
    answer: dataset.city,
  });
});
