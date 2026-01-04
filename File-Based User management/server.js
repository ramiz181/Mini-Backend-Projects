import express from 'express'
import fs from 'fs'
import users from './users.json' with {type: 'json'}

const app = express()
const PORT = 4000

app.use(express.urlencoded({ extended: false }))

app.post('/auth/register/', (req, res) => {
    const body = req.body;

    // id, firstname, lastname, email, password, 
    // username ===> concat first last name + 3 digit random number at last

    const exists = users.some(user => user.email === body.email)
    console.log(exists);

    if (exists) {
        return res.json({ message: "user already exists" })
    }
    else {
        // Math.random()  ==> returns a number in the range: 0 <= n < 1
        // adding 100 ==> cuz generated no. * 900 canbe less than 100 (2 digit)
        const randomNumber = Math.floor(Math.random() * 900 + 100)
        const username = body.firstName.toLowerCase() + body.lastName.toLowerCase() + randomNumber
        console.log(username);

        users.push({ id: users.length + 1, username, ...body })
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) throw err
        })
        res.json({ message: "User successfully registered" })
    }



    // const data = JSON.parse(fs.readFileSync('users.json', "utf-8"))
    // console.log(body);

    // users.map(user => {
    // })

    // console.log(typeof (body.email));

    // if (user.email === body.email) {
    //     res.json({ message: "user already exist" })
    // }
    // else {
    //     console.log("line 34");
    // }

})

app.post('/auth/login/', (req, res) => {

    // destructuring values
    const { email, password } = req.body

    const user = users.find(user => user.email === email)

    // res.json ==> sends a response 
    // return ==> stops the function execution
    // without "return" keyword function will continue running after sending response "User doesn't exist"

    if (!user) return res.json({ message: "User doesn't exist" })
    if (user.password !== password) return res.json({ message: "Password mismatch" })

    res.json({ message: "User logged in...redirecting to homepage" })
})

app.get('/user/:id', (req, res) => {

    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)

    // const userCopy = { ...user }
    // delete userCopy.password
    const { password, ...userCopy } = user
    res.json(userCopy)
})

app.get('/user/', (req, res) => {

    // const userCopy = [...users]
    const updatedUser = users.map(user => {
        const userCopy = { ...user }
        delete userCopy.password
        return userCopy
    })
    res.json(updatedUser)

})


app.listen(PORT, () => console.log("Server started"));