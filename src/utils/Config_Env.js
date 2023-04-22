const ENVIRONMENT = require("../resource/env/Env.js");


export default (() => {
  let envObj;
  const envValue = process.env.ENV;
  const env = envValue.toString().toUpperCase();
  switch (env) {
    case "STG":
      envObj = ENVIRONMENT.STG;
      return envObj
  }
})();
