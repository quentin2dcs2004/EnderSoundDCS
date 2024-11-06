const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Afficher l’avatar d’un utilisateur.')
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('L\'utilisateur dont afficher l\'avatar')
                  .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') || interaction.user;
        return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true, size: 1024 })}`);
    },
};
