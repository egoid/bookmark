'use strict';

let express = require('express');
let router = express.Router();
let tag = require('../models/tag')

router.get('/', function(req, res){
  tag.find({}, function(err,tags){
    if (err) return (err);
    tag.populate(tags, {path:'links'}, function (err, done){
      if(err) return console.log(err)
      res.send(done);
    })
  })
})

// router.get('/:id', function(req, res){
//   var id = req.params.id;
//   tag.findById(id, function(err,data){
//     if (err) return (err);
//     // console.log(data)
//     res.send(data);
//   })
// })

router.post('/', function(req, res){
  var newTag = new tag(req.body);
  newTag.save( function(err, tag){
    if (err) return (err);
    res.send(tag);
  });
});

router.put('/', function(req,res){
  tag.findByIdAndUpdate(req.body._id, {name: req.body.name}, function(err, name){
    if (err) return (err);
    res.send(name);
  })
});

router.delete('/:id', function(req, res){
  var path = req.path.slice(1);
  tag.findByIdAndRemove(path, function(err, del){
    if (err) return (err);
    res.send(del._id);
  })
})

module.exports = router;
