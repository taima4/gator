import {
  getNextFeedToFetch,
  markFeedFetched,
} from "src/lib/db/queries/feeds.js";
import { fetchFeed } from "../lib/rss.js";
import { CommandHandler } from "./CommandsTypes.js";
import { createPost } from "src/lib/db/queries/posts.js";
import { posts } from "src/lib/db/schema.js";

export const handlerAgg: CommandHandler = async (_, ...args) => {
  if (!args[0]) {
    throw new Error("time between request is required");
  }
  const timeBetweenRequests = parseDuration(args[0]);
  console.log(`Collecting feeds every ${args[0]}`);

  scrapeFeeds().catch((err) => {
    console.error("An error occurred:", err);
  });

  const interval = setInterval(() => {
    scrapeFeeds().catch((err) => {
      console.error("An error occurred:", err);
    });
  }, timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
};

export const scrapeFeeds = async () => {
  const nextFeed = await getNextFeedToFetch();
  if (!nextFeed) {
    throw new Error("No feeds found");
  }

  await markFeedFetched(nextFeed.id as string);
  let feed;
  try {
    feed = await fetchFeed(nextFeed.url as string);
  } catch (error) {
    console.error(`Failed to fetch ${nextFeed.url}:`, error);
    return;

  }
  if (!feed?.channel?.item || feed.channel.item.length === 0) {
    console.log(`No items in feed ${nextFeed.url}`);
    return;
  }

  const items = Array.isArray(feed.channel.item)
  ? feed.channel.item
  : [feed.channel.item];
  for (const item of items) {
    await createPost({
      title: item.title,
      url: item.link,
      description: item.description || null,
      publishedAt: item.pubDate ? new Date(item.pubDate) : null,
      feedId: nextFeed.id as string,
    });
  }
  console.log(`Fetched ${items.length} posts from ${nextFeed.name}`);
};

function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);

  if (!match) {
    throw new Error("Invalid duration format");
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "ms":
      return value;
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    default:
      throw new Error("Invalid duration unit");
  }
}
