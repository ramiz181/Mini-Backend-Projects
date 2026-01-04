import express from 'express'
import fs from 'fs'
import users from './users.json' with {type: 'json'}

const app = express()
const PORT = 4000

app.use(express.urlencoded({ extended: false }))

app.post('/auth/register/', (req, res) => {
    const body = req.body;

    const exists = users.some(user => user.email === body.email)
    console.log(exists);

    if (exists) {
        return res.json({ message: "user already exists" })
    }
    else {
        users.push({ id: users.length + 1, ...body })
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) throw err
        })
        res.json({ message: "User successfully registered" })
    }

    console.log("this that these those");


    // id, firstname, lastname, email, password, 
    // username ===> concat first last name + 3 digit random number at last
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

app.listen(PORT, () => console.log("Server started"));