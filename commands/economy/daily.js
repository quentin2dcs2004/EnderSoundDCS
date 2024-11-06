const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Collecter votre récompense quotidienne.'),
    async execute(interaction) {
        const profile = getUserProfile(interaction.user);
        profile.balance += 50; // Récompense quotidienne
        await interaction.reply(`${interaction.user.username}, vous avez collecté votre récompense quotidienne de **50 pièces** !`);
    },
};
