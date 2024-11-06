const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Voir votre solde.'),
    async execute(interaction) {
        const profile = getUserProfile(interaction.user);
        await interaction.reply(`${interaction.user.username}, votre solde est de **${profile.balance}** pièces.`);
    },
};
