const translate = require('@vitalets/google-translate-api');

module.exports = {
    name: 'translation',
    description: 'Commande de traduction de texte vers une langue cible',

    async execute(message, args) {
        // Vérification de l'argument de commande
        if (args.length < 2) {
            return message.reply('Utilisation : `!translate <langue cible> <texte>`.\nExemple : `!translate en Bonjour tout le monde`');
        }

        // La première partie est la langue cible
        const targetLang = args.shift().toLowerCase();
        // Le reste des arguments est le texte à traduire
        const textToTranslate = args.join(' ');

        try {
            // Appel de l'API pour la traduction
            const res = await translate(textToTranslate, { to: targetLang });
            // Envoi du résultat de traduction au canal
            message.channel.send(`**Traduction en ${targetLang}** : ${res.text}`);
        } catch (error) {
            console.error('Erreur de traduction :', error);
            message.reply('Désolé, la traduction a échoué. Assurez-vous que la langue cible est correcte.');
        }
    }
};

