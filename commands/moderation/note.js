const { SlashCommandBuilder } = require('@discordjs/builders');

// Stockage temporaire des notes
const notes = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('note')
        .setDescription("Ajouter un commentaire à l'historique de sanctions d'un membre.")
        .addUserOption(option => 
            option.setName('utilisateur')
                  .setDescription('Utilisateur pour qui ajouter une note')
                  .setRequired(true))
        .addStringOption(option => 
            option.setName('contenu')
                  .setDescription('Contenu de la note')
                  .setRequired(true)),

    async execute(interaction) {
        // Vérifier si l'utilisateur dispose du rôle requis
        const requiredRole = interaction.guild.roles.cache.find(role => role.name === "Modérateur");
        if (!interaction.member.roles.cache.has(requiredRole.id)) {
            return interaction.reply({ content: "❌ Vous n'avez pas les permissions nécessaires pour ajouter une note.", ephemeral: true });
        }

        const user = interaction.options.getUser('utilisateur');
        const content = interaction.options.getString('contenu');

        // Initialiser les notes pour cet utilisateur si nécessaire
        if (!notes[user.id]) {
            notes[user.id] = [];
        }

        // Ajouter la note à l'utilisateur
        notes[user.id].push(content);
        
        // Répondre sans avertir l'utilisateur
        return interaction.reply({ content: `📝 Note ajoutée pour ${user.tag} : "${content}"`, ephemeral: true });
    },

    // Méthode pour afficher toutes les notes d'un utilisateur (réservée aux modérateurs)
    async viewNotes(interaction) {
        const user = interaction.options.getUser('utilisateur');

        if (!notes[user.id] || notes[user.id].length === 0) {
            return interaction.reply({ content: `❌ Aucune note trouvée pour ${user.tag}.`, ephemeral: true });
        }

        const noteList = notes[user.id].map((note, index) => `${index + 1}. ${note}`).join('\n');
        return interaction.reply({ content: `📄 Notes pour ${user.tag} :\n${noteList}`, ephemeral: true });
    }
};
