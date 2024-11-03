const community = require('../community');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        community.onMemberAdd(member);
    },
};
