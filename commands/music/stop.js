const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: {
        name: 'stop',
        description: 'Arrêter la musique et déconnecter le bot du canal vocal.',
    },
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) return interaction.reply('Je ne suis pas dans un canal vocal !');

        connection.destroy();
        interaction.reply('🔴 La musique a été arrêtée et je suis parti du canal vocal.');
    },
};
