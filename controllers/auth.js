const { response } = require("express");
const Users = require("../models/Users");

const createUser = async (request, response = response) => {
  const { name, email, password } = request.body;
  try {
    const user = new Users(request.body);
    await user.save();
    response.status(201).json({
      ok: true,
      msg: "register",
      name,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      msg: "Servicios no disponibles",
    });
  }
};

const loginUser = (request, response = response) => {
  const { email, password } = request.body;

  response.status(201).json({
    ok: true,
    msg: "register",
    name,
    email,
    password,
  });
};

const revalidateToken = (request, response = response) => {
  response.json({
    ok: true,
    msg: "revalidate",
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
