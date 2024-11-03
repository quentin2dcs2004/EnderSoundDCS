// commands/test.js
module.exports = {
    name: 'test',
    description: 'Une commande de test.',
    execute(message, args) {
        message.channel.send('Commande de test exécutée !');
    },
};