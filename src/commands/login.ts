import { getUserByName } from "src/lib/db/queries/users.js";
import { setUser } from "../config/config.js";
import { CommandHandler } from "./CommandsTypes.js";

export const handlerLogin: CommandHandler = async (
  cmdName: string,
  ...args: string[]
) => {
  if (args.length === 0) {
    throw new Error("A username is required.");
  }
  const username = args[0];
    const user= await getUserByName(username);
     if (!user) {
      throw new Error("User does not exists.");
    }
  setUser(username);

  console.log(`Logged in as ${username}`);
};
