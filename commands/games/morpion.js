const { Message } = require('discord.js');

module.exports = {
    name: 'morpion',
    description: 'Jouer au jeu de morpion (tic-tac-toe).',
    execute(message, args) {
        const board = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];
        // Exemple de logique d'affichage du plateau
        message.channel.send(`Plateau actuel : \n${board.map(row => row.join(' | ')).join('\n---+---+---\n')}`);
    },
};
