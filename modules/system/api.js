var private = {}, self = null,
    library = null, modules = null;
    private.apies = {};
    private.loaded = false;

function Api(cb, _library) {
	self = this;
	library = _library;

	cb(null, self);
}

private.ns = function (src, path) {
	var o, d;
	d = path.split(".");
	o = src[d[0]];
	for (var i = 0; i < d.length; i++) {
		d = d.slice(1);
		o = o[d[0]];
		if (!o) break;
	}
	return o;
};

Api.prototype.onBind = function (_modules) {
	modules = _modules;
}

Api.prototype.onBlockchainLoaded = function () {
	private.loaded = true;

	try {
<<<<<<< HEAD
		var router = require('../../routes.json');
	} catch (e) {
		library.logger("failed router file");
=======
		var router = require("../../routes.json");
	} catch (e) {
		library.logger("Failed to load routes.json");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	router.forEach(function (route) {
		private.apies[route.method + " " + route.path] = private.ns(modules, route.handler);
	});

	library.sandbox.onMessage(function (message, cb, callback_id) {
		var handler = private.apies[message.method + " " + message.path];
		if (handler) {
			handler(function (err, response) {
				if (err) {
					err = err.toString();
				}

				cb(err, {response: response}, callback_id);
			}, message.query);
		} else {
<<<<<<< HEAD
			cb("api not found", {}, callback_id);
=======
			cb("API call not found", {}, callback_id);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}
	});

	modules.api.dapps.setReady(function () {
<<<<<<< HEAD

=======
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	});
}

Api.prototype.helloworld = function (cb) {
	cb(null, {
		test: "Hello, world!"
	});
}

Api.prototype.message = function (cb, query) {
	library.bus.message("message", query);
	cb(null, {});
}

module.exports = Api;
