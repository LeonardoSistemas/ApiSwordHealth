const logger = require("../../common/logsHandler");
const { getRequestMetadata } = require("../../common/commonsJs");

const { formatError } = require("../../common/ExceptionHandler");

module.exports = {
  errorHandler: async (err, req, res, next) => {
    const error = await formatError(err);
    logger.http(error.description, { body: req.body, method: req.method, label: "res", details: error.info });

    res.status(error.status).send(error);
  },
  inputLog: async function (req, res, next) {
    const { ip, origin, url } = getRequestMetadata(req);
    logger.http(`${req.method}`, { ip, origin, url, body: req.body, method: req.method, label: "req" });
    next();
  },
  outputLog: async function (req, res, next) {
    const { ip, origin, url } = getRequestMetadata(req);
    logger.http(`${req.method}`, { ip, origin, url, body: req.body, method: req.method, label: "res", status: res.statusCode });
  }
}
;
