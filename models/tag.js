'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tag;

let tagSchema = Schema({
  name: { type: String, required: true, unique: true },
  links: [{ type: Schema.Types.ObjectId, ref: 'Link' }]
 });

tag = mongoose.model('tag', tagSchema);

module.exports = tag;
