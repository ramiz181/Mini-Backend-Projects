import express from 'express'
import posts from './data/posts.json' with {type: 'json'}
import fs from 'fs'
import { requireAuthorAuth } from './middlewares/requireAuthorAuth.middleware.js'

const app = express()
const PORT = 5000

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Initial testing")
})

// app.post('/testing/', requireAuthorAuth)

app.get('/posts/', (req, res) => {
    res.json(posts)
})

app.patch('/posts/:id', requireAuthorAuth, (req, res) => {

    const body = req.body
    const id = req.params.id

    const post = posts.map(post => {
        return post.id == id
            ? { ...post, ...body }
            : post
    })
    fs.writeFile('./data/posts.json', JSON.stringify(post), (err) => {
        if (err) throw err
    })
    res.json(post)
    // posts.push(posts, body)
})

app.listen(PORT, () => console.log("server started"));