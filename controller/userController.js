const { json } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const User = require("../model/userModel");

//home route
const renderHome = (req, res) => {
  res.render("index");
};


//get all user details

const getUserlogin =  (req, res) => {
  res.render("users/signin");
};
//get a single user details

const getUsersignup =  (req, res) => {
  res.render("users/signup")
};

//create a single user

const createUser = async (req, res) => {
  try {
    const { name , email,password } =req.body

    const existingUser = await User.findOne({email})

    if(existingUser){
      return res.status(400).json({error: "User already exists",message:"Email is already registerd"})
    }

    const user = await User.create({name ,email,password});

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password ,salt)

    await user.save()

    res.status(201).json({message:"User registered successfully",user});
    res.render('signin')
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//user signup

const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isValidPassword(password)) {
      return res.status(404).json({
        error: "Authentication failed",
        message: "Invalid email or password",
      });
    }

    //JWT

    const token = jwt.sign({ userId: user._id }, "SecretKey", {
      expiresIn: "60s",
    });
    res.status(200).json({ message: "logged in succesfully", user, token });
    res.render('signup')
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.mesage });
  }
};

//update a user

const updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user found with the id ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//delete user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: `No detail with the id${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserlogin,
  getUsersignup,
  createUser,
  updateUser,
  deleteUser,
  userSignup,
  renderHome
};
