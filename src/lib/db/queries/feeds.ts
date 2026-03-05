import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name, url, user_id: userId })
    .returning();
  return result;
}

export async function getFeedsWithUsers() {
  const result= await db
    .select({
      id: feeds.id,
      name: feeds.name,
      url: feeds.url,
      userName: users.name,
    })
    .from(feeds)
    .innerJoin(users, eq(feeds.user_id, users.id));
  return result;
}

export async function getFeedByUrl(url: string) {

    const [result] = await db.select()
    .from(feeds)
    .where(eq(feeds.url, url));
    
    return result;
    
}

export const markFeedFetched = async (feedId: string) => {
  await db.update(feeds)
    .set({
      lastFetchedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(feeds.id, feedId));
};



export const getNextFeedToFetch = async () => {
  const result = await db.execute(sql`
    SELECT * FROM feeds
    ORDER BY last_fetched_at ASC NULLS FIRST
    LIMIT 1
  `);

  return result[0];
};