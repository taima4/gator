import { asc, desc, eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, posts } from "../schema";

export async function createPost(post:{
  title: string;
  url: string;
  feedId: string;
  publishedAt: Date | null;
  description: string | null;
}) {
  const [result] = await db
    .insert(posts)
    .values(post)
    .onConflictDoNothing({ target: posts.url })
    .returning();
  return result;
}

export async function getPostsForUser(userId: string, limit = 2) {
  const result = await db
    .select( {
      title: posts.title,
      url: posts.url,
      publishedAt: posts.publishedAt,
      feedName: feeds.name,
    })
    .from(posts)
    .innerJoin(feeds, eq(feeds.id, posts.feedId))
    .innerJoin(feedFollows, eq(feeds.id, feedFollows.feed_id))
    .where(eq(feedFollows.user_id, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
  return result;
}
