const { SlashCommandBuilder } = require('discord.js');
const { getUserProfile } = require('../economy/getUserProfile'); // Assurez-vous que cette fonction est accessible

module.exports = {
    data: new SlashCommandBuilder()
        .setName('levelup')
        .setDescription('Dépenser des points pour améliorer votre grade.'),
    async execute(interaction) {
        const profile = getUserProfile(interaction.user);
        
        if (profile.experience >= profile.level * 100) { // Supposons que chaque niveau coûte 100 XP
            profile.level += 1;
            profile.experience -= profile.level * 100; // Mettre à jour l'expérience après le level up
            return interaction.reply(`${interaction.user.username}, vous êtes monté au niveau **${profile.level}** !`);
        } else {
            return interaction.reply(`Vous avez besoin de **${profile.level * 100 - profile.experience}** XP pour monter de niveau.`);
        }
    },
};
