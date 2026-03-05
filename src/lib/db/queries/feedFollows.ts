import { and, eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";

export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({ user_id: userId, feed_id: feedId })
    .onConflictDoNothing()
    .returning();

  if (!newFeedFollow) {
    return undefined;
  }

  const [result] = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.user_id))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feed_id))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return result;
}

export async function getFeedFollowsForUser(userId: string) {
  const result = await db
    .select({
      feedName: feeds.name,
      userName: users.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.user_id))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feed_id))
    .where(eq(feedFollows.user_id, userId));

  return result;
}

export const deleteFeedFollow = async (userId: string, feedUrl: string) => {
  const [feed] = await db
    .select({ id: feeds.id })
    .from(feeds)
    .where(eq(feeds.url, feedUrl));

  await db
    .delete(feedFollows)
    .where(
      and(eq(feedFollows.user_id, userId), eq(feedFollows.feed_id, feed.id)),
    );
};
