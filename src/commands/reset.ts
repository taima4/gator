import { deleteAllUsers, getUserByName } from "src/lib/db/queries/users.js";
import { setUser } from "../config/config.js";
import { CommandHandler } from "./CommandsTypes.js";

export const handlerReset: CommandHandler = async () => {

   await deleteAllUsers();
  console.log("Database reset successfully.");
};
