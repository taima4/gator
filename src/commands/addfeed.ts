import { readConfig } from "src/config/config.js";
import { CommandHandler, UserCommandHandler } from "./CommandsTypes.js";
import { getUserByName } from "src/lib/db/queries/users.js";
import { createFeed } from "src/lib/db/queries/feeds.js";
import { Feed, User } from "src/lib/db/schema.js";
import { createFeedFollow } from "src/lib/db/queries/feedFollows.js";

export const handlerAddFeed: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
  if (args.length < 2) {
    throw new Error("Name and URL are required.");
  }
  const [name, url] = args;

  const feed = await createFeed(name, url, user.id);
  printFeed(feed, user);

  await createFeedFollow(user.id, feed.id);
  console.log(`${user.name} is now following ${feed.name}`);
};

function printFeed(feed: Feed, user: User) {
  console.log("New feed added successfully:");
  console.log(`ID: ${feed.id}`);
  console.log(`Name: ${feed.name}`);
  console.log(`URL: ${feed.url}`);
  console.log(`User: ${user.name}`);
}
