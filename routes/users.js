const router = require("express").Router();
const {
  loginUser,
  addUser,
  updateUser,
} = require("../controllers/usersController");

router.post("/auth/login", loginUser);
router.post("/auth/register", addUser);
router.put("/update/id", updateUser);

module.exports = router;
