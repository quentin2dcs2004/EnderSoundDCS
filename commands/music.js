const { Client, GatewayIntentBits } = require('discord.js'); // Mise à jour de l'importation
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core'); // Pour télécharger des vidéos YouTube

const client = new Client({ 
    intents: [ 
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildMessages 
    ] 
});

const prefix = '!'; // Préfixe des commandes
const queue = new Map(); // Pour gérer la file d'attente de musique

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Commande de lecture de musique
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const serverQueue = queue.get(message.guild.id);

    // Commande !play
    if (command === 'play') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply("Tu dois être dans un canal vocal pour jouer de la musique !");
        
        const songInfo = await ytdl.getInfo(args[0]); // Prendre le lien YouTube
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };

            queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });

                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);

            } catch (err) {
                console.error(err);
                queue.delete(message.guild.id);
                return message.reply("Il y a eu une erreur en rejoignant le canal vocal.");
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`Ajouté à la file d'attente : **${song.title}**`);
        }
    }

    // Commande !pause
    else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send('Musique mise en pause.');
        }
        return message.reply('Il n\'y a pas de musique en cours de lecture.');
    }

    // Commande !resume
    else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send('Musique reprise.');
        }
        return message.reply('Il n\'y a pas de musique mise en pause.');
    }

    // Commande !skip
    else if (command === 'skip') {
        if (!serverQueue) return message.reply('Il n\'y a pas de musique à passer.');
        serverQueue.connection.dispatcher.end();
        return message.channel.send('Musique suivante.');
    }

    // Commande !stop
    else if (command === 'stop') {
        queue.delete(message.guild.id);
        serverQueue.connection.disconnect();
        return message.channel.send('Musique arrêtée et déconnexion du canal vocal.');
    }

    // Commande !queue
    else if (command === 'queue') {
        if (!serverQueue) return message.reply('Il n\'y a pas de musique en cours.');
        const queueMessage = serverQueue.songs.map((song, index) => `**${index + 1}** - ${song.title}`).join('\n');
        return message.channel.send(`**File d'attente :**\n${queueMessage}`);
    }

    // Commande !np
    else if (command === 'np') {
        if (!serverQueue || serverQueue.songs.length === 0) return message.reply('Il n\'y a pas de musique en cours.');
        return message.channel.send(`En train de jouer : **${serverQueue.songs[0].title}**`);
    }

    // Commande !volume
    else if (command === 'volume') {
        const volume = parseInt(args[0]);
        if (!serverQueue) return message.reply('Il n\'y a pas de musique en cours.');
        if (isNaN(volume) || volume < 0 || volume > 10) return message.reply('Le volume doit être un nombre entre 0 et 10.');

        serverQueue.volume = volume;
        return message.channel.send(`Volume réglé à : **${volume}**`);
    }
});

// Fonction de lecture de musique
function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly' });
    serverQueue.connection.subscribe(createAudioPlayer());
    const resource = createAudioResource(stream);
    
    const player = createAudioPlayer();
    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    });

    player.on('error', error => console.error(error));

    serverQueue.connection.subscribe(player);
}

client.login(process.env.DISCORD_TOKEN);
