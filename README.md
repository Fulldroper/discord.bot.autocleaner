The purpose of the project was to create a Discord bot that periodically cleans text channels to maintain order or anonymity in the channel.

The project is useful as it helps keep channels organized and free of clutter, and can also ensure that sensitive or temporary information is automatically deleted after a certain period.

## How the project works

The bot connects to a Discord server and schedules cleaning tasks at specified intervals. It scans the text channels for messages older than the set time limit and deletes them.

### Repository Link and Installation

You can find the repository and installation instructions at the following link:
[Discord Bot AutoCleaner](https://github.com/Fulldroper/discord.bot.autocleaner)

### Algorithm and Code Examples

1. **Connecting to Discord Server**
```javascript
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('YOUR_BOT_TOKEN');
client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag + '!');
});
```

2. **Scheduling Cleaning Tasks**
```javascript
const schedule = require('node-schedule');

client.on('ready', () => {
  const channel = client.channels.cache.get('CHANNEL_ID');
  schedule.scheduleJob('0 * * * *', () => { // Runs every hour
    cleanChannel(channel);
  });
});
```

3. **Cleaning the Channel**
```javascript
async function cleanChannel(channel) {
  const fetchedMessages = await channel.messages.fetch({ limit: 100 });
  const oldMessages = fetchedMessages.filter(msg => Date.now() - msg.createdTimestamp > 24 * 60 * 60 * 1000); // 1 day
  oldMessages.forEach(msg => msg.delete());
}
```

## Skills Acquired

- Advanced JavaScript and Node.js programming
- Working with the Discord API
- Scheduling tasks and handling asynchronous operations
- Implementing automated cleaning functions

