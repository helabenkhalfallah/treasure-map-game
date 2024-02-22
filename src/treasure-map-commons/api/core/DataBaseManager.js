// mongoose part
import mongoose from 'mongoose';
import AppLogger from '../logger/AppLogger.js';

// promise
mongoose.Promise = Promise;

/**
 * Database Initialisation et Connection
 * @param {string} databaseUri
 */
const connect = async (databaseUri) => {
  try {
    AppLogger.info(`Url de connexion à la base de données: ${databaseUri}`);
    await mongoose.connect(databaseUri);
    AppLogger.info('🚀 Connection avec succès à la base de données');
  } catch (error) {
    AppLogger.error('Une erreur c\'est produite durant la connection à la base de données: ', error);
  }
};

/**
 * Database Déconnexion
 */
const disconnect = async () => {
  try {
    await mongoose.disconnect();
    AppLogger.info('Déconnexion avec succès à la base de données');
  } catch (error) {
    AppLogger.error('Une erreur c\'est produite durant la Déconnexion de la base de données: ', error);
  }
};

const DataBaseManager = {
  connect,
  disconnect,
};

export default DataBaseManager;
