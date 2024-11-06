module.exports = {
    data: {
        name: 'vote',
        description: 'Créer un sondage avec des options.',
        options: [
            {
                name: 'question',
                type: 'STRING',
                description: 'La question du sondage',
                required: true,
            },
            {
                name: 'options',
                type: 'STRING',
                description: 'Options séparées par des virgules',
                required: true,
            }
        ]
    },
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const options = interaction.options.getString('options').split(',');

        const pollEmbed = new MessageEmbed()
            .setTitle('Sondage')
            .setDescription(question)
            .setFooter('Réagissez avec l\'emoji correspondant à votre choix.');

        for (let i = 0; i < options.length; i++) {
            pollEmbed.addField(`Option ${i + 1}`, options[i].trim(), false);
        }

        const pollMessage = await interaction.channel.send({ embeds: [pollEmbed] });
        for (let i = 0; i < options.length; i++) {
            await pollMessage.react(`${i + 1}️⃣`); // Ajouter une réaction pour chaque option
        }

        return interaction.reply('Sondage créé avec succès !');
    },
};
