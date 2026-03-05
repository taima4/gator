import { getPostsForUser } from "src/lib/db/queries/posts";
import { UserCommandHandler } from "./CommandsTypes";

export const handlerBrowse: UserCommandHandler = async (
  cmdName,
  user,
  ...args
) => {
const limitArg = parseInt(args[0]);
const limit = !isNaN(limitArg) ? limitArg : 2;

  const posts = await getPostsForUser(user.id, limit);

  if (!posts.length) {
    console.log("No posts found.");
    return;
  }

  for (const post of posts) {
    console.log("=========================================");
    console.log(`Title: ${post.title}`);
    console.log(`Feed: ${post.feedName}`);
    console.log(`Published: ${post.publishedAt}`);
    console.log(`URL: ${post.url}`);
    console.log("");
  }
};
