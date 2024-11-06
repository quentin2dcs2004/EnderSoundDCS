// Importation des modules nécessaires
const { Client, Intents } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

// Configuration du client Discord
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Définition du préfixe
const prefix = '!';

// Événement lorsque le bot est prêt
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

// Événement lorsqu'un message est reçu
client.on('messageCreate', async (message) => {
    // Ignore les messages des bots et ceux qui ne commencent pas par le préfixe
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Récupération des arguments et de la commande
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Chargement des commandes depuis le dossier
    const commandFiles = readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    // Vérification si la commande existe
    const commandFile = commandFiles.find(file => file === `${commandName}.js`);
    if (!commandFile) return;

    // Importation de la commande
    const command = require(`./commands/${commandFile}`);

    try {
        // Exécution de la commande
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Il y a eu une erreur lors de l\'exécution de cette commande.');
    }
});

// Connexion du bot à Discord avec le token
client.login('DISCORD_TOKEN');
