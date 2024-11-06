const fortunes = [
    "Vous aurez bientôt une belle surprise.",
    "Faites attention aux petites choses.",
    "Une opportunité se présentera bientôt.",
    "La chance sourit aux audacieux.",
];

module.exports = {
    name: 'fortune',
    description: 'Donner une prédiction aléatoire.',
    execute(message) {
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        message.channel.send(fortune);
    },
};
