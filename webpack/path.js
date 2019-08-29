const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// config after eject: we're in ./config/'
module.exports = {
  appPath: '/spa/',
  appProdPath: resolveApp('./build'),
  appDevPath: resolveApp('./build'),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.tsx"),
  appSrc: resolveApp("src"),
  resolveApp,
};
