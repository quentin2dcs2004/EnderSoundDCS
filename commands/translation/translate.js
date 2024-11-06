const { SlashCommandBuilder } = require('discord.js');
const { translate } = require('@vitalets/google-translate-api'); // Assurez-vous d'installer cette bibliothèque

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Traduire du texte dans une langue cible.')
        .addStringOption(option => 
            option.setName('langue')
                  .setDescription('Langue cible (ex: fr, en, es)')
                  .setRequired(true))
        .addStringOption(option => 
            option.setName('texte')
                  .setDescription('Texte à traduire')
                  .setRequired(true)),
    async execute(interaction) {
        const targetLanguage = interaction.options.getString('langue');
        const textToTranslate = interaction.options.getString('texte');

        try {
            const translation = await translate(textToTranslate, { to: targetLanguage });
            return interaction.reply(`**Traduction en ${targetLanguage}:** ${translation.text}`);
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de la traduction. Veuillez vérifier la langue et réessayer.');
        }
    },
};
