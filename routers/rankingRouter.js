const express = require("express");
const fs = require("fs");
const router = express.Router();

const path = require("path");

const filePath = path.join(__dirname, "../sample_db/db.json");

router.get("/", (req, res) => {
  const db = JSON.parse(fs.readFileSync(filePath));
  const sorted = db.users.sort((a, b) => b.tierPoint - a.tierPoint);
  if (db.users.length < 50) {
    res.send(sorted);
  } else {
    res.send(sorted.slice(0, 50));
  }
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const db = JSON.parse(fs.readFileSync(filePath));
  const sorted = db.users.sort((a, b) => b.tierPoint - a.tierPoint);
  let i = 0;
  let ranking;
  for (i; i < sorted.length; i++) {
    if (sorted[i].id == id) {
      ranking = i;
      break;
    }
  }
  if (db.users.length < 10) {
    res.send([0, sorted]);
  } else {
    if (ranking > sorted.length - 10) {
      res.send([sorted.length - 10, sorted.slice(sorted.length - 10)]);
    } else {
      const sliced = sorted.slice(ranking - 5, ranking + 4);
      res.send([ranking - 5, sliced]);
    }
  }
});

module.exports = router;
