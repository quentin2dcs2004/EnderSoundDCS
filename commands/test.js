// commands/test.js
module.exports = {
    name: 'test',
    description: 'Une commande de test.',
    execute(message, args) {
        // Vérification que la commande est exécutée dans un canal textuel
        if (message.channel.type === 'GUILD_TEXT') {
            message.channel.send('Commande de test exécutée !');
        } else {
            message.reply('Cette commande ne peut être utilisée que dans un canal textuel.');
        }
    },
};
