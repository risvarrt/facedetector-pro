const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const e = require('express');
const { entries } = require('lodash');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'aachi2014',
      database : 'facedetection'
    }
  });

const app= express();
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/',(req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req,res) =>{signin.handlesignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=>{
    const { id }=req.params;
    //let found =false;
    db.select('*').from('users').where({id
    }).then(user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('Not Found')
        }   
    })
    .catch(err => res.status(400).json('Error getting user'))
    // if(!found){
    //     res.status(400).json('not found');
    // }
})

app.put('/image',(req,res) => {image.handleImage(req, res,db)})
app.post('/imageurl',(req,res) => {image.handleApiCall(req, res)})


app.listen(3000, ()=> {
    console.log('App is perfect');
})



