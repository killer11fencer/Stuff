require('dotenv').config()
 const express = require('express')
 const massive = require('massive')
 const session = require('express-session')
 const {CONNECTION_STRING,SERVER_PORT} = process.env
 const ctrl = require('./Controller')

 const app = express()

app.use(express.static(`${__dirname}/../build`))
app.use(express.json())

massive(CONNECTION_STRING).then(dbInstance=>{
    app.set('db',dbInstance);
    app.listen(SERVER_PORT, ()=>console.log('listening on port',SERVER_PORT))}).catch(err=>console.log('err on port',err))

    app.post('/api/auth/register',ctrl.register)
    app.post('/api/auth/login',ctrl.login)
    app.get('./api/posts/:userid',ctrl.getUser)
    app.get('/aoi/post/:postid',ctrl.getPost)
    app.post('/api/post/:userid',ctrl.createPost)