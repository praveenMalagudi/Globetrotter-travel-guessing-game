import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Function to generate invite link with score
export const inviteFriend = asyncHandler(async (req, res) => {
  const { username, score } = req.body; // Username of the friend to invite and score
  const inviteLink = `${process.env.APP_URL}/play?invitedBy=${req.user.userName}&score=${score}`; // Dynamic invite link with score

  return res
    .status(200)
    .json(
      new ApiResponse(200, { inviteLink }, "Invite generated successfully")
    );
});
