const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(404).send(
    "That`s an error.\nThe requested URL / was not found on this server.\nThat`s all we know.",
  );
});

module.exports = router;
