const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprimer un nombre de messages')
        .addIntegerOption(option => 
            option.setName('nombre')
                  .setDescription('Nombre de messages à supprimer')
                  .setRequired(true)),

    async execute(interaction) {
        const amount = interaction.options.getInteger('nombre');

        if (amount < 1 || amount > 100) {
            return interaction.reply("❌ Spécifie un nombre entre 1 et 100.");
        }

        await interaction.channel.bulkDelete(amount, true);
        return interaction.reply(`✅ ${amount} messages ont été supprimés.`);
    }
};
