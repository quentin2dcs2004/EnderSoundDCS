const fetch = require('node-fetch');

module.exports = {
    name: 'quote',
    description: 'Afficher une citation inspirante ou drôle.',
    async execute(message) {
        const response = await fetch('https://api.quotable.io/random');
        const quote = await response.json();
        message.channel.send(`"${quote.content}" - ${quote.author}`);
    },
};
