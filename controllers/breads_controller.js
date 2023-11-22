const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

//index
breads.get('/',function(req, res){
    res.render('index',  {
        breads: Bread
         }
    )
    // res.send(Bread)
});

//SHOW
breads.get('/:arrayIndex', function(req, res){
    res.send(Bread[req.params.arrayIndex])
})

module.exports = breads