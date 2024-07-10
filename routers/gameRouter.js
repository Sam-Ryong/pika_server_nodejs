const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../sample_db/db.json");

router.post("/", async (req, res) => {
  const db = JSON.parse(fs.readFileSync(filePath));
  const winnerId = req.body.winner;
  const loserId = req.body.loser;
  var winner = db.users.find((user) => user.id === winnerId);
  var loser = db.users.find((user) => user.id === loserId);
  console.log(winner);
  console.log(loser);
  if (winner != null && loser != null) {
    winner.tierPoint = winner.tierPoint + 20;
    winner.win = winner.win + 1;
    loser.tierPoint = loser.tierPoint - 20;
    loser.lose = loser.lose + 1;
    console.log(winner.tierPoint);
    console.log(loser.tierPoint);
    if (0 < winner.tierPoint < 1000) {
      winner.tier = "브론즈";
    } else if (1000 <= winner.tierPoint < 1300) {
      winner.tier = "실버";
    } else if (1300 <= winner.tierPoint < 1500) {
      winner.tier = "골드";
    } else if (1500 <= winner.tierPoint < 1700) {
      winner.tier = "플레티넘";
    } else if (1700 <= winner.tierPoint < 1900) {
      winner.tier = "다이아몬드";
    } else if (1900 <= winner.tierPoint) {
      winner.tier = "마스터";
    }

    if (0 < loser.tierPoint < 1000) {
      loser.tier = "브론즈";
    } else if (1000 <= loser.tierPoint < 1300) {
      loser.tier = "실버";
    } else if (1300 <= loser.tierPoint < 1500) {
      loser.tier = "골드";
    } else if (1500 <= loser.tierPoint < 1700) {
      loser.tier = "플레티넘";
    } else if (1700 <= loser.tierPoint < 1900) {
      loser.tier = "다이아몬드";
    } else if (1900 <= loser.tierPoint) {
      loser.tier = "마스터";
    }

    updateJsonById(db.users, winnerId, winner);
    updateJsonById(db.users, loserId, loser);
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file", err);
        res.status(500).send("Error saving data");
      } else {
        console.log("Data successfully saved to userData.json");
        res.send("Data successfully saved");
      }
    });
  } else {
    res.send("승부 데이터 저장 실패");
  }
});
function updateJsonById(array, id, newData) {
  const index = array.findIndex((item) => item.id === id);
  if (index !== -1) {
    array[index] = { ...array[index], ...newData };
    return array[index];
  } else {
    throw new Error(`ID ${id} not found`);
  }
}
module.exports = router;
