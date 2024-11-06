module.exports = {
    data: {
        name: 'log',
        description: 'Enregistrer une action dans un canal de log.',
        options: [
            {
                name: 'action',
                type: 'STRING',
                description: 'Action à enregistrer',
                required: true,
            }
        ]
    },
    async execute(interaction) {
        const action = interaction.options.getString('action');
        const logChannel = interaction.guild.channels.cache.find(ch => ch.name === 'logs');

        if (!logChannel) return interaction.reply('Le canal de log n\'est pas configuré.');

        await logChannel.send(`Action enregistrée : ${action}`);
        return interaction.reply('Action enregistrée dans le canal de log.');
    },
};
