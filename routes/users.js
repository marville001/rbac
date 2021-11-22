const router = require("express").Router();
const {
  loginUser,
  registerUser
} = require("../controllers/auth");
const { getAllUser } = require("../controllers/users");
const { authenticated,hasPermission } = require("../middleware/auth");

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);
router.get("/all",authenticated, hasPermission("can_view_users"), getAllUser)

module.exports = router;
