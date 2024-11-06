const { SlashCommandBuilder } = require('discord.js');

const shopItems = [
    { name: 'épée', price: 100 },
    { name: 'bouclier', price: 150 },
    { name: 'potion', price: 50 },
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Acheter un article du magasin.')
        .addStringOption(option => option.setName('objet').setDescription('L\'article à acheter').setRequired(true)),
    async execute(interaction) {
        const itemName = interaction.options.getString('objet').toLowerCase();
        const item = shopItems.find(i => i.name === itemName);

        if (!item) return await interaction.reply('Cet article n\'existe pas dans le magasin.');

        const profile = getUserProfile(interaction.user);
        if (profile.balance < item.price) {
            return await interaction.reply('Vous n\'avez pas assez de pièces pour acheter cet article.');
        }

        profile.balance -= item.price;
        profile.inventory.push(item.name);
        await interaction.reply(`${interaction.user.username} a acheté **${item.name}** pour **${item.price}** pièces.`);
    },
};
