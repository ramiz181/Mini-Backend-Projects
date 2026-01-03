import express from 'express'
import fs from 'fs'
import tasks from './task.json' with {type: 'json'}

const PORT = 3000
const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/api/tasks', (req, res) => {
    res.send(tasks)
})

app.get('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id)
    console.log(task);

    return res.json(task)
})

app.patch('/api/tasks/:id', (req, res) => {

    const id = Number(req.params.id);
    const body = req.body

    const updatedTask = tasks.map(task => {
        return id === task.id
            ? { ...task, ...body }
            : task
    })
    console.log(updatedTask);

    fs.writeFile('task.json', JSON.stringify(updatedTask), () => {
        if (err) throw err
    })

    res.send("task updated")
})

app.post('/api/tasks', (req, res) => {
    const body = req.body

    // const task = { ...tasks, ...body }
    tasks.push({ ...body, id: tasks.length + 1 })

    fs.writeFile('task.json', JSON.stringify(tasks), (err) => {
        if (err) throw err
    })

    res.json({ message: "task created" });


})

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const updatedTask = tasks.filter(task => task.id !== id)

    fs.writeFile('task.json', JSON.stringify(updatedTask), (err) => {
        if (err) throw err
    })

    res.json({ message: "task deleted" })

})

app.listen(PORT, () => console.log("server started successfully"));