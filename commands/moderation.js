const { Client, GatewayIntentBits } = require('discord.js'); 
const client = new Client({ 
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Assurez-vous d'ajouter cet intent si nécessaire
    ] 
});

const prefix = '!';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Fonction pour vérifier les permissions de l'utilisateur
function checkPermissions(member) {
    return member.permissions.has('MANAGE_MESSAGES'); // Modifier selon le rôle requis
}

// Écoute des messages
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Commande !ban
    if (command === 'ban') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission de bannir des membres.");
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie';
        if (user) {
            const member = message.guild.members.cache.get(user.id);
            if (member) {
                await member.ban({ reason });
                message.channel.send(`Banni ${user.tag} pour : ${reason}`);
            } else {
                message.reply("Cet utilisateur n'est pas dans le serveur.");
            }
        } else {
            message.reply("Tu dois mentionner un utilisateur à bannir.");
        }
    } 
    // Commande !kick
    else if (command === 'kick') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission d'expulser des membres.");
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie';
        if (user) {
            const member = message.guild.members.cache.get(user.id);
            if (member) {
                await member.kick(reason);
                message.channel.send(`Expulsé ${user.tag} pour : ${reason}`);
            } else {
                message.reply("Cet utilisateur n'est pas dans le serveur.");
            }
        } else {
            message.reply("Tu dois mentionner un utilisateur à expulser.");
        }
    } 
    // Commande !mute
    else if (command === 'mute') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission de rendre muet des membres.");
        const user = message.mentions.users.first();
        const duration = args[1] ? parseInt(args[1]) : 0; // Durée en minutes
        if (user && duration > 0) {
            const member = message.guild.members.cache.get(user.id);
            if (member) {
                await member.voice.setMute(true);
                message.channel.send(`Rendu muet ${user.tag} pour ${duration} minutes.`);
                setTimeout(async () => {
                    await member.voice.setMute(false);
                    message.channel.send(`${user.tag} n'est plus muet.`);
                }, duration * 60 * 1000);
            } else {
                message.reply("Cet utilisateur n'est pas dans le serveur.");
            }
        } else {
            message.reply("Tu dois mentionner un utilisateur et une durée valide.");
        }
    } 
    // Commande !unmute
    else if (command === 'unmute') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission de rétablir les droits de parole.");
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.cache.get(user.id);
            if (member) {
                await member.voice.setMute(false);
                message.channel.send(`Rétabli les droits de parole à ${user.tag}.`);
            } else {
                message.reply("Cet utilisateur n'est pas dans le serveur.");
            }
        } else {
            message.reply("Tu dois mentionner un utilisateur à rétablir.");
        }
    } 
    // Commande !warn
    else if (command === 'warn') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission d'avertir des membres.");
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie';
        if (user) {
            message.channel.send(`Avertissement envoyé à ${user.tag} pour : ${reason}`);
            user.send(`Tu as été averti pour : ${reason}`);
        } else {
            message.reply("Tu dois mentionner un utilisateur à avertir.");
        }
    } 
    // Commande !clear
    else if (command === 'clear') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission de supprimer des messages.");
        const number = parseInt(args[0]);
        if (!isNaN(number) && number > 0 && number <= 100) {
            await message.channel.bulkDelete(number, true);
            message.channel.send(`Supprimé ${number} messages.`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        } else {
            message.reply("Tu dois spécifier un nombre valide de messages à supprimer (1-100).");
        }
    } 
    // Commande !lock
    else if (command === 'lock') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission de verrouiller des canaux.");
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false });
        message.channel.send(`Le canal ${message.channel.name} est maintenant verrouillé.`);
    } 
    // Commande !unlock
    else if (command === 'unlock') {
        if (!checkPermissions(message.member)) return message.reply("Tu n'as pas la permission de déverrouiller des canaux.");
        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true });
        message.channel.send(`Le canal ${message.channel.name} est maintenant déverrouillé.`);
    } 
    // Commande !règlement
    else if (command === 'règlement') {
        if (args[0] === 'créer') {
            message.channel.send("Règlement créé, vous pouvez maintenant ajouter des règles.");
        } else if (args[0] === 'ajouter') {
            const ruleMessage = args.slice(1).join(' ');
            message.channel.send(`Règle ajoutée : ${ruleMessage}`);
        } else if (args[0] === 'modif') {
            const ruleNumber = args[1];
            message.channel.send(`Règle ${ruleNumber} modifiée.`);
        } else if (args[0] === 'supprimer') {
            const ruleNumber = args[1];
            message.channel.send(`Règle ${ruleNumber} supprimée.`);
        } else {
            message.reply("Commande inconnue. Utilisez `!règlement créer`, `!règlement ajouter`, `!règlement modif`, ou `!règlement supprimer`.");
        }
    }
});



