const fetch = require('node-fetch');

module.exports = {
    name: 'gif',
    description: 'Afficher un GIF aléatoire correspondant au mot-clé.',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('Vous devez fournir un mot-clé !');
        }
        const keyword = args.join(' ');
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=YOUR_GIPHY_API_KEY&q=${keyword}&limit=1`);
        const data = await response.json();
        if (data.data.length > 0) {
            message.channel.send(data.data[0].url);
        } else {
            message.channel.send('Aucun GIF trouvé.');
        }
    },
};
