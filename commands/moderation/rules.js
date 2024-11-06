const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Créer le règlement avec un bouton d\'acceptation'),

    async execute(interaction) {
        const acceptButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('accept_rules')
                    .setLabel('Accepter le règlement')
                    .setStyle('PRIMARY')
            );

        await interaction.reply({
            content: "Veuillez accepter le règlement en appuyant sur le bouton ci-dessous.",
            components: [acceptButton]
        });

        const filter = i => i.customId === 'accept_rules' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'accept_rules') {
                await i.member.roles.add('ROLE_ID');  // Remplacer 'ROLE_ID' par l'ID du rôle
                await i.reply("Vous avez accepté le règlement.");
            }
        });
    }
};
