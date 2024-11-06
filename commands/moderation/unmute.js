const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Rétablir la voix d\'un utilisateur')
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('Utilisateur à démuter')
                  .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            await member.timeout(null);
            return interaction.reply(`🔈 ${user.tag} a été démuté.`);
        } else {
            return interaction.reply("❌ Cet utilisateur n'est pas dans le serveur.");
        }
    }
};
