const { SlashCommandBuilder } = require('discord.js');
const { getUserProfile } = require('../economy/getUserProfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Montre les statistiques et informations générales du joueur.'),
    async execute(interaction) {
        const profile = getUserProfile(interaction.user);
        return interaction.reply(`${interaction.user.username} - Niveau: **${profile.level}**, XP: **${profile.experience}**, Argent: **${profile.balance}**`);
    },
};
