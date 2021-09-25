const express = require("express");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const congcuRouter = require("./routers/congcuRouter");
const khohangRouter = require("./routers/khohangRouter");
const path = require("path");
const daily1Router = require("./routers/daily1Router");
const daily2Router = require("./routers/daily2Router");
const cors = require("cors");
const phanphatRouter = require("./routers/phanphatRouter");
const bophankdRouter = require("./routers/bophankdRouter");

const app = express();

app.use(cors());
require("dotenv").config();
require("./database/config")();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

// loading routers
app.use("/api/users", userRouter);
app.use("/api/bophankd", bophankdRouter);
app.use("/api/sanpham", productRouter);
app.use("/api/congcu", congcuRouter);
app.use("/api/khohang", khohangRouter);
app.use("/api/daily1", daily1Router);
app.use("/api/daily2", daily2Router);
app.use("/api/phanphat", phanphatRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
