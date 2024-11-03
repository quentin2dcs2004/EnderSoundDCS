// 1. Charger les variables d'environnement à partir du fichier .env
require('dotenv').config();

// 2. Importer les modules nécessaires de discord.js
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// 3. Créer une instance du client Discord avec les intentions appropriées
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.commands = new Map();

// Charger les commandes
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Événements
client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {
    // Ignore les messages qui ne commencent pas par '!' ou qui sont envoyés par des bots
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (command) {
        command.execute(message, args);
    } else {
        console.log(`Commande non trouvée : ${commandName}`); // Ajout d'un log pour les commandes non trouvées
    }
});

// 4. Connecter le bot à Discord
const token = process.env.DISCORD_TOKEN;

if (!token) {
    console.error('Erreur : Le token du bot n\'est pas défini. Veuillez vérifier votre fichier .env.');
    process.exit(1); // Quitter le processus si le token est manquant
}

// Utiliser le token correctement
client.login(token).catch(err => {
    console.error('Erreur de connexion :', err.message);
});
process.on('SIGINT', () => {
    console.log('Déconnexion propre du bot...');
    client.destroy(); // Ferme la connexion du bot
    process.exit();
});
console.log('Bot prêt à se connecter');
client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});
