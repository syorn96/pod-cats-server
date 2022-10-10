const express = require('express')
const router = express.Router()
const db = require('../../models')

// GET /cats
    router.get('/', async (req,res)=> {
        try{
            const allCats = await db.Cat.find({})
            res.json(allCats)
        }catch(err){
            console.log(err)
            res.status(500).json({ message: 'Internal server error'})
        }
    })

// GET /cats/id/:id
router.get('/id/:id', async (req,res)=> {
    try{
        const cat = await db.Cat.findById(req.params.id)
        const commentIds = cat.comments.map(comment=> {
            return comment._id
        })
        const comments = await db.Comment.find({_id: {$in : commentIds}})
        res.json({
            cat: cat,
            comments: comments
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error'})
    }
})

// POST /cats
router.post('/new', async (req,res)=> {
    try{

        //--------OLD STUFF-------
        // const newCat = await db.Cat.create(req.body)
        // const foundUser = await db.User.findById(res.locals._id)
        // newCat.user.push(foundUser)
        // res.status(201).json(newCat)



        //------NEW STUFF (Doesnt work yet)-------
        // let foundUser = await db.User.findById(req.body.userId)
        // // db.User.update({ "cats" : "test"}, {$push: {achieve"": 95 }})
        // db.User.updateOne({
        //     _id: req.body.userId
        // }, {
        //     $set: {
        //         cats: req.id
        //     }
        // })

        // db.User.save()

        //Information sent from the front end
        console.log(req.body)

        //The user that clicked "Add to profile"
        let foundUser = await db.User.findById(req.body.userId)
        console.log(foundUser)

        //How do we save the req.body.id to the cats[] field in the Users table?????? 



        // await foundUser.cats.push(req.id)

    


    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error'})
    }
})

//POST /cats/id/:id/comment
router.post('/id/:id/comment', async (req,res)=> {
    try{

        const newComment = await db.Comment.create({
            header: req.body.header,
            content: req.body.content
        })
        const foundCat = await db.Cat.findById(req.params.id)

        newComment.cats.push(foundCat)
        
        foundCat.comments.push(newComment)

        await newComment.save()
        await foundCat.save()
        res.status(201).json(foundCat)

    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error'})
    }
    
})
// PUT /cats/id/:id
router.put('/id/:id', async (req,res)=> {
    try{
        const options = { new : true }
        const updatedCat = await db.Cat.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(updatedCat)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error'})
    }
})

//DELETE /cats/id/:id
router.delete('/id/:id', async (req,res)=> {
    try{
        await db.Cat.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error'})
    }
})
module.exports = router