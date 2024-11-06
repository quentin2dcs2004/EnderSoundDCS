const { readdirSync } = require('fs');
const { Client, Message } = require('discord.js');

module.exports.commandHandler = (client) => {
    const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    });

    client.on('messageCreate', (message) => {
        if (message.author.bot) return;

        const prefix = '!';
        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/\s+/);
            const commandName = args.shift().toLowerCase();

            const command = client.commands.get(commandName);
            if (!command) return;

            try {
                command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('Il y a eu un problème lors de l\'exécution de cette commande.');
            }
        }
    });
};
