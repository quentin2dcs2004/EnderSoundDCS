const { SlashCommandBuilder } = require('discord.js');
const { getLeaderboard } = require('../economy/getLeaderboard'); // Créez cette fonction pour obtenir le classement

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Voir le classement des niveaux du serveur.'),
    async execute(interaction) {
        const leaderboard = await getLeaderboard();
        return interaction.reply(`**Classement des niveaux :**\n${leaderboard}`);
    },
};
