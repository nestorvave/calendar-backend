const { response } = require("express");

const createUser = (request, response = response) => {
  response.json({
    ok: true,
    msg: "register",
  });
};

const loginUser = (request, response = response) => {
  response.json({
    ok: true,
    msg: "login",
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
