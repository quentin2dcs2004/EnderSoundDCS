const { Message } = require('discord.js');

module.exports = {
    name: 'pendu',
    description: 'Jouer au jeu du pendu.',
    execute(message, args) {
        const words = ['javascript', 'discord', 'bot', 'nodejs'];
        const chosenWord = words[Math.floor(Math.random() * words.length)];
        let guesses = Array(chosenWord.length).fill('_');
        let attempts = 6;

        message.channel.send(`Le mot à deviner est : ${guesses.join(' ')}`);
        // Ajouter la logique de gestion des tentatives et des lettres devinées ici
    },
};
