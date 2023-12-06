const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

//index
breads.get('/',function(req, res){
  Bread.find()
    .then(foundBreads => {
     res.render('index',{
      breads: foundBreads,
      title: 'Index Page'
     })
    })
});

breads.get('/new', (req, res) => {
    res.render('new')
})


// EDIT
// breads.get('/:id/edit', (req, res) => {
//     Bread.findById(req.params.id)
//     .then(foundBread => {
//       res.render('edit', {
//         bread:foundBread
//       })
//     })


// //   res.render('edit', {
// //     bread: Bread[req.params.indexArray],
// //     index: req.params.indexArray
// //   })
// })
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id) 
    .then(foundBread => { 
      res.render('edit', {
        bread: foundBread 
      })
    })
})


// SHOW
// breads.get('/:arrayIndex', function(req, res){
//     if (Bread[req.params.arrayIndex]) {
//       res.render('Show', {
//         bread:Bread[req.params.arrayIndex],
//         index: req.params.arrayIndex,
//       })
//     } else {
//       .catch(err => {
//         res.send
//       })
//       // res.render('404')
//     }
//   })

//   breads.get('/:id', (req, res) => {
//     Bread.findById(req.params.id)
//         .then(foundBread => {
//             res.render('show', {
//                 bread: foundBread
//             })
//         })
// })

breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      const bakedBy = foundBread.getBakedBy()
      console.log(bakedBy)
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })
})


// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    // Bread.push(req.body)
    Bread.create(req.body)
    res.redirect('/breads')
  })
  



// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread => {
    res.status(303).redirect('/breads')
  })

  // Bread.splice(req.params.indexArray, 1)
  // res.status(303).redirect('/breads')
})




// UPDATE
// breads.put('/:arrayIndex', (req, res) => {
//   if(req.body.hasGluten === 'on'){
//     req.body.hasGluten = true
//   } else {
//     req.body.hasGluten = false
//   }
//   // Bread[req.params.arrayIndex] = req.body
//   Bread.findIdAndUpdate(req.params.id, req.body, {new:true})
//   .then(updateBread => {
//     console.log(updateBread)
//     res.redirect(`/breads/${req.params.arrayIndex}`)
//   })

// })

breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})

module.exports = breads


  