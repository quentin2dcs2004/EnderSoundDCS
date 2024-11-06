const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Exclure un utilisateur')
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('Utilisateur à exclure')
                  .setRequired(true))
        .addStringOption(option => 
            option.setName('raison')
                  .setDescription('Raison de l\'exclusion')
                  .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie';
        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            await member.kick(reason);
            return interaction.reply(`✅ ${user.tag} a été exclu. Raison : ${reason}`);
        } else {
            return interaction.reply("❌ Cet utilisateur n'est pas dans le serveur.");
        }
    }
};
