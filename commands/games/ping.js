const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Vérifier la latence du bot.'),
    async execute(interaction) {
        const ping = interaction.client.ws.ping; // Latence WebSocket
        return interaction.reply(`🏓 Pong! Latence: **${ping}ms**`);
    },
};
