'use strict';

let express = require('express');
let router = express.Router();
let link = require('../models/link');
let tag = require('../models/tag');

router.get('/', function(req, res){
  link.find({}).populate('tags').exec(function(err,data){
    // added populate in the route
    if (err) return (err);
    res.send(data);
  });
})

router.post('/', function(req, res) {
  var newLink = new link({name: req.body.name , url: req.body.url})
  // begin tag populating and ref pushing
  if (req.body.tags){
    newLink.tags = req.body.tags;
  }
  newLink.save( function(err, data) {
    if (err) return(err);
    res.send(data);
  });
  
});

router.delete('/:id', function(req, res){
  var path = req.path.slice(1);
  link.findByIdAndRemove(path, function(err, cool){
    if (err) return (err);
    res.send(cool._id);
  });
})



module.exports = router;
