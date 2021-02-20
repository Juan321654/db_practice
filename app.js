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

/////////////////////GET ALL USERS ////////////////////////////
app.get('/users', async(req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'Something went wrong '})
    }
})

//////////////GET A SPECIFIC USER BY ITS UUID, INCLUDING THEIR POSTS////////////
app.get('/users/:uuid', async(req,res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({ where: {uuid}, include: 'posts'})
        return res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

/////////////////////UPDATE USER//////////////////////////////
// {
//     "name": "mannny",
//     "email": "manny@email.com"
// }
app.put('/edit/:uuid', async(req, res) => {
    const uuid = req.params.uuid
    const { name, email } = req.body
    try {
        const user = await User.findOne({ where: { uuid } })
        user.name = name;
        user.email = email;

        await user.save()
        return res.json(user)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

///////////////////////DELETE USER/////////////////////////////
app.delete('/users/:uuid', async(req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({ where: {uuid}});
        await user.destroy()
        return res.json({ message: ' User deleted!'})
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
    //this is what we put on postman to connect with "User.findOne"
    const { user_uuid, content } = req.body
    try {
        const user = await User.findOne({ where: { uuid: user_uuid }})
        //user_id comes from the migration and we're using that name
        //because its what we called the foreign key
        const post = await Post.create({ content, user_id: user.id })
        return res.json(post)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

///////////GET POSTS WITH THE USER THAT CREATED IT////////
app.get('/posts', async(req, res) => {
    try {
        // this will get the post attaching the user model to it and making user in lowercase for convention
        // const posts = await Post.findAll({ include: [{ model: User, as: 'user'}]}) 
        //
        // by defining 'as: user' in the post model
        // you can just pass 'include: 'user'
        const posts = await Post.findAll({ include: 'user'});
        return res.json(posts)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})




app.listen(port, () => console.log(`Example app listening on port ${port}`))