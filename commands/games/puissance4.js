const { Message } = require('discord.js');

module.exports = {
    name: 'puissance4',
    description: 'Jouer au jeu de Puissance 4.',
    execute(message, args) {
        const grid = Array(6).fill().map(() => Array(7).fill('⚪'));  // Grille vide
        message.channel.send(`Grille de Puissance 4 : \n${grid.map(row => row.join(' | ')).join('\n')}`);
        // Ajoutez la logique de jeu ici (placer les pions, vérifier les gagnants)
    },
};
