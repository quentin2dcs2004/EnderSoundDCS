module.exports = {
    name: 'leaderboard',
    description: 'Voir le classement actuel des joueurs les plus riches.',
    execute(message, args, economy) {
        const leaderboard = [...economy.values()]
            .sort((a, b) => b.balance - a.balance)
            .slice(0, 10)
            .map((profile, index) => `**#${index + 1}** ${profile.username} - ${profile.balance} pièces`)
            .join('\n');
        
        message.channel.send(`**Classement des joueurs les plus riches :**\n${leaderboard}`);
    }
};
