const facts = [
    "Les chats ont 32 muscles dans chaque oreille.",
    "Les escargots peuvent dormir jusqu'à 3 ans.",
    "Les étoiles de mer n'ont pas de cerveau.",
    "Un crocodile ne peut pas tirer sa langue.",
];

module.exports = {
    name: 'facts',
    description: 'Afficher un fait amusant ou intéressant.',
    execute(message) {
        const fact = facts[Math.floor(Math.random() * facts.length)];
        message.channel.send(fact);
    },
};
