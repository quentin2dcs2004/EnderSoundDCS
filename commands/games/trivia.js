const { Message } = require('discord.js');

const questions = [
    { question: "Quel est le plus grand océan du monde ?", answer: "Pacifique" },
    { question: "Qui a écrit 'Les Misérables' ?", answer: "Victor Hugo" },
    { question: "Quelle est la capitale de l'Australie ?", answer: "Canberra" },
    { question: "Quel est l'élément chimique dont le symbole est O ?", answer: "Oxygène" },
];

module.exports = {
    name: 'trivia',
    description: 'Question de quiz.',
    execute(message) {
        const trivia = questions[Math.floor(Math.random() * questions.length)];
        message.channel.send(trivia.question);

        const filter = response => response.content.toLowerCase() === trivia.answer.toLowerCase() && response.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({ filter, time: 15000 });

        collector.on('collect', () => {
            message.channel.send(`Correct ! Bien joué, ${message.author.username} !`);
            collector.stop();
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.channel.send(`Temps écoulé ! La bonne réponse était : **${trivia.answer}**`);
            }
        });
    },
};
