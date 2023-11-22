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
// breads.get('/:arrayIndex', function(req, res){
//     res.render('Show', {
//         bread: Bread[req.params.arrayIndex]
    
//     })
// })

// SHOW
breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
      res.render('Show', {
        bread:Bread[req.params.arrayIndex]
      })
    } else {
      res.send('404')
    }
  })
  
module.exports = breads

