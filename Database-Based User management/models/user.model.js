import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)

// export { User }