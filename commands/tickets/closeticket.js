module.exports = {
    data: {
        name: 'closeticket',
        description: 'Fermer un ticket ouvert.'
    },
    async execute(interaction) {
        if (!interaction.channel.name.startsWith('ticket-')) {
            return interaction.reply('Cette commande ne peut être utilisée que dans un ticket.');
        }

        await interaction.channel.delete();
        return interaction.reply('Le ticket a été fermé.');
    },
};
