const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Afficher votre niveau et points d\'expérience.'),
    async execute(interaction) {
        const profile = getUserProfile(interaction.user);
        await interaction.reply(`${interaction.user.username}, vous êtes au niveau **${profile.level}** avec **${profile.experience}** XP.`);
    },
};
