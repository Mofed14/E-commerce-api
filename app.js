// * async error handling and environment
require("dotenv").config({ path: "./env/.env" });
require("express-async-errors");

// * express
const express = require("express");
const app = express();

// rest of packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// * DB
const connectDB = require("./db/connect");

// * PORT Default
const port = process.env.PORT || 5000;

// * routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const reviewRouter = require("./routes/review");
const orderRouter = require("./routes/order");

// * Middlewares
const notFoundMiddleware = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { authenticateUser } = require("./middleware/authentication");

//configuaration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// 1- So first we run through all the Middlewares, which in this case,
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 600000000,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
// app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

// 2- then Express tries to hit all the routes. and if it doesn't find the root,
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", authenticateUser, reviewRouter);
app.use("/api/v1/orders", authenticateUser, orderRouter);

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
