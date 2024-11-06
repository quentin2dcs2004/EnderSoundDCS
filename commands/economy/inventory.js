module.exports = {
    name: 'inventory',
    description: 'Voir vos articles achetés.',
    execute(message, args, economy) {
        const profile = getUserProfile(message.author, economy);
        const inventoryList = profile.inventory.length > 0 ? profile.inventory.join(', ') : 'Aucun article';
        message.channel.send(`**Inventaire de ${message.author.username} :** ${inventoryList}`);
    }
};
