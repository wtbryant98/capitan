exports.run = (client, msg, [user]) => {
  let role = msg.guild.roles.find("name", "Muted")
  msg.mentions.users.first().sendMessage(`You have been muted in the ${msg.guild.name} Discord.`);
  msg.guild.member(user).addRole(role)
  .then(() => msg.channel.sendMessage(`<@${msg.mentions.users.first().id}> was muted.`))
  .catch(e => msg.reply(`There was an error trying to mute: ${e}`));

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
  guildOnly: true,
  aliases: ["m"],
  permLevel: 2,
  botPerms: [0x10000000],
  requiredFuncs: []
};

exports.help = {
  name: "mute",
  description: "Mutes mentioned user and logs reason.",
  usage: "<user:user> <reason:str>",
  usageDelim: " "
};
