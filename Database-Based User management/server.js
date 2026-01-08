import express from 'express'
import { dbConnection } from './config/db.config.js'
import dotenv from 'dotenv'
import { User } from './models/user.model.js'

const app = express()
const PORT = 5000

dotenv.config();
dbConnection()
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Configuring MongoDB")
})

app.route('/api/user/')
    .post(async (req, res) => {

        const { firstName, lastName, email, jobTitle, gender } = req.body

        if (!firstName || !lastName || !email || !jobTitle || !gender) {
            res.status(400).json({ status: 'fail', message: 'All field are require' })
        }

        await User.create({
            firstName,
            lastName,
            email,
            jobTitle,
            gender,
        })

        res.status(201).json({ status: 'success', message: 'User created' })
    })
    .get(async (req, res) => {
        const Users = await User.find({})

        const allUserNames = `
        <ul>
        ${Users.map(user => `<li><b>${user.firstName}:</b> ${user.email}</li>`).join("")}
        </ul>
        `
        res.status(200).send(allUserNames)
    })

app.route('/api/user/:id')
    .patch(async (req, res) => {

        const { firstName, lastName, email, jobTitle, gender } = req.body
        await User.findByIdAndUpdate(req.params.id, {
            firstName,
            lastName,
            email,
            jobTitle,
            gender,
        })
        res.status(200).json({ status: 'success', message: 'User Updated' })
    })
    .delete(async (req, res) => {

        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({ status: 'success', message: 'user deleted' })
    })

app.listen(PORT, () => console.log("Server started"));