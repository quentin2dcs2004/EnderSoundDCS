const responses = [
    'Oui.',
    'Non.',
    'Peut-être.',
    'Je ne sais pas.',
    'C’est certain.',
    'Sans aucun doute.',
    'Oui, absolument.',
    'Je ne pense pas.',
];

module.exports = {
    name: '8ball',
    description: 'Répondre à une question par oui ou non.',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send('Vous devez poser une question !');
        }
        const response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    },
};
