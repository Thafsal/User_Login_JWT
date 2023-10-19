const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
    trim: true,
    minlength: [3, "Please provide a valid name"],
    maxlength: [15, "Name cannot be morethan 15 charectors"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ]
  },
  password:{
    type:String,
    required:true,
    minlength:[6,"Password must be atleast 6 charectors"],
    trim:true
}
},{
    timestamps:true
  });

  userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  const User = mongoose.model("user",userSchema)

  module.exports = User