module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Déverrouiller le canal'),

    async execute(interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: true });
        return interaction.reply("🔓 Ce canal est maintenant déverrouillé.");
    }
};
