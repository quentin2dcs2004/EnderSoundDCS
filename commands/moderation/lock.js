module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Verrouiller le canal'),

    async execute(interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SEND_MESSAGES: false });
        return interaction.reply("🔒 Ce canal est maintenant verrouillé.");
    }
};
