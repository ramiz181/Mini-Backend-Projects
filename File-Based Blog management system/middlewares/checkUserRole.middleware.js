import users from './../data/users.json' with {type: 'json'}
import posts from './../data/posts.json' with {type: 'json'}

export const checkUserRole = (req, res, next) => {

    const userID = req.params.id

    const author = posts.find(post => post.id === userID)
    const user = users.find(user => user.id === author.authorID)

    if (user.role === "admin" || user.role === "user") {
        next()
    }
    else {
        res.json({ message: "Admin or author login required" })
    }

    // console.log(author);
    // res.send(user)
    // next();
}