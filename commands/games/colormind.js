const { Message } = require('discord.js');

module.exports = {
    name: 'colormind',
    description: 'Jeu de ColorMind où vous devez deviner la combinaison de couleurs.',
    execute(message, args) {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33'];
        const chosenColors = colors.sort(() => Math.random() - 0.5).slice(0, 3);
        message.channel.send(`Devinez la combinaison de couleurs : ${chosenColors.join(' | ')}`);
        // Ajoutez la logique pour tester les réponses
    },
};
