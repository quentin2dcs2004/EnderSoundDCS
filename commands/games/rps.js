const { Message } = require('discord.js');

module.exports = {
    name: 'rps',
    description: 'Pierre, feuille, ciseaux (jeu contre le bot).',
    execute(message, args) {
        const choices = ['pierre', 'feuille', 'ciseaux'];
        const userChoice = args[0].toLowerCase();
        if (!choices.includes(userChoice)) return message.reply('Veuillez choisir entre pierre, feuille, ou ciseaux.');
        
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result;

        if (userChoice === botChoice) {
            result = 'Égalité !';
        } else if (
            (userChoice === 'pierre' && botChoice === 'ciseaux') ||
            (userChoice === 'feuille' && botChoice === 'pierre') ||
            (userChoice === 'ciseaux' && botChoice === 'feuille')
        ) {
            result = 'Vous avez gagné !';
        } else {
            result = 'Vous avez perdu !';
        }

        return message.channel.send(`Vous avez choisi : **${userChoice}**\nLe bot a choisi : **${botChoice}**\n${result}`);
    },
};
