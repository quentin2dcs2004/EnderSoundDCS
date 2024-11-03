const { Client, GatewayIntentBits, Collection } = require('discord.js'); // Changement ici
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Utilisez GatewayIntentBits au lieu d'Intents.FLAGS
        GatewayIntentBits.GuildMessages
    ]
});

const prefix = '!'; // Définition du préfixe pour les commandes
const economy = new Collection(); // Collection pour stocker le solde des utilisateurs et leur inventaire
const shopItems = [
    { name: 'épée', price: 100 },
    { name: 'bouclier', price: 150 },
    { name: 'potion', price: 50 },
];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); // Log lorsque le bot est prêt
});

// Gestion des messages
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignore les messages qui ne commencent pas par le préfixe ou ceux des bots

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase(); // Récupération de la commande

    // Fonction pour obtenir ou initialiser le profil économique d'un utilisateur
    const getUserProfile = (user) => {
        if (!economy.has(user.id)) {
            economy.set(user.id, { balance: 0, inventory: [] }); // Initialisation du profil si inexistant
        }
        return economy.get(user.id);
    };

    // Commande !balance
    if (command === 'balance') {
        const profile = getUserProfile(message.author);
        return message.channel.send(`${message.author.username}, votre solde est de **${profile.balance}** pièces.`);
    }

    // Commande !daily
    else if (command === 'daily') {
        const profile = getUserProfile(message.author);
        profile.balance += 50; // Récompense quotidienne
        return message.channel.send(`${message.author.username}, vous avez collecté votre récompense quotidienne de **50 pièces** !`);
    }

    // Commande !pay
    else if (command === 'pay') {
        const target = message.mentions.users.first();
        const amount = parseInt(args[1]);

        if (!target || isNaN(amount) || amount <= 0) {
            return message.reply('Veuillez mentionner un utilisateur et spécifier un montant valide.');
        }

        const senderProfile = getUserProfile(message.author);
        const receiverProfile = getUserProfile(target);

        if (senderProfile.balance < amount) {
            return message.reply('Vous n\'avez pas assez de pièces pour cette transaction.');
        }

        senderProfile.balance -= amount;
        receiverProfile.balance += amount;

        return message.channel.send(`${message.author.username} a envoyé **${amount}** pièces à ${target.username}.`);
    }

    // Commande !shop
    else if (command === 'shop') {
        const shopList = shopItems.map(item => `${item.name} - ${item.price} pièces`).join('\n');
        return message.channel.send(`**Articles disponibles à l'achat :**\n${shopList}`);
    }

    // Commande !buy
    else if (command === 'buy') {
        const itemName = args.join(' ').toLowerCase();
        const item = shopItems.find(i => i.name === itemName);

        if (!item) return message.reply('Cet article n\'existe pas dans le magasin.');

        const profile = getUserProfile(message.author);
        if (profile.balance < item.price) {
            return message.reply('Vous n\'avez pas assez de pièces pour acheter cet article.');
        }

        profile.balance -= item.price;
        profile.inventory.push(item.name);
        return message.channel.send(`${message.author.username} a acheté **${item.name}** pour **${item.price}** pièces.`);
    }

    // Commande !inventory
    else if (command === 'inventory') {
        const profile = getUserProfile(message.author);
        const inventoryList = profile.inventory.length > 0 ? profile.inventory.join(', ') : 'Aucun article';
        return message.channel.send(`**Inventaire de ${message.author.username} :** ${inventoryList}`);
    }

    // Commande !work
    else if (command === 'work') {
        const earnings = Math.floor(Math.random() * 100) + 1; // Gain aléatoire entre 1 et 100
        const profile = getUserProfile(message.author);
        profile.balance += earnings;
        return message.channel.send(`${message.author.username}, vous avez travaillé et gagné **${earnings}** pièces !`);
    }
});

client.login(process.env.DISCORD_TOKEN); // Connexion du bot
