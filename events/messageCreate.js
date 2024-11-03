client.on('messageCreate', message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) {
        message.reply("Commande inconnue !");
        return;
    }

    try {
        command.execute(message, args); // Exécuter la commande si elle est trouvée
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
        message.reply("Il y a eu une erreur en exécutant cette commande !");
    }
});
