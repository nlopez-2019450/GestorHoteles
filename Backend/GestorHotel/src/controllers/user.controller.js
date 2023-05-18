"use strict";

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/create-jwt");


const adminApp = async (req, res) => {
  try {
    let user = new User();
    user.username = "ADMINAPP";
    user.email = "ADMINAPP@gmail.com";
    user.password = "123456";
    user.rol = "ADMINAPP";
    const userEncontrado = await User.findOne({ email: user.email });
    if (userEncontrado) return console.log("El administrador está listo");
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    user = await user.save();
    if (!user) return console.log("El administrador no se creó!");
    return console.log("El administrador está listo!");
  } catch (err) {
    throw new Error(err);
  }
};

const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).send({
          message: "Un usuario ya existe con este correo",
          ok: false,
          user: user,
        });
      }
      user = new User(req.body);

      const saltos = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, saltos);

      user = await user.save();

      const token = await generateJWT(user.id, user.username, user.email);
      res.status(200).send({
        message: `Usuario ${user.username} creado correctamente`,
        user,
        token: token,
      });
    } catch (err) {
      res.status(500).send({ message: "Error: " + err })
    }};

const readUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      res.status(404).send({ message: "No hay usuarios disponibles" });
    } else {
      res.status(200).json({ users: users, comentario: "Hola " });
    }
  } catch (err) {
    res.status(404).send({
      message: "No se pudo listar los usuarios",
      err,
    });
  }
};

const updateUser = async (req, res) => {
  if (req.user.rol === "ADMIN") {
    try {
      const id = req.params.id;
      const userEdit = { ...req.body };
      userEdit.password = userEdit.password
        ? bcrypt.hashSync(userEdit.password, bcrypt.genSaltSync())
        : userEdit.password;
      const userComplete = await User.findByIdAndUpdate(id, userEdit, {
        new: true,
      });
      if (userComplete) {
        const token = generateJWT(
          userComplete.id,
          userComplete.username,
          userComplete.email
        );
        return res.status(200).send({
          message: "Usuario actualizado correctamente",
          userComplete,
          token,
        });
      } else {
        res.status(404).send({
          message:
            "Este usuario no existe en la base de datos, verificar parametros",
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  } else {
    return res.status(200).send({
      message: "este usuario no tiene permisos para actualizar usuarios",
    });
  }
};

const deleteUser = async (req, res) => {
  if (req.user.rol === "ADMIN") {
    try {
      const id = req.params.id;
      const userDelete = await User.findByIdAndDelete(id);
      return res
        .status(200)
        .send({ message: "usuario eliminado correctamente", userDelete });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  } else {
    return res
      .status(500)
      .send({ message: "este usuario no tiene permisos de Administrador" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ ok: false, message: "El usuario no existe" });
    }
    const validPassword = bcrypt.compareSync(
      password /*el que nosotros enviamos*/,
      user.password /*password registrado en la base de datos*/
    );
    if (!validPassword) {
      return res
        .status(400)
        .send({ ok: false, message: "password incorrecto" });
    }

    const token = await generateJWT(user.id, user.username, user.email);
    res.json({
      ok: true,
      uid: user.id,
      name: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  adminApp,
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  loginUser
};
