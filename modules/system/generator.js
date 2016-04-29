var private = {}, self = null,
    library = null, modules = null;

function Generator(cb, _library) {
	self = this;
	library = _library;
	cb(null, self);
}

Generator.prototype.onBind = function (_modules) {
	modules = _modules;

	modules.api.dapps.getGenesis(function (err, res) {
		if (err) {
<<<<<<< HEAD
			return library.logger("genesis error", err)
=======
			return library.logger("Failed to get genesis block", err)
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}

		var executor = modules.blockchain.accounts.getExecutor();

		if (!executor) {
<<<<<<< HEAD
			return library.logger("secret is null")
		}

		if (res.authorId == executor.address) {

		}
		var q = {
			associate: res.associate
=======
			return library.logger("Secret is null")
		}

		if (res.authorId == executor.address) {
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}

		var genesisBlock = {
			delegate: executor.keypair.publicKey,
			height: 1,
			pointId: res.pointId,
			pointHeight: res.pointHeight,
			count: 0,
			transactions: []
		}

		var blockBytes = modules.logic.block.getBytes(genesisBlock);

		genesisBlock.id = modules.api.crypto.getId(blockBytes);
		genesisBlock.signature = modules.api.crypto.sign(executor.keypair, blockBytes);

		library.logger(JSON.stringify(genesisBlock, null, 2))
	});
}

<<<<<<< HEAD
module.exports = Generator;
=======
module.exports = Generator;
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
