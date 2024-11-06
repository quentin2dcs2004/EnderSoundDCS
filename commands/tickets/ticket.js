const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'ticket',
        description: 'Ouvrir un ticket de support.'
    },
    async execute(interaction) {
        const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        });

        const embed = new EmbedBuilder()
            .setTitle('Ticket Ouvert')
            .setDescription(`Bonjour ${interaction.user.username}, ce ticket a été ouvert pour vous aider. Un membre du personnel va vous répondre bientôt.`)
            .setColor('BLUE');

        channel.send({ embeds: [embed] });
        return interaction.reply(`Votre ticket a été ouvert : ${channel}.`);
    },
};
