/**
 * Users Routes
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/register",
  [
    //middleware
    check("name", "Elname es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres").isLength({
      min: 6,
    }),
    validateFields
  ],
  createUser
);

router.post("/", [
  check("email", "Debe contener un email válido").isEmail(),
  check("password", "Debe contener al menos 6 letras").isLength({ min: 6 }),
  validateFields
], loginUser);

router.get("/renew", revalidateToken);

module.exports = router;
