const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'tickets',
    description: 'Gestion des tickets de support',
    
    async execute(message, args) {
        const command = args[0];
        
        if (command === 'open') {
            // Vérification si un ticket existe déjà pour cet utilisateur
            const existingChannel = message.guild.channels.cache.find(
                (channel) => channel.name === `ticket-${message.author.id}`
            );
            if (existingChannel) {
                return message.reply("Vous avez déjà un ticket ouvert.");
            }

            // Création d'un nouveau canal pour le ticket
            const ticketChannel = await message.guild.channels.create({
                name: `ticket-${message.author.id}`,
                type: 0, // 0 pour un canal texte
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel], // Canal caché pour tous les membres
                    },
                    {
                        id: message.author.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], // Autorisations pour l'utilisateur
                    },
                    {
                        id: message.client.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], // Autorisations pour le bot
                    }
                ]
            });

            ticketChannel.send(`Bonjour ${message.author}, voici votre canal de support. Décrivez votre problème pour que nous puissions vous aider.`);
            message.reply(`Votre ticket a été créé : ${ticketChannel}`);
        }

        else if (command === 'close') {
            // Vérification si le canal est un ticket
            if (!message.channel.name.startsWith('ticket-')) {
                return message.reply("Cette commande ne peut être utilisée que dans un canal de ticket.");
            }

            // Fermeture du canal
            message.channel.send("Le ticket sera fermé dans 5 secondes...");
            setTimeout(() => message.channel.delete(), 5000);
        }

        else {
            message.reply("Utilisez `!tickets open` pour ouvrir un ticket ou `!tickets close` pour le fermer.");
        }
    }
};
