import { readConfig } from "src/config/config";
import { CommandHandler, UserCommandHandler } from "./CommandsTypes";
import { getUserByName } from "src/lib/db/queries/users";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { createFeedFollow } from "src/lib/db/queries/feedFollows";

export const handlerFollow: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
  if (args.length === 0) {
    throw new Error("URL is required.");
  }
  const url = args[0];

  const feed = await getFeedByUrl(url);
  if (!feed) throw new Error("Feed not found.");

const follow = await createFeedFollow(user.id, feed.id);

if (!follow) {
  console.log("You already follow this feed.");
  return;
}

 console.log(`${follow.userName} is now following ${follow.feedName}`);
};
