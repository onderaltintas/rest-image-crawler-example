/**
 * Creates an instance of MainWebServiceManager.
 * @class
 * @classdesc Manages web services.
 * Önder ALTINTAŞ 01.07.2019
 * @param {Router} router - Express router object.
 */
var MainWebServiceManager = function (router) {
  /* Variables */
  var router = router;
  var config = require('../config.js').config;
  var https = require('https');
  var AvatarProxy = require("../util/avatarproxy.js");
  var avatarProxy = new AvatarProxy();
	var FileManager = require("../util/filemanager.js");
	var fileManager = new FileManager();
	var usersListPage = 0;

  /**
   * Starts web services defined inside.
   */
  this.start = function () {
    // test route to make sure everything is working (accessed at GET http://localhost:3000/test)
    setService('get', '/test', test);
    // http://localhost:3000/api/user/{userId} : 
    setService('get', '/api/user/:userId', getUserByUserId);
    // get for http://localhost:3000/api/user/{userId}/avatar :
    setService('get', '/api/user/:userId/avatar', getAvatarByUserId);
		// get for http://localhost:3000/api/getUsersList :
    setService('get', '/api/getUsersList', getUsersList);
    // delete for http://localhost:3000/api/user/{userId}/avatar :
    setService('delete', '/api/user/:userId/avatar', deleteUserByUserId);
  };

  /* Private Methods */
  /**
  * Sets the service with given service type, route and function. 
  * Adds localization with using request language header.
  * @param {string} serviceType - Type of the service. get,post,put,delete are valid values.
  * @param {string} serviceRoute - Route string for web service name. E.g. "/save".
  * @param {Function} serviceFunction - Function to be executed when service is called by the client
  */
  var setService = function (serviceType, serviceRoute, serviceFunction) {
    if (serviceType === 'get') {
      router.get(serviceRoute, serviceFunction);
    } else if (serviceType === 'delete') {
      router.delete(serviceRoute, serviceFunction);
    }
  }

  /**
  * Just a web service test.
  * @param {Request} req - Node request object.
  * @param {Response} res - Node response object.
  * @param {Next} next - Node next object. Not being used right now, just for convention atm.
  */
  var test = function (req, res, next) {
    res.json({ message: "Working!" });
  };

  /**
	* Just a web service test.
	* @param {Request} req - Node request object.
	* @param {Response} res - Node response object.
	* @param {Next} next - Node next object. Not being used right now, just for convention atm.
	*/
  var getUserByUserId = function (req, res, next) {
    var userId = req.params['userId'];
    console.log(userId)
    getUser(userId, function (response) {
      res.json(response);
    });
  };

  /**
	* Gets the user information from internet source.
	* @param {string} userId - Id of the user.
	* @param {function} callback - Callback function to be executed when process is done.
	*/
  var getUser = function (userId, callback) {
    var url = "https://reqres.in/api/users/" + userId;
    https.get(url, function (response) {
      var body = '';
      response.on('data', function (chunk) {
        body += chunk;
      });

      response.on('end', function () {
        var result = JSON.parse(body);
        callback(result);
      });
    });
  }

  /**
  * Just a web service test.
  * @param {Request} req - Node request object.
  * @param {Response} res - Node response object.
  * @param {Next} next - Node next object. Not being used right now, just for convention atm.
  */
  var getAvatarByUserId = function (req, res, next) {
    var userId = req.params['userId'];
    getUser(userId, function (response) {
      avatarProxy.getAvatarFile(response.data.id, response.data.avatar, function (avatarResponse) {
        res.set('Content-Type', 'image/jpeg');
        res.write(avatarResponse);
      });
    });
  };

  /**
  * Just a web service test.
  * @param {Request} req - Node request object.
  * @param {Response} res - Node response object.
  * @param {Next} next - Node next object. Not being used right now, just for convention atm.
  */
  var deleteUserByUserId = function (req, res, next) {
    avatarProxy.deleteAvatar(req.params['userId']);
    res.json({ message: "Working!" });
  };
	
	/**
	* Gets the users list and save it to a file as json.
	*/
  var getUsersList = function (req, res, next) {
		usersListPage++;
		var url = "https://reqres.in/api/users?page=" + usersListPage;
		https.get(url, function (response) {
			var body = '';
      response.on('data', function (chunk) {
        body += chunk;
      });

      response.on('end', function () {
				var result = JSON.stringify(JSON.parse(body).data);
        fileManager.writeToFile('./users/users.txt', result);
				res.send("done");
      });
		})
  };

  var self = this;
};

module.exports = MainWebServiceManager
