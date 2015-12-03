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
  this.model('tag').update({_id: {$in: this.tags}}, { $push: {links: this._id} }, {multi:true}, function (err, results){
    if (err) {console.log(err);
    }else{
      console.log(results);
    }
  });
})

Link = mongoose.model('Link', linkSchema);



module.exports = Link;
