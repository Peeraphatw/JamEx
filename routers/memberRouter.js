const express = require("express");
const router = express.Router();
const { register, members, deleteMember } = require("../controller/members");

router.route("/").get(members).post(register);
router.route("/:id").delete(deleteMember);
module.exports = router;
