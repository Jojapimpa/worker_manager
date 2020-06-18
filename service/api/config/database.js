module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;

    mongoose.connect(config.database, {
        promiseLibrary: global.Promise
    });

    database.on('error', error => console.log(`Connection to Potato database failed: ${error}`));
    database.on('connected', () => console.log('Connected to Potato database'));
    database.on('disconnected', () => console.log('Disconnected from Potato database'));

    process.on('SIGINT', () => {
        database.close(() => {
            console.log('Potato terminated, connection closed');
            process.exit(0);
        })
    });
};