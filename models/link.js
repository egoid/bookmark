'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let tag = require('./tag');


let Link;

let linkSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'tag'}]
 });

linkSchema.post('save', function(next){
  // console.log(this.tags);
  // this.model('tag').find({_id: {$in: this.tags}}, function (err, d){
  //   if (err) console.log(err);
  //   console.log(d);
  // })
  var id = this._id;
  this.tags.forEach(function(x){
    tag.findByIdAndUpdate(x, {links: id}, function(err, data){
      if (err) return (err);
    })
  })
  next;
  // this.model('tag').update({_id: {$in: this.tags}}, {$push: {links: this._id}, next } );
  // console.log(typeof(this.tags))
})

Link = mongoose.model('Link', linkSchema);



module.exports = Link;
