import { User } from "../models/user.model.js"


export const createUser = async (req, res) => {

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
}

export const getUsers = async (req, res) => {
    const Users = await User.find({})

    const allUserNames = `
        <ul>
        ${Users.map(user => `<li><b>${user.firstName}:</b> ${user.email}</li>`).join("")}
        </ul>
        `
    res.status(200).send(allUserNames)
}

export const editUsers = async (req, res) => {
    const { firstName, lastName, email, jobTitle, gender } = req.body
    await User.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        email,
        jobTitle,
        gender,
    })
    res.status(200).json({ status: 'success', message: 'User Updated' })
}

export const deleteUsers = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ status: 'success', message: 'user deleted' })
}