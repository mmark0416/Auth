import jwt from "jsonwebtoken";

export const createJWT = (payloads) => {
  const token = jwt.sign(payloads, process.env.JWT_SECRET);
  return token;
};

export const isTokenValid = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);

export const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payloads: { user } });
  const refreshTokenJWT = createJWT({ payloads: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  const tenSec = 1000 * 5;
  const oneMin = 1000 * 10;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + tenSec),
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneMin),
  });
};
