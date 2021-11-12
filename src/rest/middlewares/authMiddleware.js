const jwtToken = require("../../infra/JwtToken");

const {
  formatError,
  UnauthorizedError
} = require("../../common/ExceptionHandler");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new UnauthorizedError("Missing authorization header!");

    const tokenDecodedObj = await jwtToken.decode(token);
    req.userTokenDecoded = await tokenDecodedObj.tokenDecoded;
    next();
  } catch (error) {
    if (error) {
      const err = await formatError(error);
      err.status = 401;
      return res.status(err.status)
        .json({ error: `Authentication Error :  ${err.description}` });
    }
  }
};
