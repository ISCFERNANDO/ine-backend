const fs = require("fs");
const envFiles = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file.slice(-5) === ".json";
  })
  .forEach(file => {
    let fileName = file.replace(".json", "");
    let name;
    if (fileName.indexOf(".") < 0) {
      name = "dev";
    } else {
      name = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
    }
    let content = require("./" + file);
    envFiles[name] = content;
  });

module.exports = envFiles;
