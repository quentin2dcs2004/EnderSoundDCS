const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Rendre muet un utilisateur')
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('Utilisateur à rendre muet')
                  .setRequired(true))
        .addIntegerOption(option => 
            option.setName('durée')
                  .setDescription('Durée en minutes')
                  .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const duration = interaction.options.getInteger('durée') || 0;
        const member = interaction.guild.members.cache.get(user.id);

        if (member) {
            await member.timeout(duration * 60 * 1000, 'Mute temporaire');
            return interaction.reply(`🔇 ${user.tag} a été rendu muet pour ${duration} minutes.`);
        } else {
            return interaction.reply("❌ Cet utilisateur n'est pas dans le serveur.");
        }
    }
};
