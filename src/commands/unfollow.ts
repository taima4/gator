import { deleteFeedFollow } from "src/lib/db/queries/feedFollows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { UserCommandHandler } from "./CommandsTypes";

export const handlerUnfollow: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
  if (args.length < 1) {
    throw new Error("URL is required");
  }

  const url = args[0];

   const feed = await getFeedByUrl(url);

  if (!feed) {
    throw new Error("Feed not found.");
  }
  await deleteFeedFollow(user.id, url);

  console.log("Unfollowed successfully.");
};