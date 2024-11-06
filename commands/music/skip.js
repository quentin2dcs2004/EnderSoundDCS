const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: {
        name: 'skip',
        description: 'Passer à la chanson suivante.',
    },
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) return interaction.reply('Je ne suis pas dans un canal vocal !');

        connection.state.subscription.player.stop();
        interaction.reply('⏭ Chanson suivante.');
    },
};
