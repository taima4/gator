import { readConfig } from "src/config/config";
import { CommandHandler, UserCommandHandler } from "./CommandsTypes";
import { getFeedFollowsForUser } from "src/lib/db/queries/feedFollows";
import { getUserByName } from "src/lib/db/queries/users";

export const handlerFollowing: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
  const follows = await getFeedFollowsForUser(user.id);

  for (const follow of follows) {
    console.log(follow.feedName);
  }
};
