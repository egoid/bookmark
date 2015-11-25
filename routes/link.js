'use strict';

let express = require('express');
let router = express.Router();
let link = require('../models/link');
let tag = require('../models/tag');

router.get('/', function(req, res){
  link.find({}, function(err,data){
    if (err) return (err);
    console.log(data);
    res.send(data);
  });
})

router.post('/', function(req, res) {
  var newLink = new link({name: req.body.name , url: req.body.url})
  if (req.body.tags){
    var links = req.body.tags.match(/\w+/g);
    links.forEach(function(id){
      newLink.tags.push(id);
    })
  }
   newLink.save( function(err, data) {
    if (err) return(err);
    
    res.send(data);
   });
});

router.delete('/', function(req, res){
  link.findByIdAndRemove(req.body._id, function(err, cool){
    if (err) return (err);
    res.send('deleted');
  });
})



module.exports = router;
