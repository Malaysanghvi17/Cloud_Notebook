const mongoose = require('mongoose');
// const mongoUri = "mongodb://localhost:27017/chat_app"
const mongoUri = "mongodb://localhost:27017/"

const connect_to_mongodb = () => {
        mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                    console.log('Connected to MongoDB');
        })
        .catch(error => {
                console.error('Error connecting to MongoDB:', error);
            })
    }
    
module.exports = connect_to_mongodb;
    
    // or
    
    
        // const connect_to_mongodb = () => {
        //     mongoose.connect(mongoUri, () => {
        //         console.log("connected to mongodb succesfully....");
        //     })
        // }
    