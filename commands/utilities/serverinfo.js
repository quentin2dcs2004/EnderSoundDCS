const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Afficher des informations sur le serveur.'),
    async execute(interaction) {
        const server = interaction.guild;
        return interaction.reply(`**Nom du serveur:** ${server.name}\n**ID:** ${server.id}\n**Membres:** ${server.memberCount}\n**Créé le:** ${server.createdAt}`);
    },
};
