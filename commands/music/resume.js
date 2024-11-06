const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: {
        name: 'resume',
        description: 'Reprendre la lecture de la chanson.',
    },
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) return interaction.reply('Je ne suis pas dans un canal vocal !');

        connection.state.subscription.player.unpause();
        interaction.reply('▶ La musique a repris.');
    },
};
