const express = require('express')

//Configuration

require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//Routes
app.get('/',function(req, res){
    res.send('Welcome to an Awesome App about Breads!')
})

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

//LISTEN
app.listen(PORT, function(){
    console.log('listening on port',PORT)
})