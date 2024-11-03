// fun.js

const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'fun',
    description: 'Commands for fun and entertainment',
    commands: ['meme', 'joke', '8ball', 'cat', 'dog'],

    // Commande !meme - Affiche un mème aléatoire
    async meme(message) {
        const response = await fetch('https://meme-api.com/memes/random');
        const data = await response.json();
        if (data && data.url) {
            const embed = new MessageEmbed()
                .setTitle(data.title || 'Meme')
                .setImage(data.url)
                .setFooter('Voici un mème pour toi!');
            message.channel.send({ embeds: [embed] });
        } else {
            message.reply("Je n'ai pas pu trouver de mème, réessaye plus tard.");
        }
    },

    // Commande !joke - Raconte une blague
    async joke(message) {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
        const data = await response.json();
        if (data && data.setup && data.punchline) {
            message.channel.send(`${data.setup}\n\n${data.punchline}`);
        } else {
            message.reply("Je n'ai pas trouvé de blague, réessaie plus tard.");
        }
    },

    // Commande !8ball <question> - Répond à une question par oui ou non
    eightBall(message, args) {
        const responses = [
            "Oui", "Non", "Peut-être", "Probablement", "Je ne pense pas",
            "Certainement", "Demande encore", "Absolument", "Je doute"
        ];
        const question = args.join(" ");
        if (!question) {
            return message.reply("Pose une question pour que je puisse répondre !");
        }
        const response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(`🎱 ${response}`);
    },

    // Commande !cat - Affiche une image de chat aléatoire
    async cat(message) {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        if (data && data[0] && data[0].url) {
            const embed = new MessageEmbed()
                .setTitle("Voici un chat 🐱")
                .setImage(data[0].url);
            message.channel.send({ embeds: [embed] });
        } else {
            message.reply("Je n'ai pas trouvé d'image de chat, réessaie plus tard.");
        }
    },

    // Commande !dog - Affiche une image de chien aléatoire
    async dog(message) {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        if (data && data.message) {
            const embed = new MessageEmbed()
                .setTitle("Voici un chien 🐶")
                .setImage(data.message);
            message.channel.send({ embeds: [embed] });
        } else {
            message.reply("Je n'ai pas trouvé d'image de chien, réessaie plus tard.");
        }
    }
};
