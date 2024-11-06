module.exports = {
    data: {
        name: 'notify',
        description: 'Envoyer un message à tous les membres du serveur.',
        options: [
            {
                name: 'message',
                type: 'STRING',
                description: 'Message à envoyer',
                required: true,
            }
        ]
    },
    async execute(interaction) {
        const message = interaction.options.getString('message');
        interaction.guild.members.cache.forEach(member => {
            if (!member.user.bot) {
                member.send(message).catch(error => console.log(`Could not send message to ${member.user.tag}: ${error}`));
            }
        });
        return interaction.reply('Message envoyé à tous les membres.');
    },
};
