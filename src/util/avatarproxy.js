/**
 * Creates an instance of AvatarProxy.
 * @class
 * @classdesc Proxy class that gets data from internet 
 * and creates local file cache. 
 * Önder ALTINTAŞ 01.07.2019
 */
var AvatarProxy = function () {
  var https = require('https');
  var FileManager = require("./filemanager.js");
  var fileManager = new FileManager();
  var Stream = require('stream').Transform;

  /**
  * Brings avatar file to client.
  * @param {string} id - Identity of user.
  * @param {string} avatarUrl - Url to reach image.
  * @param {function} callback - Callback function to be executed when everything is done.
  */
  this.getAvatarFile = function (id, avatarUrl, callback) {
    this.getAvatarFileFromFileSystem(id, function (avatar) {
      if (avatar) {
        callback(avatar);
        return;
      }

      self.getAvatarFileFromInternet(avatarUrl, function (avatar) {
        var fileName = id + '.jpg';

        self.saveAvatar(fileName, avatar);
        callback(avatar);
      });
    });
  }

  /**
  * Brings avatar file from file system.
  * @param {string} fileName - Filename of the avatar file.
  * @param {function} callback - Callback function to be executed when everything is done.
  */
  this.getAvatarFileFromFileSystem = function (fileName, callback) {
    fileManager.loadFile("./images/" + fileName, callback);
  }

  /**
  * Brings avatar file from internet.
  * @param {string} avatarUrl - Url on the net to download avatar.
  * @param {function} callback - Callback function to be executed when everything is done.
  */
  this.getAvatarFileFromInternet = function (avatarUrl, callback) {
    https.get(avatarUrl, function (response) {
      var data = new Stream();
      response.on('data', function (chunk) {
        data.push(chunk);
      });

      response.on('end', function () {
        callback(data.read());
      });
    });
  }

   /**
  * Saves avatar file to the file system.
  * @param {string} avatarUrl - Filename of the avatar.
  * @param {binary} avatar - Avatar data as binary.
  */ 
  this.saveAvatar = function (fileName, avatar) {
    fileManager.writeToImageFile("./images/" + fileName, avatar);
  }

  /**
  * Deletes avatar.
  * @param {string} id - Id of the avatar.
  */ 
  this.deleteAvatar = function (id) {
    fileManager.deleteFile("./images"+id+"jpg");
  }

  var self = this;
}

module.exports = AvatarProxy;