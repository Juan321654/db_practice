const express = require('express');
const { User, Post } = require('./models')
const app = express()
const port = 3000

app.use(express.json())

//////////////// CREATE USER //////////////////////////
// {
//     "name": "ewrqwr",
//     "email": "tqwerwqm@email.com",
//     "role": "user",
//     "boss": false,
//     "user_status": "huuuuuuuuuu"
// }
app.post('/users', async (req, res) => {
    const { name, email, role, boss, user_status } = req.body;
    try {
        const user = await User.create({ name, email, role, boss, user_status});
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

//////////////// CREATE POST ///////////////////////////
// {
//     "content": "bla bla bla",
//     "user_uuid": "e4cf5a4d-548f-4715-9feb-3bfeac87eb1b"
// }
app.post('/posts', async(req, res) => {
    const { user_uuid, content } = req.body
    try {
        const user = await User.findOne({ where: { uuid: user_uuid }})
        const post = await Post.create({ content, user_id: user.id })
        return res.json(post)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})




app.listen(port, () => console.log(`Example app listening on port ${port}`))