const { SlashCommandBuilder } = require('discord.js');

const shopItems = [
    { name: 'épée', price: 100 },
    { name: 'bouclier', price: 150 },
    { name: 'potion', price: 50 },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Afficher les articles en vente.'),
    async execute(interaction) {
        const shopList = shopItems.map(item => `${item.name} - ${item.price} pièces`).join('\n');
        await interaction.reply(`**Articles disponibles à l'achat :**\n${shopList}`);
    },
};
