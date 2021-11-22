const router = require("express").Router();
const {
  loginUser,
  registerUser
} = require("../controllers/auth");
const { getAllUser } = require("../controllers/users");
const { authenticated,hasPermission } = require("../middleware/auth");

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);
router.get("/all",hasPermission('can_view_listing'), getAllUser)

module.exports = router;