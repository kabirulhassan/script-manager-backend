const express = require("express");
const router = express.Router();
const {
  getScripts,
  getScript,
  createScript,
  updateScript,
  deleteScript,
} = require("../controllers/scriptController");

router.use(require("../middleware/tokenHandler"));

router.route("/").get(getScripts).post(createScript);

router.route("/:id").get(getScript).put(updateScript).delete(deleteScript);


module.exports = router;
