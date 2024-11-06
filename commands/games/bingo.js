const { Message } = require('discord.js');

module.exports = {
    name: 'bingo',
    description: 'Jouer au jeu de Bingo.',
    execute(message) {
        const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
        const drawnNumber = numbers[Math.floor(Math.random() * numbers.length)];
        return message.channel.send(`Le numéro tiré est : **${drawnNumber}**`);
    },
};
