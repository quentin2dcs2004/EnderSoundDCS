const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Afficher la liste des commandes disponibles.'),
    async execute(interaction) {
        const commandsList = `
        **Commandes Utilitaires :**
        - \`/help\`: Afficher la liste des commandes disponibles.
        - \`/ping\`: Vérifier la latence du bot.
        - \`/userinfo <utilisateur>\`: Afficher des informations sur un utilisateur.
        - \`/serverinfo\`: Afficher des informations sur le serveur.
        - \`/avatar <utilisateur>\`: Afficher l’avatar d’un utilisateur.
        - \`/poll <question>\`: Créer un sondage.
        - \`/remind <temps> <message>\`: Créer un rappel.`;
        
        return interaction.reply(commandsList);
    },
};
