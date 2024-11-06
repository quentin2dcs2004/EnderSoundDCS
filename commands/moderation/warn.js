const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Avertir un utilisateur')
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('Utilisateur à avertir')
                  .setRequired(true))
        .addStringOption(option => 
            option.setName('raison')
                  .setDescription('Raison de l\'avertissement')
                  .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison');

        try {
            await user.send(`⚠️ Vous avez été averti sur ${interaction.guild.name} pour : ${reason}`);
            return interaction.reply(`🔔 ${user.tag} a été averti pour : ${reason}`);
        } catch (error) {
            console.error(error);
            return interaction.reply("❌ Impossible d'envoyer un message privé à cet utilisateur.");
        }
    }
};
