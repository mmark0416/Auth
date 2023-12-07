import { attachCookiesToResponse, isTokenValid } from "../utils/jwt.js";
import Token from "../models/Token.model.js";
import { UnauthenticatedError } from "../errors/CustomErrors.js";

export const authenticationUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.payloads.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    console.log(payload);
    console.log(payload.payloads.user._id);
    console.log(payload.payloads.refreshToken);

    const existingToken = await Token.findOne({
      user: payload.payloads.user._id,
      refreshToken: payload.payloads.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    attachCookiesToResponse({
      res,
      user: payload.payloads.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.payloads.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
