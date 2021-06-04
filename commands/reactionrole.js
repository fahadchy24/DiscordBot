module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
}
module.exports.execute = async function (message, args, Discord, client) {
    const channel = '849394073944195082';
    const BLUE_ROLE = message.guild.roles.cache.find(role => role.name === "Blue Role");
    const RED_ROLE = message.guild.roles.cache.find(role => role.name === "Red Role");

    const blueEmoji = '💙';
    const redEmoji = '❤️';

    let embed = new Discord.MessageEmbed()
        .setColor('#e42643')
        .setTitle('Choose a emoji to get a role')
        .setDescription('Choosing a role will allow you to interact and perform anything in this server.\n\n'
            + `${blueEmoji} for Blue role\n`
            + `${redEmoji} for Red role`);
    
    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(blueEmoji);
    messageEmbed.react(redEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.message.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === blueEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BLUE_ROLE);
            }
            if (reaction.emoji.name === redEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(RED_ROLE);
            }
        } else {
            return;
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.message.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === blueEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BLUE_ROLE);
            }
            if (reaction.emoji.name === redEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(RED_ROLE);
            }
        } else {
            return;
        }
    });
}