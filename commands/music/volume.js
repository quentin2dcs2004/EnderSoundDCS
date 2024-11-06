module.exports = {
    data: {
        name: 'volume',
        description: 'Régler le volume.',
        options: [
            {
                name: 'niveau',
                type: 'INTEGER',
                description: 'Niveau du volume (0 à 100)',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const volume = interaction.options.getInteger('niveau');

        // Logic to adjust the volume would go here (for now, just replying with the volume level set)
        interaction.reply(`🔊 Le volume a été réglé à ${volume}%`);
    },
};
