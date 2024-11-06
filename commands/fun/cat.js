const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'Afficher une image de chat aléatoire.',
    async execute(message) {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        message.channel.send(data[0].url);
    },
};
