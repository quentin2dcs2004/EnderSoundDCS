module.exports = {
    data: {
        name: 'queue',
        description: 'Voir la liste des chansons en file d’attente.',
    },
    async execute(interaction) {
        // Récupérer la liste des chansons en attente
        // Exemple simplifié
        const queue = ['Chanson 1', 'Chanson 2', 'Chanson 3'];

        if (queue.length === 0) return interaction.reply('La file d\'attente est vide.');

        interaction.reply(`🎵 Chansons dans la file d'attente:\n${queue.join('\n')}`);
    },
};
