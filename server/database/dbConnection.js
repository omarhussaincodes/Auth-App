import mongoose from 'mongoose';

async function connectToDb() {

    mongoose.connect('mongodb://localhost:27017/yelp-camp', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    const db = mongoose.connection;

    return db;
}

export default connectToDb;


