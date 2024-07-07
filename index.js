const express = require("express");
const app = express();
const port = 3000;
const loginRouter = require("./routers/loginRouter.js");

app.use("/", loginRouter);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
