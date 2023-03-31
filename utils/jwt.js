const jwt = require("jsonwebtoken");
const { trusted } = require("mongoose");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = async (token) => {
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  return decode;
};

const attachCookiesToResponse = (res, user) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 24 * 60 * 60; // millseconds

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: trusted,
  });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
