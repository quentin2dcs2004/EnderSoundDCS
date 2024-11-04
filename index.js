// 1. Charger les variables d'environnement à partir du fichier .env
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// 2. Vérifier la présence du token
const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('Erreur : Le token du bot n\'est pas défini. Veuillez vérifier votre fichier .env.');
    process.exit(1); // Quitte le processus si le token est manquant
}

// 3. Créer une instance du client Discord avec les intentions appropriées
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.commands = new Map();

// 4. Charger les commandes
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// 5. Gérer l'événement "ready" pour confirmer la connexion
client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// 6. Gérer l'événement "messageCreate" pour les commandes
client.on('messageCreate', message => {
    // Ignore les messages qui ne commencent pas par '!' ou qui sont envoyés par des bots
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (command) {
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
            message.reply('Il y a eu une erreur en exécutant cette commande.');
        }
    } else {
        console.log(`Commande non trouvée : ${commandName}`);
    }
});

// 7. Connecter le bot à Discord
client.login(token).catch(err => {
    console.error('Erreur de connexion :', err.message);
});

// 8. Gérer la déconnexion proprement
process.on('SIGINT', () => {
    console.log('Déconnexion propre du bot...');
    client.destroy(); // Ferme la connexion du bot
    process.exit();
});
