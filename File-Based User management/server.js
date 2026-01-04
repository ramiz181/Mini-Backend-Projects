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
    let arr

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

app.listen(PORT, () => console.log("Server started"));