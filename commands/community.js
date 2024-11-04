const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'community',
    description: 'Community commands for welcome messages, goodbyes, and suggestions',
    commands: ['welcome', 'goodbye', 'suggest'],

    // Exécution des commandes de la communauté
    execute(message, args) {
        if (!message.content.startsWith('!')) return; // Vérifie que la commande commence par le préfixe
        
        const command = message.content.slice(1).trim().split(/ +/).shift().toLowerCase(); // Extrait le nom de la commande

        if (command === 'welcome') {
            const welcomeMessage = args.join(" ");
            if (!welcomeMessage) {
                return message.reply("Veuillez spécifier un message de bienvenue !");
            }
            db.set(`welcome_${message.guild.id}`, welcomeMessage);
            message.channel.send(`Le message de bienvenue a été configuré : "${welcomeMessage}"`);
        }

        else if (command === 'goodbye') {
            const goodbyeMessage = args.join(" ");
            if (!goodbyeMessage) {
                return message.reply("Veuillez spécifier un message d'au revoir !");
            }
            db.set(`goodbye_${message.guild.id}`, goodbyeMessage);
            message.channel.send(`Le message d'au revoir a été configuré : "${goodbyeMessage}"`);
        }

        else if (command === 'suggest') {
            const suggestion = args.join(" ");
            if (!suggestion) {
                return message.reply("Veuillez spécifier une suggestion !");
            }
            const embed = new MessageEmbed()
                .setTitle("Nouvelle suggestion")
                .setDescription(suggestion)
                .setFooter(`Proposée par ${message.author.username}`)
                .setColor("#0099ff");

            const suggestionsChannel = message.guild.channels.cache.find(channel => channel.name === 'suggestions');
            if (suggestionsChannel) {
                suggestionsChannel.send({ embeds: [embed] });
                message.channel.send("Votre suggestion a été soumise !");
            } else {
                message.reply("Le canal des suggestions n'existe pas. Veuillez créer un canal nommé 'suggestions'.");
            }
        }
    }
};

// Événements pour les messages de bienvenue et d'au revoir
module.exports.onMemberAdd = (member) => {
    const welcomeMessage = db.get(`welcome_${member.guild.id}`);
    const welcomeChannel = member.guild.systemChannel; // Canal par défaut pour les messages système
    if (welcomeMessage && welcomeChannel) {
        welcomeChannel.send(
            welcomeMessage
                .replace('{user}', `<@${member.id}>`) // Mentionne l'utilisateur qui rejoint
                .replace('{server}', member.guild.name)
                .replace('{channel}', `<#${welcomeChannel.id}>`)
        );
    }
};

module.exports.onMemberRemove = (member) => {
    const goodbyeMessage = db.get(`goodbye_${member.guild.id}`);
    const goodbyeChannel = member.guild.systemChannel; // Canal par défaut pour les messages système
    if (goodbyeMessage && goodbyeChannel) {
        goodbyeChannel.send(
            goodbyeMessage
                .replace('{user}', member.user.tag) // Affiche le nom de l'utilisateur qui part
                .replace('{server}', member.guild.name)
        );
    }
};

