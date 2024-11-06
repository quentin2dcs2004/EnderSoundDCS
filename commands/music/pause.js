const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: {
        name: 'pause',
        description: 'Mettre en pause la chanson en cours.',
    },
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) return interaction.reply('Je ne suis pas dans un canal vocal !');

        connection.state.subscription.player.pause();
        interaction.reply('⏸ La musique a été mise en pause.');
    },
};
