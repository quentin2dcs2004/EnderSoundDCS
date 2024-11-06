const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Créer un sondage.')
        .addStringOption(option => 
            option.setName('question')
                  .setDescription('La question du sondage')
                  .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const pollMessage = await interaction.reply(`**Sondage:** ${question}\nRépondez avec 👍 pour Oui ou 👎 pour Non !`);
        
        await pollMessage.react('👍');
        await pollMessage.react('👎');
    },
};
