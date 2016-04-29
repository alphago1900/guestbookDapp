<<<<<<< HEAD
var async = require('async');
=======
var async = require("async");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b

var private = {}, self = null,
	library = null, modules = null;

function Loader(cb, _library) {
	self = this;
	library = _library;
	cb(null, self);
}

<<<<<<< HEAD

=======
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
private.loadBlockChain = function () {
	var offset = 0, limit = 1000;

	modules.blockchain.blocks.count(function (err, count) {
		if (err) {
<<<<<<< HEAD
			return library.logger('blocks.count', err)
		}

		library.logger('blocks ' + count);
=======
			return library.logger("Failed to get blocks count", err)
		}

		library.logger("Blocks " + count);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		async.until(
			function () {
				return count < offset
			}, function (cb) {
<<<<<<< HEAD
				library.logger('current ' + offset);
=======
				library.logger("Current " + offset);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
				modules.blockchain.blocks.loadBlocksOffset(limit, offset, function (err) {
					if (err) {
						return setImmediate(cb, err);
					}

					offset = offset + limit;

					setImmediate(cb);
				});
			}, function (err) {
				if (err) {
<<<<<<< HEAD
					library.logger('loadBlocksOffset', err);
					if (err.block) {
						library.logger('blockchain failed at ', err.block.height)
						modules.blockchain.blocks.simpleDeleteAfterBlock(err.block.height, function (err) {
							library.logger('blockchain clipped');
							library.bus.message('blockchainLoaded');
						})
					}
				} else {
					library.logger('blockchain loaded');
					library.bus.message('blockchainLoaded');
=======
					library.logger("loadBlocksOffset", err);
					if (err.block) {
						library.logger("Blockchain failed at ", err.block.height)
						modules.blockchain.blocks.simpleDeleteAfterBlock(err.block.height, function (err) {
							library.logger("Blockchain clipped");
							library.bus.message("blockchainLoaded");
						})
					}
				} else {
					library.logger("Blockchain loaded");
					library.bus.message("blockchainLoaded");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
				}
			}
		)
	});
}

Loader.prototype.onBind = function (_modules) {
	modules = _modules;
}

Loader.prototype.onBlockchainReady = function () {
	private.loadBlockChain();
}

Loader.prototype.onMessage = function (msg) {
<<<<<<< HEAD

}

module.exports = Loader;
=======
}

module.exports = Loader;
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
