module.exports = {
    name: 'sell',
    description: 'Vendre un objet de son inventaire.',
    execute(message, args, economy) {
        const itemName = args.join(' ').toLowerCase();
        const profile = getUserProfile(message.author, economy);

        if (!profile.inventory.includes(itemName)) {
            return message.reply('Vous ne possédez pas cet objet.');
        }

        const item = shopItems.find(i => i.name === itemName);
        if (!item) return message.reply('Cet objet ne peut pas être vendu.');

        profile.inventory = profile.inventory.filter(item => item !== itemName);
        profile.balance += item.price;
        message.channel.send(`${message.author.username} a vendu **${itemName}** pour **${item.price}** pièces.`);
    }
};
