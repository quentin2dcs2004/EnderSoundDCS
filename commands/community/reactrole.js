module.exports = {
    data: {
        name: 'reactrole',
        description: 'Associer un rôle à une réaction.',
        options: [
            {
                name: 'rôle',
                type: 'ROLE',
                description: 'Rôle à associer',
                required: true,
            },
            {
                name: 'emoji',
                type: 'STRING',
                description: 'Emoji pour la réaction',
                required: true,
            }
        ]
    },
    async execute(interaction) {
        const role = interaction.options.getRole('rôle');
        const emoji = interaction.options.getString('emoji');
        
        // Logique pour envoyer un message avec le rôle attaché à la réaction
        const message = await interaction.channel.send(`Réagissez avec ${emoji} pour obtenir le rôle **${role.name}**.`);
        await message.react(emoji);

        return interaction.reply('Réaction rôle configurée !');
    },
};
