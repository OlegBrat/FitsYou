const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  height: { type: Number, require: true },
  weight: { type: Number, require: true },
  legsLength: { type: Number, require: true },
  legsHipLine: { type: Number, require: true },

  bodyLength: { type: Number, require: true },
  bodyBust: { type: Number, require: true },
  bodySholder: { type: Number, require: true },
  bodySleeves: { type: Number, require: true }
});
module.exports = mongoose.model("Size", sizeSchema);
