const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    description: 'Afficher une image de chien aléatoire.',
    async execute(message) {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        message.channel.send(data.message);
    },
};
