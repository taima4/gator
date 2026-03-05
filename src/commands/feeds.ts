import { getFeedsWithUsers } from "src/lib/db/queries/feeds";
import { CommandHandler } from "./CommandsTypes";


export const handlerFeeds: CommandHandler = async () => {

    const allFeeds= await getFeedsWithUsers();
  
    if (allFeeds.length===0){
    console.log("No feeds found.");
    return;
    }
for (const feed of allFeeds) {
    
    console.log("----------");
    console.log(`Name: ${feed.name}`);
    console.log(`URL: ${feed.url}`);
    console.log(`User: ${feed.userName}`);
}
}