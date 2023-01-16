/**
 * Users Routes
 * host + /api/auth
 */

const { Router } = require("express");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

const router = Router();

router.post("/register", createUser);

router.post("/", loginUser);

router.get("/renew", revalidateToken);

module.exports = router;
