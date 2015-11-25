'use strict';

let express = require('express');
let router = express.Router();
let tag = require('../models/tag')

router.get('/', function(req, res){
  tag.find({}, function(err,data){
    if (err) return (err);
  res.send(data);
  })
})

router.post('/', function(req, res){
  var newTag = new tag(req.body);
  newTag.save( function(err, tag){
    if (err) return (err);
    res.send(tag._id);
  });
});

router.put('/', function(req,res){
  tag.findByIdAndUpdate(req.body._id, {name: req.body.name}, function(err, name){
    if (err) return (err);
    res.send(name);
  })
});

router.delete('/', function(req, res){
  tag.findByIdAndRemove(req.body._id, function(err, del){
    if (err) return (err);
    res.send('deleted');
  })
})


module.exports = router;
