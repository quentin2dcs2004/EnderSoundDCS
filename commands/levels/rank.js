const { SlashCommandBuilder } = require('discord.js');
const { getUserProfile } = require('../economy/getUserProfile'); // Assurez-vous que cette fonction est accessible

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Afficher votre niveau et points d\'expérience.'),
    async execute(interaction) {
        const profile = getUserProfile(interaction.user);
        return interaction.reply(`${interaction.user.username}, votre niveau est **${profile.level}** avec **${profile.experience}** XP.`);
    },
};
