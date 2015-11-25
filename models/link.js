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
// ===== OLD MIDDLEWARE =====
// linkSchema.post('save', function(next){
//   console.log('hello')
//   var id = this._id;
//   this.tags.forEach(function(x){
//     tag.findByIdAndUpdate(x, {links: id}, function(err, data){
//       if (err) return (err);
//     });
//   });
// })

Link = mongoose.model('Link', linkSchema);



module.exports = Link;
