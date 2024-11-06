const { Message } = require('discord.js');

module.exports = {
    name: 'coinflip',
    description: 'Lancer une pièce (pile ou face).',
    execute(message) {
        const flipResult = Math.random() < 0.5 ? 'Pile' : 'Face';
        return message.channel.send(`Le résultat du lancer de pièce est : **${flipResult}**`);
    },
};
