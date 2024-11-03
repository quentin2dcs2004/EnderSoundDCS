const community = require('../community');

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        community.onMemberRemove(member);
    },
};
