module.exports = {
    name: 'work',
    description: 'Permet de gagner de l’argent en effectuant des missions.',
    execute(message, args, economy) {
        const earnings = Math.floor(Math.random() * 100) + 1;
        const profile = getUserProfile(message.author, economy);
        profile.balance += earnings;
        message.channel.send(`${message.author.username}, vous avez travaillé et gagné **${earnings}** pièces !`);
    }
};
