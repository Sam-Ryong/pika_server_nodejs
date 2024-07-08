const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../sample_db/db.json");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const db = JSON.parse(fs.readFileSync(filePath));
  const user = db.users.find((user) => user.id === id);
  console.log(id);
  if (!user) {
    res.status(404).json(null);
  } else {
    res.json(user);
  }
});

router.post("/", async (req, res) => {
  const db = JSON.parse(fs.readFileSync(filePath));
  const data = req.body;
  if (db.users.find((user) => user.id === data.id)) {
    res.send("이미 DB에 존재하는 유저");
  } else {
    db.users.push({
      id: data.id,
      name: data.name,
      email: data.email,
      photoUrl: data.photoUrl,
      serverAuthCode: null,
      win: 0,
      lose: 0,
      tier: "unRanked",
      tierPoint: 0,
      friend: [],
    });
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file", err);
        res.status(500).send("Error saving data");
      } else {
        console.log("Data successfully saved to userData.json");
        res.send("Data successfully saved");
      }
    });
  }
});

module.exports = router;
