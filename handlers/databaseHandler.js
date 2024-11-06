const mongoose = require('mongoose');

module.exports.databaseHandler = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Base de données connectée avec succès.');
    } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
    }
};
