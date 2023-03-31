// * async error handling and environment
require("dotenv").config({ path: "./env/.env" });
require("express-async-errors");

// * express
const express = require("express");
const app = express();

// rest of packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// * DB
const connectDB = require("./db/connect");

// * PORT Default
const port = process.env.PORT || 5000;

// * routes
const authRouter = require("./routes/auth");

// * Middlewares
const notFoundMiddleware = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");

// 1- So first we run through all the Middlewares, which in this case,
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  // console.log(req.cookies);

  res.send("Hello Ecommerce");
});

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  // Beacuse signed: true I found the cookie in signedCookies
  console.log(req.signedCookies);
  res.send("Hello Ecommerce");
});

// 2- then Express tries to hit all the routes. and if it doesn't find the root,
app.use("/api/v1/auth", authRouter);

// * Handling errors
// 3-  you automatically end up over here. That's very important. That's the 404.
app.use(notFoundMiddleware);
//  why don't we place the errorHandlerMiddleware one before notFoundMiddleware?
// Well, because by express rules, we need to set this one as the last one. And when it comes to invoking this one, well, this middleware, actually, we invoke it from the successful request.
app.use(errorHandlerMiddleware);

// Start Listening the requst
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};
start();
