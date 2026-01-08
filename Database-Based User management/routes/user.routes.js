import express from 'express'
import { createUser, deleteUsers, editUsers, getUsers } from '../controllers/user.controller.js'

const router = express.Router()


router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .patch(editUsers)
    .delete(deleteUsers)


export default router 
