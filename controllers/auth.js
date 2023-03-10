const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (request, response = response) => {
  const { name, email, password } = request.body;
  try {
    let user = await Users.findOne({ email });
    if (user) {
      return response.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo electrónico",
      });
    }

    user = new Users(request.body);

    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    // JWT Generated
    const token = await generateJWT(user.id, user.name);
    await user.save();
    response.status(201).json({
      ok: true,
      msg: "register",
      name,
      email,
      token,
      uuid: user.id,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Servicios no disponibles",
    });
  }
};

const loginUser = async (request, response = response) => {
  const { email, password } = request.body;
  try {
    const user = await Users.findOne({ email });
    if (user === null) {
      return response.status(400).json({
        ok: false,
        msg: "El correo no esta registrado",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return response.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    // JWT Generated
    const token = await generateJWT(user.id, user.name);

    return response.status(200).json({
      ok: true,
      msg: "Login completed",
      uuid: user.id,
      name: user.name,
      token,
    });
    //Confirm password
  } catch (error) {
    response.status(500).json({
      ok: false,
      msg: "Servicios no disponibles",
    });
  }
};

const revalidateToken = async (request, response = response) => {
  const uid = request.uid;
  const name = request.name;

  const token = await generateJWT(uid, name);
  response.json({
    ok: true,
    msg: "revalidate",
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
