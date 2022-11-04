const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");
const verifyToken = require("../middleware/auth");

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.get("/", verifyToken, authCtrl.accessToken);

router.get("/getUser", verifyToken, authCtrl.getUser);

router.get("/getGenderUser", verifyToken, authCtrl.getGenderUser);

router.get("/getUser/:username", verifyToken, authCtrl.getOneUser);

router.put("/updateUser/:id", verifyToken, authCtrl.updateUser);

router.delete("/:id", verifyToken, authCtrl.deleteUser);

module.exports = router;
