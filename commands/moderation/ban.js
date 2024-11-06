const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un utilisateur')
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('Utilisateur à bannir')
                  .setRequired(true))
        .addStringOption(option => 
            option.setName('raison')
                  .setDescription('Raison du bannissement')
                  .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie';
        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            await member.ban({ reason });
            return interaction.reply(`✅ ${user.tag} a été banni. Raison : ${reason}`);
        } else {
            return interaction.reply("❌ Cet utilisateur n'est pas dans le serveur.");
        }
    }
};
