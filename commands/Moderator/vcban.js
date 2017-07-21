exports.run = async (client, msg, [target, ...reason]) => {
    //Making sure target is fetched, and setting the executor
    target = await client.fetchUser(target.id);
    const executor = msg.author;
    const action = "VC Ban";
    reason = reason.toString().split(",").join(" ");

    //Checking to see if executor can act on target
    const canMod = await client.funcs.hierarchyCheck(client, executor, target, msg.guild).catch((err) => {
        msg.delete();
        return msg.reply(`It looks like you don't have permission to moderate ${target}. Are they in this server?`);
    });

    //Notify if user can't moderate target
    if (!canMod) {
        msg.delete();
        return msg.reply(`You don't have permission to moderate ${target}.`);
    }

    if (msg.content.includes ("-s")) {
        //Run silently if specified
        await client.funcs.modNotification(client, executor, target, msg, action, reason, true);
    } else {
        //Run normally
        await client.funcs.modNotification(client, executor, target, msg, action, reason, false);
    }

    /**  ~~~~   Action-specific Code starts here   ~~~~  **/

    const targetMember = await guild.fetchMember(target);

    //Kick user from voice channel if they're in one
    if (targetMember.voiceChannel) {
        const originChannel = targetMember.voiceChannel;

        try {
            const kickChannel = await msg.guild.createChannel(`kick${target.username}`, 'voice');
            await targetMember.setVoiceChannel(kickChannel);
            await setTimeout(() => {
                return kickChannel.delete();
            }, 250);
        } catch (err) {
            return client.emit("log", err, "error");
        }
    }

    //Voice Banning the target user
    return msg.guild.member(target).addRole(msg.guild.settings.voiceBannedRole)
        .catch((err) => msg.reply(`There was an error trying to voice ban ${target}: ${err}.`));


};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["vban", "vb"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "vcban",
    description: "Bans mentioned user from entering voice channels.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
