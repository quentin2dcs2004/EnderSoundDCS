const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bet')
        .setDescription('Parier de l\'argent sur un jeu.')
        .addIntegerOption(option => 
            option.setName('montant')
                  .setDescription('Le montant à parier')
                  .setRequired(true))
        .addStringOption(option =>
            option.setName('jeu')
                  .setDescription('Le jeu sur lequel parier (ex: "dés")')
                  .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('montant');
        const game = interaction.options.getString('jeu').toLowerCase();

        // Vérification du montant
        const profile = getUserProfile(interaction.user);
        if (amount <= 0) {
            return await interaction.reply('Veuillez spécifier un montant valide à parier.');
        }
        if (profile.balance < amount) {
            return await interaction.reply('Vous n\'avez pas assez de pièces pour parier cette somme.');
        }

        // Simuler le jeu (lancer de dés par exemple)
        let result;
        if (game === 'dés') {
            result = Math.floor(Math.random() * 6) + 1; // Lancer de dés entre 1 et 6
        } else {
            return await interaction.reply('Jeu inconnu. Veuillez spécifier un jeu valide (ex: "dés").');
        }

        // Déterminer si le joueur gagne ou perd
        const win = result > 3; // Gagne si le résultat est supérieur à 3
        if (win) {
            const winnings = amount * 2; // Double le montant parié
            profile.balance += winnings;
            await interaction.reply(`${interaction.user.username}, vous avez gagné **${winnings}** pièces en lançant les dés avec un résultat de **${result}** !`);
        } else {
            profile.balance -= amount;
            await interaction.reply(`${interaction.user.username}, vous avez perdu **${amount}** pièces en lançant les dés avec un résultat de **${result}**. Mieux vaut chance la prochaine fois !`);
        }
    },
};
