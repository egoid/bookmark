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
    var links = req.body.tags
    var tagArr = [];
    links.forEach(function(x,i,arr){
      tag.find({name: x}, function (err, tag){
        console.log(tag)
        if (err) return (err);
        if (tag.length === 0) {res.send('Looks like #' + x + ' is not an existing tag....try to add one?');
                                return(err)}
        // ^^^^^ error checking. If tag doesnt exist.                        
        newLink.tags.push(tag[0]._id)
        if (i == arr.length-1){
           newLink.save( function(err, data) {
            if (err) return(err);
            res.send('complete');
           });
        }
      })
    })
  }
});

router.delete('/', function(req, res){
  link.findByIdAndRemove(req.body._id, function(err, cool){
    if (err) return (err);
    res.send('deleted');
  });
})



module.exports = router;
