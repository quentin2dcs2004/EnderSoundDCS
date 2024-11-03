const { Client, GatewayIntentBits } = require('discord.js'); // Remplacez Intents par GatewayIntentBits
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Utilisez GatewayIntentBits à la place
        GatewayIntentBits.GuildMessages
    ]
});

const prefix = '!'; // Préfixe des commandes
const leaderboard = new Map(); // Pour stocker les scores des joueurs

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Commande de jeux
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Commande !roll
    if (command === 'roll') {
        const numSides = parseInt(args[0]);
        if (isNaN(numSides) || numSides <= 0) return message.reply('Veuillez entrer un nombre valide de faces pour le dé.');
        const result = Math.floor(Math.random() * numSides) + 1;
        return message.channel.send(`Vous avez lancé un dé à ${numSides} faces et obtenu : **${result}**`);
    }

    // Commande !coinflip
    else if (command === 'coinflip') {
        const flipResult = Math.random() < 0.5 ? 'Pile' : 'Face';
        return message.channel.send(`Le résultat du lancer de pièce est : **${flipResult}**`);
    }

    // Commande !rps
    else if (command === 'rps') {
        const choices = ['pierre', 'feuille', 'ciseaux'];
        const userChoice = args[0].toLowerCase();
        if (!choices.includes(userChoice)) return message.reply('Veuillez choisir entre pierre, feuille, ou ciseaux.');
        
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result;
        
        if (userChoice === botChoice) {
            result = 'Égalité !';
        } else if (
            (userChoice === 'pierre' && botChoice === 'ciseaux') ||
            (userChoice === 'feuille' && botChoice === 'pierre') ||
            (userChoice === 'ciseaux' && botChoice === 'feuille')
        ) {
            result = 'Vous avez gagné !';
        } else {
            result = 'Vous avez perdu !';
        }

        return message.channel.send(`Vous avez choisi : **${userChoice}**\nLe bot a choisi : **${botChoice}**\n${result}`);
    }

    // Commande !trivia
    else if (command === 'trivia') {
        const questions = [
            { question: "Quel est le plus grand océan du monde?", answer: "Pacifique" },
            { question: "Qui a écrit 'Les Misérables'?", answer: "Victor Hugo" },
            { question: "Quelle est la capitale de l'Australie?", answer: "Canberra" },
            { question: "Quel est l'élément chimique dont le symbole est O?", answer: "Oxygène" },
        ];
        
        const trivia = questions[Math.floor(Math.random() * questions.length)];
        message.channel.send(trivia.question);

        // Enregistrement de la réponse (pour simplifier, on attend une réponse immédiate)
        const filter = response => response.content.toLowerCase() === trivia.answer.toLowerCase() && response.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({ filter, time: 15000 });

        collector.on('collect', () => {
            message.channel.send(`Correct ! Bien joué, ${message.author.username} !`);
            collector.stop();
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.channel.send(`Temps écoulé ! La bonne réponse était : **${trivia.answer}**`);
            }
        });
    }

    // Commande !leaderboard
    else if (command === 'leaderboard') {
        const leaderboardArray = Array.from(leaderboard.entries()).sort((a, b) => b[1] - a[1]);
        const leaderboardMessage = leaderboardArray.length > 0 
            ? leaderboardArray.map(([user, score]) => `<@${user}> : ${score}`).join('\n') 
            : 'Il n\'y a pas encore de joueurs.';
        return message.channel.send(`**Classement des jeux :**\n${leaderboardMessage}`);
    }
});

client.login(process.env.DISCORD_TOKEN);
