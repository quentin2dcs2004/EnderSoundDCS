const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Créer un rappel.')
        .addStringOption(option => 
            option.setName('temps')
                  .setDescription('Durée avant le rappel (ex: 10s, 1m, 1h)')
                  .setRequired(true))
        .addStringOption(option => 
            option.setName('message')
                  .setDescription('Message du rappel')
                  .setRequired(true)),
    async execute(interaction) {
        const time = interaction.options.getString('temps');
        const message = interaction.options.getString('message');
        
        setTimeout(() => {
            interaction.followUp(`${interaction.user}, voici votre rappel: **${message}**`);
        }, ms(time)); // Assurez-vous d'utiliser une fonction ms pour convertir le temps
        
        return interaction.reply(`Rappel créé pour **${time}**. Je vous rappellerai: **${message}**.`);
    },
};
