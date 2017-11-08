const Discord = require("discord.js");
const client = new Discord.Client(); require("discord-music-bot");
const config = require("./config.json");

/[DELETE THIS] ALL MESSAGES IN "[EXAMPLE]" DELETE IT AND PUT YOUR OWN MESSAGE, THIS INCLUDES DELETING THE "[]"!! [DELETE THIS]/


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`on ${client.guilds.size} servers | !help`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`${client.guilds.size} servers | !help`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers | !help`);
});

client.on('message', message => {
  if (message.content === 'about') {
    message.reply('[MESSAGE]');
  }
});

client.on("message", async message => {
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "verify") {
    const m = await message.channel.send("Verifying...");
    m.edit(`Currently in development, there are no verifying services avaible.`);
  }

  if(command === "about") {
    const m = await message.channel.send("Loading..");
    m.edit(`This Discord Server is for the bot RoLink, RoLink is an easy to use service that provides ROBLOX-to-Discord verification/linking, and many other management commands. Founded/Developed by American_Geyset and TacticalChevalier.`);
  }

  if (message.content === "!roll") {
    var result = Math.floor((Math.random() * 100) + 1);
    client.reply(message, "You rolled a: " + result);
  }

  if (message.content === "!flip") {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
      client.reply(message, "The coin landed on heads");
    } else if (result == 2) {
      client.reply(message, "The coin landed on tails");
    }
  }

  if (message.content === "!help") {
    client.reply(message,
      "Things I can do:" +
      "\n\n`!help` - Show's what I can do" +
      "\n`!question <your question>` - Ask and you shall recieve" +
      "\n`!roll` - Roll a number between 1-100" +
      "\n`!flip` - Flip a coin" +
      "\n`!8ball` - Ask the magic 8ball a question");
  }

  if (message.content === "!8ball") {
    var sayings = ["It is certain",
                  "It is decidedly so",
                  "Without a doubt",
                  "Yes, definitely",
                  "You may rely on it",
                  "As I see it, yes",
                  "Most likely",
                  "Outlook good",
                  "Yes",
                  "Signs point to yes",
                  "Reply hazy try again",
                  "Ask again later",
                  "Better not tell you now",
                  "Cannot predict now",
                  "Concentrate and ask again",
                  "Don't count on it",
                  "My reply is no",
                  "My sources say no",
                  "Outlook not so good",
                  "Very doubtful"];

    var result = Math.floor((Math.random() * sayings.length) + 0);
    client.reply(message, sayings[result]);
  }

  if(command === "help") {
    const m = await message.channel.send("Loading..");
    m.edit(`Commands: Coming soon!`);
  }

  if(command === "twitter") {
    const m = await message.channel.send("Loading..");
    m.edit(`RoLink Discord Twitter: https://twitter.com/RoLinkDiscord`);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["RoLink Creators"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["RoLink Creators"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(command === "play")  {
    var serverName = "[Discord Server Name]";
    var textChannelName = "[Music request channel name, say without #]";
    var voiceChannelName = "[Voice channel name]";
    var aliasesFile = "[PATH TO FOLDER, EXAMPLE "/users/name/foldername"]";
    var setYoutubeKey = "[Youtube Key, look it up]";
    var run = "serverName, textChannelName, voiceChannelName, aliasesFile, setYoutubeKey";
    }
})

client.login('token');
