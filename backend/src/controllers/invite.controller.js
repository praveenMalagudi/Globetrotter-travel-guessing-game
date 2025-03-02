import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Function to generate invite link with score
export const inviteFriend = asyncHandler(async (req, res) => {
  const {
    score: { correct, incorrect },
    pageUrl,
  } = req.body; // Destructure correct and incorrect scores from score object
  const inviteLink = `${pageUrl}?invitedBy=${req.user.userName}&correct=${correct}&incorrect=${incorrect}`; // Include correct and incorrect scores in the invite link

  return res
    .status(200)
    .json(
      new ApiResponse(200, { inviteLink }, "Invite generated successfully")
    );
});
