const express = require("express");
const app = express();
const port = 3001;
const userRouter = require("./routers/userRouter.js");
const rankingRouter = require("./routers/rankingRouter.js");
const gameRouter = require("./routers/gameRouter.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/api/user", userRouter);
app.use("/api/rank", rankingRouter);
app.use("/api/game", gameRouter);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
