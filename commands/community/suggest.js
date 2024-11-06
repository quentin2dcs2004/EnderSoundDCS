const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'suggest',
        description: 'Soumettre une suggestion pour le serveur.'
    },
    async execute(interaction) {
        const suggestion = interaction.options.getString('suggestion');
        const suggestionChannel = interaction.guild.channels.cache.find(channel => channel.name === 'suggestions');

        if (!suggestionChannel) {
            return interaction.reply('Le canal de suggestions n\'a pas été trouvé. Veuillez créer un canal nommé "suggestions".');
        }

        const embed = new MessageEmbed()
            .setTitle('Nouvelle Suggestion')
            .setDescription(suggestion)
            .setFooter(`Proposée par ${interaction.user.tag}`)
            .setColor('GREEN');

        await suggestionChannel.send({ embeds: [embed] });
        return interaction.reply('Votre suggestion a été soumise avec succès !');
    },
};
