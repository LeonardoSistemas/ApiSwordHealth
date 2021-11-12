function loadenv () {
  /* const env = process.env.NODE_ENV.trim(); */
  const env = "dev";
  /* if (env === "dev") return ".env.dev";
  else if (env === "hml") return ".env.hml";
  else if (env === "prod") return ".env"; */
  return `.env.${env}`;
}

require("dotenv").config({
  path: loadenv()
});
process.setMaxListeners(Infinity);
/* const logger = require("./common/logsHandler.js"); */

const app = require("./app");
app.listen(process.env.PORT, () => {
  console.log(
    ("\x1b[33m%s\x1b[0m",
    `ENV: ${process.env.NODE_ENV}  URL: ${process.env.URL} PORT: ${process.env.PORT}`)
  );
});
