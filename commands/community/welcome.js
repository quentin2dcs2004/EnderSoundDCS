const { Events } = require('discord.js');

module.exports = {
    data: {
        name: 'welcome',
        description: 'Configurer un message de bienvenue.'
    },
    async execute(interaction) {
        const message = interaction.options.getString('message');
        
        // Sauvegarder le message de bienvenue dans une base de données ou un fichier
        // Exemples : 
        // db.set(`welcomeMessage_${interaction.guild.id}`, message);
        
        return interaction.reply(`Message de bienvenue configuré : "${message}"`);
    },
};
