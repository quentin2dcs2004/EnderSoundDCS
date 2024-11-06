require('dotenv').config(); // Charger les variables d'environnement
const { Client, Intents } = require('discord.js');
const { commandHandler } = require('./handlers/commandHandler');
const { eventHandler } = require('./handlers/eventHandler');
const { databaseHandler } = require('./handlers/databaseHandler');

// Initialiser le client Discord
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});

// Gérer la connexion aux événements
eventHandler(client);


