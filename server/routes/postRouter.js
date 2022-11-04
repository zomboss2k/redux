const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const verifyToken = require("../middleware/auth");

router.get("/getPost", verifyToken, postCtrl.getPost);

router.post("/createPost", verifyToken, postCtrl.createPost);

router.put("/updatePost/:id", verifyToken, postCtrl.updatePost);

router.delete("/deletePost/:id", verifyToken, postCtrl.deletePost);

module.exports = router;
