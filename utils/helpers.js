module.exports.helpers = {
    formatArgs: (args) => {
        return args.join(' ');
    },

    isUserAuthorized: (message, role) => {
        return message.member.roles.cache.some(r => r.name === role);
    }
};
