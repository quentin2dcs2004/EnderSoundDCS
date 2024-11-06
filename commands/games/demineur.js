const { Message } = require('discord.js');

module.exports = {
    name: 'demineur',
    description: 'Jouer au démineur.',
    execute(message, args) {
        const board = [
            ['💣', '0', '0'],
            ['0', '💣', '1'],
            ['0', '1', '2'],
        ];
        message.channel.send(`Voici votre grille de démineur : \n${board.map(row => row.join(' | ')).join('\n')}`);
        // Ajouter la logique pour jouer et détecter les mines
    },
};
