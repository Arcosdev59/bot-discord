import "dotenv/config";
import { Client, GatewayIntentBits, Partials, Events } from "discord.js";

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error(
    "Missing DISCORD_TOKEN in .env. Create .env and set DISCORD_TOKEN=your-bot-token"
  );
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Bot connected as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  const [command, ...args] = message.content.slice(1).trim().split(/\s+/);

  switch (command.toLowerCase()) {
    case "ping":
      await message.reply("Pong!");
      break;
    case "echo":
      await message.reply(args.join(" ") || "Nothing to echo.");
      break;
    default:
      await message.reply("Unknown command. Try !ping or !echo");
  }
});

client.login(token).catch((err) => {
  console.error("Failed to login:", err.message);
  process.exit(1);
});
