const { MessageEmbed } = require('discord.js');
const ms = require('ms'); // Assurez-vous que le module "ms" est installé

module.exports = {
    name: 'utility',
    description: 'Commandes Utilitaires',
    
    execute(message, args, command) {
        const { client, guild, author } = message;
        
        // Commande !help - Affiche la liste des commandes
        if (command === 'help') {
            const helpEmbed = new MessageEmbed()
                .setTitle("Liste des Commandes")
                .setDescription("Voici les commandes disponibles :")
                .addFields(
                    { name: '!help', value: 'Afficher la liste des commandes disponibles.' },
                    { name: '!ping', value: 'Vérifier la latence du bot.' },
                    { name: '!userinfo <utilisateur>', value: 'Afficher des informations sur un utilisateur.' },
                    { name: '!serverinfo', value: 'Afficher des informations sur le serveur.' },
                    { name: '!avatar <utilisateur>', value: 'Afficher l’avatar d’un utilisateur.' },
                    { name: '!poll <question>', value: 'Créer un sondage.' },
                    { name: '!remind <temps> <message>', value: 'Créer un rappel.' }
                )
                .setColor('#00FF00');
            return message.channel.send({ embeds: [helpEmbed] });
        }

        // Commande !ping - Vérifie la latence du bot
        else if (command === 'ping') {
            const ping = Date.now() - message.createdTimestamp;
            return message.channel.send(`🏓 Pong! La latence est de ${ping}ms.`);
        }

        // Commande !userinfo - Affiche des informations sur un utilisateur
        else if (command === 'userinfo') {
            const user = message.mentions.users.first() || author;
            const member = guild.members.cache.get(user.id);
            const userEmbed = new MessageEmbed()
                .setTitle(`Informations sur ${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .addField('ID', user.id)
                .addField('Tag', user.tag)
                .addField('Créé le', user.createdAt.toDateString())
                .addField('Rejoint le serveur le', member.joinedAt.toDateString())
                .setColor('#3498DB');
            return message.channel.send({ embeds: [userEmbed] });
        }

        // Commande !serverinfo - Affiche des informations sur le serveur
        else if (command === 'serverinfo') {
            const serverEmbed = new MessageEmbed()
                .setTitle(`Informations sur ${guild.name}`)
                .setThumbnail(guild.iconURL())
                .addField('Nom du serveur', guild.name)
                .addField('Membres', `${guild.memberCount}`)
                .addField('Créé le', guild.createdAt.toDateString())
                .addField('Propriétaire', `<@${guild.ownerId}>`)
                .setColor('#E67E22');
            return message.channel.send({ embeds: [serverEmbed] });
        }

        // Commande !avatar - Affiche l'avatar d'un utilisateur
        else if (command === 'avatar') {
            const user = message.mentions.users.first() || author;
            return message.channel.send(`Avatar de ${user.username} : ${user.displayAvatarURL({ dynamic: true, size: 512 })}`);
        }

        // Commande !poll - Crée un sondage
        else if (command === 'poll') {
            if (!args.length) return message.reply('Veuillez poser une question pour le sondage.');
            const pollEmbed = new MessageEmbed()
                .setTitle("Sondage")
                .setDescription(args.join(' '))
                .setColor('#F1C40F')
                .setFooter(`Sondage créé par ${author.tag}`);
            message.channel.send({ embeds: [pollEmbed] }).then(sentEmbed => {
                sentEmbed.react('👍');
                sentEmbed.react('👎');
            });
        }

        // Commande !remind - Crée un rappel
        else if (command === 'remind') {
            const time = args.shift();
            const reminderMessage = args.join(' ');
            if (!time || !reminderMessage) return message.reply('Veuillez spécifier un temps et un message pour le rappel. Ex : !remind 10m Prenez une pause !');
            
            const msTime = ms(time);
            if (!msTime) return message.reply('Le format du temps est incorrect. Utilisez par exemple 10s, 5m, 1h.');
            
            message.channel.send(`⏰ Rappel dans ${time}: "${reminderMessage}"`);
            setTimeout(() => {
                message.reply(`🔔 Rappel : ${reminderMessage}`);
            }, msTime);
        }
    }
};
