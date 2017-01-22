const inspect = require("util").inspect;

exports.run = (client, msg, [code]) => {
  try {
    let evaled = eval(code);
    if (typeof evaled !== "string") {
      evaled = inspect(evaled);
    }
    msg.channel.sendCode("xl", client.funcs.clean(client, evaled));
  } catch (err) {
    msg.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${
      client.funcs.clean(err)
      }\n\`\`\``);
  }

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').sendMessage('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      fields: [{
          name: "Command Content",
          value: `\`${msg.content}\``,
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `${msg.author.username}#${msg.author.discriminator}`,
        icon_url: msg.author.avatarURL
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ev"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "eval",
  description: "Evaluates arbitrary Javascript. Reserved for bot owner.",
  usage: "<expression:str>",
  usageDelim: "",
};
