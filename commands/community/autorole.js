module.exports = {
    data: {
        name: 'autorole',
        description: 'Attribuer un rôle automatiquement aux nouveaux membres.',
        options: [
            {
                name: 'rôle',
                type: 'ROLE',
                description: 'Rôle à attribuer',
                required: true,
            }
        ]
    },
    async execute(interaction) {
        const role = interaction.options.getRole('rôle');
        // Logique pour attribuer le rôle aux nouveaux membres
        return interaction.reply(`Le rôle **${role.name}** sera attribué automatiquement aux nouveaux membres.`);
    },
};
