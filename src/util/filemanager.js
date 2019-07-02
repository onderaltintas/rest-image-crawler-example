/**
 * Creates an instance of FileManager.
 * @class
 * @classdesc Manages file activities.
 * Önder ALTINTAŞ 18.01.2016
 */
var FileManager = function () {
  const fs = require("fs");

  /**
  * Creates directory.
  * @param {string} path - Directory to be created.
  * @param {string} mask - Rights. Chmod like mask.
  * @param {function} callback - A Callback function to execute after directory is created.
  */
  this.ensureDirectoryExists = function (path, mask, callback) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
      callback = mask;
      mask = 7777;
    }

    fs.mkdir(path, mask, function (err) {
      if (err) {
        if (err.code == 'EEXIST') callback(null); // ignore the error if the folder already exists
        else callback(err); // something else went wrong
      } else callback(null); // successfully created folder
    });
  };

  /**
  * Writes data to file with given filename, if user requires, gzips the file the same folder.
  * @param {string} path - File path.
  * @param {string} data - Data content to be written inside the file.
  */
  this.writeToImageFile = function (path, data) {
    fs.writeFile(path, data, 'binary', function (err) {
      if (err) {
        console.log(err.message);
        console.log("problemo on writing file.");
      }
    });
  };

  /**
  * Writes data to file with given filename, if user requires, gzips the file the same folder.
  * @param {string} path - File path.
  * @param {string} data - Data content to be written inside the file.
  */
  this.writeToFile = function (path, data) {
    fs.exists(path, function (exists) {
      if (exists) {
        fs.appendFile(path, data, "utf8", function (err) {
          if (err) {
            console.log(err.message);
            console.log("problemo problemo on appending file");
          }
        });
      } else {
        fs.writeFile(path, data, "utf8", function (err) {
          if (err) {
            console.log(err.message);
            console.log("problemo problemo on writing file");
          }
        });
      }
    });
  };


  /**
  * Loads file to json objects.
  * @param {string} path - File path.
  * @param {function} callback - A callback function to be executed after progress is done.
  */
  this.loadFile = function (path, callback) {
    var exists = fs.existsSync(path);
    if (exists) {
      var fileContent = fs.readFileSync(path).toString();
      callback(fileContent);
    }
    else {
      callback();
    }
  };

  /**
  * Deletes a file with given file path.
  * @param {string} filePath - Path of the file.
  */
  this.deleteFile = function (filePath) {
    fs.unlink(filePath, function (err) {
      if (err) throw err;
    });
  };
}

module.exports = FileManager;

