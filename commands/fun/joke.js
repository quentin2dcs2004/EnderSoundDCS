const fetch = require('node-fetch');

module.exports = {
    name: 'joke',
    description: 'Raconter une blague.',
    async execute(message) {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
        const joke = await response.json();
        message.channel.send(`${joke.setup} - ${joke.punchline}`);
    },
};
