import { CommandHandler } from "./CommandsTypes";
import { UserCommandHandler } from "./CommandsTypes";
import { readConfig } from "../config/config";
import { getUserByName } from "../lib/db/queries/users";

export function middlewareLoggedIn(
  handler: UserCommandHandler
): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig();

    if (!config.currentUserName) {
      throw new Error("No user logged in.");
    }

    const user = await getUserByName(config.currentUserName);

    if (!user) {
      throw new Error("User not found.");
    }

    await handler(cmdName, user, ...args);
  };
}