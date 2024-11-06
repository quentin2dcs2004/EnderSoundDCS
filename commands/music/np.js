module.exports = {
    data: {
        name: 'np',
        description: 'Afficher la chanson en cours de lecture.',
    },
    async execute(interaction) {
        const currentSong = 'Nom de la chanson actuelle'; // À lier avec la logique de lecture en cours
        interaction.reply(`🎶 La chanson actuelle est : ${currentSong}`);
    },
};
