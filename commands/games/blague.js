const { Message } = require('discord.js');

module.exports = {
    name: 'blague',
    description: 'Obtenir une blague.',
    execute(message, args) {
        const jokes = {
            'toutpublic': [
                'Pourquoi les plongeurs plongent toujours en arrière et jamais en avant ? Parce que sinon ils tombent toujours dans le bateau.',
            ],
            'humournoir': [
                'Je connais une blague sur un squelette, mais elle n’a pas de corps...',
            ],
            'developpeur': [
                'Pourquoi les développeurs détestent-ils la nature ? Parce qu’il y a trop de bugs.',
            ],
            '18+': [
                'C’est un peu chaud...',
            ],
            'beauf': [
                'Pourquoi les plongeurs plongent toujours en arrière et jamais en avant ? Parce que sinon ils tombent toujours dans le bateau.',
            ],
            'blondes': [
                'Pourquoi les blondes ne font-elles jamais de puzzle ? Parce qu’elles n’arrivent jamais à compléter le coin.',
            ],
        };

        const category = args[0]?.toLowerCase() || 'toutpublic';
        const selectedJokes = jokes[category] || jokes['toutpublic'];
        const joke = selectedJokes[Math.floor(Math.random() * selectedJokes.length)];
        
        message.channel.send(joke);
    },
};
