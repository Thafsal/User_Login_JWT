const { json } = require("express");
const UserJwt = require("../model/userModel");

//get all user details

const getUsers = async (req, res) => {
  try {
    const users = await UserJwt.find({});
    res.status(200) / json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//get a single user details

const getUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await UserJwt.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//create a single user

const createUser = async (req, res) => {
  try {
    const user = await UserJwt.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//update a user

const updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await UserJwt.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user found with the id ${id}` });
    }
    const updatedUser = await UserJwt.findById(id);
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
    const user = await UserJwt.findByIdAndDelete(id);
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
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
