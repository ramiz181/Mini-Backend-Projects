import mongoose from "mongoose";


export const dbConnection = async () => {
    await mongoose.connect(process.env.mongoDB_URI)
        .then((e) => {
            console.log(`Connected to MongoDB atlas: ${e.connection.port}, ${e.connection.name}`);
        })
        .catch(err => {
            console.log(err);
        })
}