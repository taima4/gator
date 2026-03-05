import { registerCommand, runCommand } from "./commands/registry.js";

import { handlerLogin } from "./commands/login.js";
import { CommandsRegistry } from "./commands/CommandsTypes.js";
import { handlerRegister } from "./commands/register.js";
import { handlerReset } from "./commands/reset.js";
import { handlerUsers } from "./commands/usersList.js";
import { handlerAgg } from "./commands/agg.js";
import { handlerAddFeed } from "./commands/addfeed.js";
import { handlerFeeds } from "./commands/feeds.js";
import { handlerFollow } from "./commands/follow.js";
import { handlerFollowing } from "./commands/following.js";
import { middlewareLoggedIn } from "./commands/middleware.js";
import { handlerUnfollow } from "./commands/unfollow.js";
import { handlerBrowse } from "./commands/browse.js";

async function main() {
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  middlewareLoggedIn(handlerAddFeed);
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
    registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  try {
    await runCommand(registry, cmdName, ...cmdArgs);
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
}

main();
