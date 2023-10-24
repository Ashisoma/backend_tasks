const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology :true
        })
        
        console.log(`MongoDb connected: ${connect.connection.host}`)
    } catch (error) {
        // Catch connection to mongo error
        console.error(`Error connecting to Mongo Database: ${error.message}` );
        // terminate process sychronously
        process.exit(1);
    }
}

module.exports = connectDatabase;