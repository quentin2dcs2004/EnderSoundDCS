const { Events } = require('discord.js');

module.exports = {
    data: {
        name: 'goodbye',
        description: 'Configurer un message d’au revoir.'
    },
    async execute(interaction) {
        const message = interaction.options.getString('message');
        
        // Sauvegarder le message d’au revoir dans une base de données ou un fichier
        // Exemples : 
        // db.set(`goodbyeMessage_${interaction.guild.id}`, message);
        
        return interaction.reply(`Message d’au revoir configuré : "${message}"`);
    },
};
