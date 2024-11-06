const { Message } = require('discord.js');

module.exports = {
    name: 'roll',
    description: 'Lancer un dé avec un nombre de faces spécifique.',
    execute(message, args) {
        const numSides = parseInt(args[0]);
        if (isNaN(numSides) || numSides <= 0) return message.reply('Veuillez entrer un nombre valide de faces pour le dé.');
        const result = Math.floor(Math.random() * numSides) + 1;
        return message.channel.send(`Vous avez lancé un dé à ${numSides} faces et obtenu : **${result}**`);
    },
};
