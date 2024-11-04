const { Client, GatewayIntentBits, Collection } = require('discord.js'); // Changer Intents par GatewayIntentBits
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Utilisez GatewayIntentBits au lieu d'Intents.FLAGS
        GatewayIntentBits.GuildMessages,
    ],
});

const prefix = '!';
const economy = new Collection(); // Collection pour stocker le solde des utilisateurs

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Événement lorsque le bot reçoit un message
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Fonction pour obtenir ou initialiser le profil économique d'un utilisateur
    const getUserProfile = (user) => {
        if (!economy.has(user.id)) {
            economy.set(user.id, { balance: 100 }); // Initialisation avec 100 pièces pour tester
        }
        return economy.get(user.id);
    };

    // Commande !balance (pour vérifier le solde)
    if (command === 'balance') {
        const profile = getUserProfile(message.author);
        return message.channel.send(`${message.author.username}, votre solde est de **${profile.balance}** pièces.`);
    }

    // Commande !bet <montant> <jeu> (parier de l'argent sur un lancer de dés)
    else if (command === 'bet') {
        const amount = parseInt(args[0]);
        const profile = getUserProfile(message.author);

        // Vérifier si le montant est valide
        if (isNaN(amount) || amount <= 0) {
            return message.channel.send('Veuillez entrer un montant valide pour parier.');
        }

        // Vérifier si l'utilisateur a assez de fonds
        if (profile.balance < amount) {
            return message.channel.send("Vous n'avez pas assez de pièces pour faire ce pari.");
        }

        // Lancer un dé (1 à 6)
        const diceRoll = Math.floor(Math.random() * 6) + 1;

        // Si le résultat est 4, 5 ou 6, l'utilisateur gagne le double de son pari ; sinon, il perd son pari
        if (diceRoll >= 4) {
            profile.balance += amount; // Gagnez le montant misé
            message.channel.send(`🎲 Vous avez lancé un **${diceRoll}** ! Vous gagnez **${amount}** pièces ! Votre solde est maintenant de **${profile.balance}** pièces.`);
        } else {
            profile.balance -= amount; // Perdez le montant misé
            message.channel.send(`🎲 Vous avez lancé un **${diceRoll}**. Vous perdez **${amount}** pièces. Votre solde est maintenant de **${profile.balance}** pièces.`);
        }
    }
});



