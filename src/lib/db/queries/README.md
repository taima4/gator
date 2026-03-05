# Gator CLI

Gator is a simple CLI tool built with TypeScript that allows users to follow RSS feeds and manage them from the terminal.

The program connects to a database and lets users register, login, add feeds, follow feeds, and browse posts.

---

## Requirements

Before running the program, make sure you have the following installed:

- Node.js (v18 or higher)
- npm
- PostgreSQL
- Git

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/gator.git
cd gator
```

## Install dependencies

```bash
npm install
```

## Build the project:

```bash
tsc
```

---

## Config Setup

Create a config file called:

```
.gatorconfig.json
```

Inside your home directory.

## Example

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator",
  "current_user_name": ""
}
```

* `db_url` → your PostgreSQL connection string
* `current_user_name` → will be set automatically after login or register

---

## Running the CLI

Run commands using:

```bash
npm run start <command>
```


## Commands

### Register a user

```bash
npm run start register <username>
```

Creates a new user and sets it as the current user.

Example:

```bash
npm run start register kahya
```

---

### Login

```bash
npm run start login <username>
```

Sets the current user.

Example:

```bash
npm run start login kahya
```

---

### Add Feed

```bash
npm run start addfeed <name> <url>
```

Adds a new RSS feed.

Example:

```bash
npm run start addfeed tech https://techcrunch.com/feed/
```

---

### Follow Feed

```bash
npm run start follow <feed_url>
```

Follow an existing feed.

Example:

```bash
npm run start follow https://techcrunch.com/feed/
```

---

### List Feeds

```bash
npm run start feeds
```

Shows all feeds in the database.

---

### Following

```bash
npm run start following
```

Shows feeds followed by the current user.



### Unfollow Feed

```bash
npm run start unfollow <feed_url>
```
Removes a feed from your following list.

Example

```bash
npm run start unfollow https://techcrunch.com/feed/
```

### Feed Aggregator (The Engine)

```bash
npm run start agg <time_between_reqs>
```
Runs the long-running process that fetches posts from all feeds in the database. It will fetch the oldest (or never-fetched) feed first.

Example:

```bash
npm run start agg 1m
```

### Browse Posts

```bash
npm run start browse [limit]
```

Shows the latest posts from the feeds you follow. The limit is optional (default is 2).

## Migrations 
```
npx drizzle-kit generate
npx drizzle-kit migrate

```
## Technologies Used

* TypeScript
* Node.js
* PostgreSQL
* Drizzle ORM
* RSS Feeds

---

## Project Structure

```
src/
├─ commands/       # CLI command handlers
├─ config/         # Configuration
├─ lib/
│  ├─ db/
│  │  ├─ migrations/  # DB migrations
│  │  └─ queries/     # DB queries (users, feeds, posts, feedFollows)
│  ├─ schema.ts       # DB schemas
│  └─ rss.ts          # RSS feed fetcher/parser
├─ index.ts         # CLI entry point

```

---

## Notes

This project was built as part of a guided backend project to practice building CLI tools, working with databases, and integrating RSS feeds.

