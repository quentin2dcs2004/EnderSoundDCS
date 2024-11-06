const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: {
        name: 'play',
        description: 'Jouer une chanson depuis YouTube.',
        options: [
            {
                name: 'média',
                type: 'STRING',
                description: 'Nom de la chanson ou lien',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const media = interaction.options.getString('média');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) return interaction.reply('Vous devez être dans un canal vocal pour jouer de la musique !');

        // Connecter au canal vocal et commencer à jouer la chanson
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl(media, { filter: 'audioonly' });
        const resource = createAudioResource(stream);

        const player = createAudioPlayer();
        player.play(resource);
        connection.subscribe(player);

        // Répondre à l'utilisateur
        interaction.reply(`🎶 Je joue : ${media}`);
    },
};
