import { createUser, getUserByName } from "src/lib/db/queries/users";
import { CommandHandler } from "./CommandsTypes";
import { setUser } from "src/config/config";


export const handlerRegister: CommandHandler = async (cmdName, ...args) => {
     if (args.length === 0) {
    throw new Error("A username is required.");
  }

  const username= args[0];

  const existingUser= await getUserByName(username);
   if (existingUser) {
    throw new Error("User already exists.");
  }
  const newUser = await createUser(username);

  setUser(username);

console.log("User created successfully:");
  console.table(newUser);
}

