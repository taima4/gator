import { getUsers } from "../lib/db/queries/users.js";
import { readConfig } from "../config/config.js";
import { CommandHandler } from "./CommandsTypes.js";

export const handlerUsers: CommandHandler = async () => {
  const allUsers = await getUsers();
  const config = readConfig();

  for (const user of allUsers) {
    if (user.name === config.currentUserName) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
};