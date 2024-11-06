const { MessageEmbed } = require('discord.js');

module.exports.eventHandler = (client) => {
    // Événement quand le bot est prêt
    client.on('ready', () => {
        console.log(`${client.user.tag} est connecté à Discord !`);
    });

    // Événement quand un membre rejoint le serveur
    client.on('guildMemberAdd', (member) => {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'général');
        if (!channel) return;

        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Bienvenue!')
            .setDescription(`Bienvenue sur le serveur, ${member.user.tag}!`)
            .setTimestamp();

        channel.send({ embeds: [embed] });
    });

    // Événement quand un message est envoyé
    client.on('messageCreate', (message) => {
        if (message.content === '!ping') {
            message.reply('Pong!');
        }
    });
};
