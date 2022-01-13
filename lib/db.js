import pkg from 'mongoose'
const { connect, connection } = pkg

const uriDb = process.env.DB_URI;

const db = pkg.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.on('connected', () => {
    console.log('Mongoose connected to DB');
})

connection.on('err', (err) => {
    console.log(`Mongoose connection error: ${err}`);
})

connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
})

process.on('SIGINT', async () => {
    connection.close()
    console.log('Connection DB closed');
    process.exit(1)
})

export default db