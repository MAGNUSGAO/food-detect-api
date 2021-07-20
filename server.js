const express = require('express');
const cors = require('cors')
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',   // local host
      user : 'magnusgao',
      password : '',
      database : 'smart-brain'
    }
  });

//always use body parser to parse JSON
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors())

// db.select('*').from('users').then(data => {
//     console.log(data)
// })




const database = {
    users: [{
        id:'123',
        name:'john',
        email:'john@gmail.com',
        password:'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id:'124',
        name:'Sally',
        email:'Sally@gmail.com',
        password:'bananas',
        entries: 0,
        joined: new Date()
    }
]
}

app.get('/', (req, res) => {
    res.send({"Message": "This is working"})
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) 

// ':id' means the person can enter any id
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.listen(3000, ()=> {
    
})

/*
/ -> res = this is working
/signin -> POST = success/fail
/register -> POST = user object
/profile/:userId -> GET = user object
/image --> PUT (update) --> user

*/

// NOTE CORS is used