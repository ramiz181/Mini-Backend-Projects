import users from './../data/users.json' with {type: 'json'}
import posts from './../data/posts.json' with {type: 'json'}

export const requireAuthorAuth = (req, res, next) => {

    const userID = req.params.id;

    const author = posts.find(post => post.id === userID)
    const user = users.find(user => author.authorID === user.id)

    if (user.status === "online") {
        next()
    }
    else {
        res.json({ message: "Login first" })
    }
    // return post.id === userID
    // if (post.id === userID) {
    //     return post.authorID
    // }
    // })
    // console.log(author.authorID);


    //         ? user.status === "online"
    //         : false
    // })
    // console.log("Line 23", sss);

}