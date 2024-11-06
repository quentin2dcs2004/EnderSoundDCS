const { Message } = require('discord.js');

const leaderboard = new Map();

module.exports = {
    name: 'leaderboard',
    description: 'Voir le classement actuel des joueurs qui jouent avec les commandes de jeux.',
    execute(message) {
        const leaderboardArray = Array.from(leaderboard.entries()).sort((a, b) => b[1] - a[1]);
        const leaderboardMessage = leaderboardArray.length > 0 
            ? leaderboardArray.map(([user, score]) => `<@${user}> : ${score}`).join('\n') 
            : 'Il n\'y a pas encore de joueurs.';
        return message.channel.send(`**Classement des jeux :**\n${leaderboardMessage}`);
    },
};
