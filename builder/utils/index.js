import fsExtra from "fs-extra";
import os from "os";
import path from "path";
import fs from "fs";
import { DIST_PAGES_PATH, DIST_JS_PATH, DIST_ASSETS_PATH, DIST_PATH } from "../contants";

export const getRelativePath = (abs_file, _path) => {
  const name = path.parse(abs_file).name;
  const rest = abs_file.split(_path)[1];
  const parts = rest.split("/");
  parts.pop();
  const result = parts.join("/");
  return result + "/" + name;
};
export const recursiveApply = (initDirectory, callback = () => {}) => {
  if (typeof callback === "object") {
    var { applyToFile = () => {}, applyToDir = () => {} } = callback;
  } else {
    // is a function
    var applyToFile = callback,
      applyToDir = callback;
  }
  const recursive = (directory) =>
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        const abs_file = path.resolve(directory, file);
        const isDirectory = fs.statSync(abs_file).isDirectory();
        if (isDirectory) {
          applyToDir(abs_file);
          recursive(abs_file);
        } else {
          applyToFile(abs_file);
        }
      }
    });

  recursive(initDirectory);
};
export const forceWriteFile = (abs_file, content = "") => {
  const directory = path.dirname(abs_file);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.writeFileSync(abs_file, content);
};

export const getUpdatedTmp = (abs_path) => {
  var tmpFile = path.resolve(__dirname, "..", "_tmp.js");
  const isWin = os.platform() === 'win32'
  if(isWin) {
    abs_path = abs_path.split('\\').join('\\\\')
  }
  const content = `import '${abs_path}'`;
  fs.writeFileSync(tmpFile, content);
  return tmpFile;
};

export const deleteAllFiles = (abs_directory) => {
  fs.rmSync(abs_directory, { recursive: true });
};

export const cleanDirectories = () => {
    const dontDelete = [
        DIST_PAGES_PATH,
        DIST_JS_PATH,
        DIST_ASSETS_PATH,
    ]
    fsExtra.emptyDirSync(DIST_PAGES_PATH);
    fsExtra.emptyDirSync(DIST_JS_PATH);
    
    const files = fs.readdirSync(DIST_PATH)

    files.forEach(file => {
        file = path.resolve(DIST_PATH, file)
        if(!dontDelete.some(f=>file===f)) {
          if(fs.statSync(file).isDirectory()) {
            fs.rmSync(file, { recursive: true, force: true })
          } else {
            fs.unlinkSync(file)
          }
        }
    })
};
