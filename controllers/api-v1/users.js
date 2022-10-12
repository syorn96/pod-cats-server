const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const authLockedRoute = require('./authLockedRoute')


// GET /users - test endpoint
router.get('/', async (req, res) => {
  try{
    // console.log(res.locals.user)
    // const findUsers = await db.User.find({id: req.body.userId})
    // res.json(findUsers)
    res.json({ msg: 'welcome to the users endpoint' })
  }catch(err){
    console.log(err)
  }
})

router.get('/:userId', async (req, res) => {
  try{
    const user = await db.User.find({_id: req.params.userId}).populate('cats')
    res.json({ user: user})
  }catch(err){

  }
})

// POST /users/register - CREATE new user
router.post('/register', async (req, res) => {
  try {
    // check if user exists already
    const findUser = await db.User.findOne({
      email: req.body.email
    })

    // don't allow emails to register twice
    if(findUser) return res.status(400).json({ msg: 'email exists already' })
  
    // hash password
    const password = req.body.password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
  
    // create new user
    const newUser = new db.User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
  
    await newUser.save()

    // create jwt payload
    const payload = {
      name: newUser.name,
      email: newUser.email, 
      id: newUser.id,
      cats: []
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
  try {
    // try to find user in the db
    const foundUser = await db.User.findOne({
      email: req.body.email
    }).populate('cats')

    const noLoginMessage = 'Incorrect username or password'

    // if the user is not found in the db, return and sent a status of 400 with a message
    if(!foundUser) return res.status(400).json({ msg: noLoginMessage })
    
    // check the password from the req body against the password in the database
    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password)
    
    // if provided password does not match, return an send a status of 400 with a message
    if(!matchPasswords) return res.status(400).json({ msg: noLoginMessage })

    // create jwt payload
    const payload = {
      name: foundUser.name,
      email: foundUser.email, 
      id: foundUser.id,
      cats: foundUser.cats
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token })
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})

// PUT /users/login -- validate login credentials
router.put('/:id', async (req, res) => {
  try {
    
    // console.log('hiiiiiiiii', req.params.id)
    // try to find user in the db
    const foundUser = await db.User.findOne({
      _id: req.params.id
    })
    console.log(foundUser)
    const noLoginMessage = 'Incorrect username or password'

    // if the user is not found in the db, return and sent a status of 400 with a message
    if(!foundUser) return res.status(400).json({ msg: noLoginMessage })
    
    // check the password from the req body against the password in the database
    // console.log('PASSWORD???', req.body.password)
    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password)
    console.log('MATCHPASSWORD',matchPasswords)
    
    // if provided password does not match, return an send a status of 400 with a message
    if(!matchPasswords) return res.status(400).json({ msg: noLoginMessage })

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12)
    const options = { new : true }
    const editUser = await db.User.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email
    }, options)

    console.log('EDITUSER', editUser)
    // await db.User.save()
    // create jwt payload
    const payload = {
      name: editUser.name,
      email: editUser.email, 
      id: editUser.id,
      cats: editUser.cats
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token })
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})

router.delete('/:id', async (req,res)=> {
  try{
    await db.User.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
}catch(err){
    console.log(err)
    res.status(500).json({ message: 'Internal server error'})
}
})

// GET /auth-locked - will redirect if bad jwt token is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
  res.json( { msg: 'welcome to the private route!' })
})

module.exports = router