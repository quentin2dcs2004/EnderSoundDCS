const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Envoyer de l’argent à un utilisateur.')
        .addUserOption(option => option.setName('utilisateur').setDescription('L’utilisateur à qui envoyer de l’argent').setRequired(true))
        .addIntegerOption(option => option.setName('montant').setDescription('Le montant à envoyer').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('utilisateur');
        const amount = interaction.options.getInteger('montant');

        if (amount <= 0) {
            return await interaction.reply('Veuillez spécifier un montant valide.');
        }

        const senderProfile = getUserProfile(interaction.user);
        const receiverProfile = getUserProfile(target);

        if (senderProfile.balance < amount) {
            return await interaction.reply('Vous n\'avez pas assez de pièces pour cette transaction.');
        }

        senderProfile.balance -= amount;
        receiverProfile.balance += amount;

        await interaction.reply(`${interaction.user.username} a envoyé **${amount}** pièces à ${target.username}.`);
    },
};
