const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Afficher des informations sur un utilisateur.')
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('L\'utilisateur à afficher')
                  .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        return interaction.reply(`**Utilisateur:** ${user.tag}\n**ID:** ${user.id}\n**Rôle le plus élevé:** ${member.roles.highest.name}\n**Date d\'arrivée:** ${member.joinedAt}`);
    },
};
