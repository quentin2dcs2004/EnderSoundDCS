const { MessageEmbed } = require('discord.js');

module.exports.embedBuilder = (color, title, description) => {
    return new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp();
};
