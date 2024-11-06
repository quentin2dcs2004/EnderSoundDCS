const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    description: 'Afficher un mème aléatoire.',
    async execute(message) {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        const memes = data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        message.channel.send(randomMeme.url);
    },
};
