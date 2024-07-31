import mongoose from 'mongoose';
import keys from '../config/keys/keys.js';

mongoose.Promise = global.Promise;

const dbConnect = () => {
    mongoose
        .connect(keys.database.url, {
        })
        .then(() => {
            console.log('Connected to the database!');
        })
        .catch((error) => {
            console.error('Database Connection error', error.message);
        });

    mongoose.connection.on('error', (error) => {
        console.log('Database Connection error', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Database Connection error, try to reconnect');
    });
};

export default dbConnect;