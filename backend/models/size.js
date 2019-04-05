const mongoose = require('mongoose');
const sizeSchema= mongoose.Schema({
id:{type: String, require: true },
height:{type: Number, require: true},
weight:{type: Number, require: true},
pants = {
  length:{type: Number, require: true},
  hipLine:{type: Number, require: true},
},
shirt={
  length:{type: Number, require: true},
  bust:{type: Number, require: true},
},
coat={
  sholder:{type: Number, require: true},
  sleeves:{type: Number, require: true}
}
}
)
module.exports =mongoose.model("Size", sizeSchema);
