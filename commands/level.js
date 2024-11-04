const { Client, GatewayIntentBits, Collection } = require('discord.js'); 
const client = new Client({ 
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Assurez-vous d'ajouter cet intent si nécessaire
    ] 
});

const prefix = '!'; // Préfixe des commandes
const levels = new Collection(); // Collection pour stocker les niveaux des utilisateurs

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Fonction pour obtenir ou créer le profil d'un utilisateur
const getUserLevel = (user) => {
    if (!levels.has(user.id)) {
        levels.set(user.id, { xp: 0, level: 1, balance: 100 });
    }
    return levels.get(user.id);
};

// Écoute des messages
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Commande !rank
    if (command === 'rank') {
        const profile = getUserLevel(message.author);
        return message.channel.send(`${message.author.username}, vous êtes au niveau **${profile.level}** avec **${profile.xp}** points d'expérience.`);
    } 
    // Commande !leaderboard
    else if (command === 'leaderboard') {
        if (args[0] === 'niv') {
            const leaderboard = Array.from(levels.entries())
                .sort((a, b) => b[1].xp - a[1].xp) // Tri par XP décroissant
                .slice(0, 10) // Prendre les 10 premiers
                .map(([id, data], index) => `${index + 1}. <@${id}> - Niveau ${data.level} (${data.xp} XP)`)
                .join('\n');
            return message.channel.send(`**Classement des niveaux :**\n${leaderboard}`);
        }
    } 
    // Commande !profile
    else if (command === 'profile') {
        const profile = getUserLevel(message.author);
        return message.channel.send(`**Profil de ${message.author.username}**\nNiveau: ${profile.level}\nXP: ${profile.xp}\nSolde: ${profile.balance} pièces`);
    } 
    // Commande !levelup
    else if (command === 'levelup') {
        const profile = getUserLevel(message.author);
        const xpRequired = profile.level * 100; 
        if (profile.xp >= xpRequired) {
            profile.xp -= xpRequired; // Réduction de l'XP en fonction du niveau
            profile.level += 1; // Augmentation du niveau
            return message.channel.send(`🎉 Félicitations, ${message.author.username} ! Vous avez atteint le niveau **${profile.level}** !`);
        } else {
            return message.channel.send(`Vous avez besoin de **${xpRequired - profile.xp}** XP supplémentaire pour monter au niveau suivant.`);
        }
    }

    // Augmentez l'XP à chaque message
    const profile = getUserLevel(message.author);
    profile.xp += 10; // Augmentez l'XP à chaque message
});



