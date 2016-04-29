var extend = require("extend");
<<<<<<< HEAD
var ByteBuffer = require('bytebuffer');
var bignum = require('browserify-bignum');
var timeHelper = require('../helpers/time.js');
=======
var ByteBuffer = require("bytebuffer");
var bignum = require("browserify-bignum");
var timeHelper = require("../helpers/time.js");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b

var private = {}, self = null,
	library = null, modules = null;
private.types = {};

//constructor
function Transaction(cb, _library) {
	self = this;
	library = _library;
	cb(null, self);
}

//public methods
Transaction.prototype.create = function (data) {
	if (!private.types[data.type]) {
<<<<<<< HEAD
		throw Error('Unknown transaction type ' + data.type);
	}

	if (!data.sender) {
		throw Error("Can't find sender");
	}

	if (!data.keypair) {
		throw Error("Can't find keypair");
=======
		throw Error("Unknown transaction type " + data.type);
	}

	if (!data.sender) {
		throw Error("Missing sender");
	}

	if (!data.keypair) {
		throw Error("Missing keypair");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	var trs = {
		type: data.type,
		amount: 0,
		senderId: data.sender.address,
		senderPublicKey: data.sender.publicKey,
		timestamp: timeHelper.getNow(),
		token: "LISK",
		asset: {}
	};

	trs = private.types[trs.type].create.call(self, data, trs);

	var trsBytes = self.getBytes(trs);
	trs.signature = modules.api.crypto.sign(data.keypair, trsBytes);

	trsBytes = self.getBytes(trs);
	trs.id = modules.api.crypto.getId(trsBytes);

	trs.fee = private.types[trs.type].calculateFee.call(self, trs);

	return trs;
}

Transaction.prototype.attachAssetType = function (typeId, instance) {
<<<<<<< HEAD
	if (instance && typeof instance.create == 'function' && typeof instance.getBytes == 'function' &&
		typeof instance.calculateFee == 'function' && typeof instance.verify == 'function' &&
		typeof instance.apply == 'function' && typeof instance.undo == 'function' &&
		typeof instance.applyUnconfirmed == 'function' && typeof instance.undoUnconfirmed == 'function' &&
		typeof instance.save == 'function' && typeof instance.dbRead == 'function' &&
		typeof instance.ready == 'function' && typeof instance.normalize == 'function'
	) {
		private.types[typeId] = instance;
	} else {
		throw Error('Invalid instance interface');
=======
	if (instance && typeof instance.create == "function" && typeof instance.getBytes == "function" &&
		typeof instance.calculateFee == "function" && typeof instance.verify == "function" &&
		typeof instance.apply == "function" && typeof instance.undo == "function" &&
		typeof instance.applyUnconfirmed == "function" && typeof instance.undoUnconfirmed == "function" &&
		typeof instance.save == "function" && typeof instance.dbRead == "function" &&
		typeof instance.ready == "function" && typeof instance.normalize == "function"
	) {
		private.types[typeId] = instance;
	} else {
		throw Error("Invalid instance interface");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}
}

Transaction.prototype.getBytes = function (trs, skipSignature) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		throw Error('Unknown transaction type ' + trs.type);
=======
		throw Error("Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	try {
		var assetBytes = private.types[trs.type].getBytes.call(self, trs, skipSignature);
		var assetSize = assetBytes ? assetBytes.length : 0;

		var tokenBytes = [];
		if (trs.token != "LISK") {
<<<<<<< HEAD
			tokenBytes = new Buffer(trs.token, 'utf8');
=======
			tokenBytes = new Buffer(trs.token, "utf8");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}

		var bb = new ByteBuffer(1 + 4 + 32 + 8 + 8 + 64 + 64 + assetSize + tokenBytes.length, true);
		bb.writeByte(trs.type);
		bb.writeInt(trs.timestamp);

<<<<<<< HEAD
		var senderPublicKeyBuffer = new Buffer(trs.senderPublicKey, 'hex');
=======
		var senderPublicKeyBuffer = new Buffer(trs.senderPublicKey, "hex");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		for (var i = 0; i < senderPublicKeyBuffer.length; i++) {
			bb.writeByte(senderPublicKeyBuffer[i]);
		}

		if (trs.recipientId) {
			var recipient = trs.recipientId.slice(0, -1);
			recipient = bignum(recipient).toBuffer({size: 8});

			for (var i = 0; i < 8; i++) {
				bb.writeByte(recipient[i] || 0);
			}
		} else {
			for (var i = 0; i < 8; i++) {
				bb.writeByte(0);
			}
		}

		bb.writeLong(trs.amount);

		if (tokenBytes.length > 0) {
			for (var i = 0; i < tokenBytes.length; i++) {
				bb.writeByte(tokenBytes[i]);
			}
		}

		if (assetSize > 0) {
			for (var i = 0; i < assetSize; i++) {
				bb.writeByte(assetBytes[i]);
			}
		}

		if (!skipSignature && trs.signature) {
<<<<<<< HEAD
			var signatureBuffer = new Buffer(trs.signature, 'hex');
=======
			var signatureBuffer = new Buffer(trs.signature, "hex");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
			for (var i = 0; i < signatureBuffer.length; i++) {
				bb.writeByte(signatureBuffer[i]);
			}
		}

		bb.flip();
	} catch (e) {
		throw Error(e.toString());
	}
	return bb.toBuffer();
}

Transaction.prototype.process = function (trs, sender, cb) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return setImmediate(cb, 'Unknown transaction type ' + trs.type);
=======
		return setImmediate(cb, "Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	try {
		var trsBytes = self.getBytes(trs);
		var txId = modules.api.crypto.getId(trsBytes);
	} catch (e) {
<<<<<<< HEAD
		return setImmediate(cb, "Can't get transaction id");
=======
		return setImmediate(cb, "Failed to get transaction bytes");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}
	if (trs.id && trs.id != txId) {
		return setImmediate(cb, "Invalid transaction id");
	} else {
		trs.id = txId;
	}

	modules.blockchain.transactions.getUnconfirmedTransaction(trs.id, function (err, tx) {
		if (err || tx) {
<<<<<<< HEAD
			return cb(err ? err.toString() : "This transaction in unconfirmed list already");
=======
			return cb(err ? err.toString() : "Transaction is already unconfirmed");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}

		modules.api.transactions.getTransaction(trs.id, function (err, data) {
			if (err != "Transaction not found") {
<<<<<<< HEAD
				return cb("Can't process transaction, transaction already confirmed");
=======
				return cb("Failed to process already confirmed transaction");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
			}

			cb(null, trs);
		});
	});
}

Transaction.prototype.verifySignature = function (trs, publicKey, signature) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		throw Error('Unknown transaction type ' + trs.type);
=======
		throw Error("Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	if (!signature) return false;

	try {
		var bytes = self.getBytes(trs, true);
		var res = modules.api.crypto.verify(publicKey, signature, bytes);
	} catch (e) {
		throw Error(e.toString());
	}

	return res;
}

Transaction.prototype.verify = function (trs, sender, cb, scope) { //inheritance
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return setImmediate(cb, 'Unknown transaction type ' + trs.type);
=======
		return setImmediate(cb, "Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	//check sender
	if (!sender) {
<<<<<<< HEAD
		return setImmediate(cb, "Can't find sender");
=======
		return setImmediate(cb, "Missing sender");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	//verify signature
	try {
		var valid = self.verifySignature(trs, trs.senderPublicKey, trs.signature);
	} catch (e) {
		return setImmediate(cb, e.toString());
	}
	if (!valid) {
<<<<<<< HEAD
		return setImmediate(cb, "Can't verify transaction signature");
=======
		return setImmediate(cb, "Failed to verify transaction signature");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	//check sender
	if (trs.senderId != sender.address) {
		return setImmediate(cb, "Invalid sender id: " + trs.id);
	}

	//calc fee
	var fee = private.types[trs.type].calculateFee.call(self, trs);
	if (fee === false || fee === undefined || trs.fee != fee) {
		return setImmediate(cb, "Invalid transaction type/fee: " + trs.id);
	}
	//check amount
<<<<<<< HEAD
	if (trs.amount < 0 || trs.amount > 100000000 * Math.pow(10, 8) || String(trs.amount).indexOf('.') >= 0 || trs.amount.toString().indexOf('e') >= 0) {
=======
	if (trs.amount < 0 || trs.amount > 100000000 * Math.pow(10, 8) || String(trs.amount).indexOf(".") >= 0 || trs.amount.toString().indexOf("e") >= 0) {
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		return setImmediate(cb, "Invalid transaction amount: " + trs.id);
	}

	if (trs.timestamp > timeHelper.getNow()) {
<<<<<<< HEAD
		return setImmediate(cb, "Can't process transaction, it sent in feature");
=======
		return setImmediate(cb, "Invalid timestamp");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	private.types[trs.type].verify(trs, sender, cb, scope);
}

Transaction.prototype.ready = function (trs, sender, cb, scope) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return setImmediate(cb, 'Unknown transaction type ' + trs.type);
=======
		return setImmediate(cb, "Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	private.types[trs.type].ready(trs, sender, cb, scope);
}

Transaction.prototype.apply = function (trs, sender, cb, scope) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return setImmediate(cb, 'Unknown transaction type ' + trs.type);
=======
		return setImmediate(cb, "Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	private.types[trs.type].apply(trs, sender, cb, scope);
}

Transaction.prototype.undo = function (trs, sender, cb, scope) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return setImmediate(cb, 'Unknown transaction type ' + trs.type);
=======
		return setImmediate(cb, "Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	private.types[trs.type].undo(trs, sender, cb, scope);
}

Transaction.prototype.applyUnconfirmed = function (trs, sender, cb, scope) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return setImmediate(cb, 'Unknown transaction type ' + trs.type);
=======
		return setImmediate(cb, "Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	private.types[trs.type].applyUnconfirmed(trs, sender, cb, scope);
}

Transaction.prototype.undoUnconfirmed = function (trs, sender, cb, scope) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return setImmediate(cb, 'Unknown transaction type ' + trs.type);
=======
		return setImmediate(cb, "Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	private.types[trs.type].undoUnconfirmed(trs, sender, cb, scope);
}

Transaction.prototype.save = function (trs, cb) {
	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return cb('Unknown transaction type ' + trs.type);
=======
		return cb("Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	modules.api.sql.insert({
		table: "transactions",
		values: {
			id: trs.id,
			type: trs.type,
			timestamp: trs.timestamp,
			senderId: trs.senderId,
			senderPublicKey: trs.senderPublicKey,
			recipientId: trs.recipientId,
			amount: trs.amount,
			fee: trs.fee,
			signature: trs.signature,
			blockId: trs.blockId,
			token: trs.token == "LISK" ? null : trs.token
		}
	}, function (err) {
		if (err) {
			return cb(err);
		}
		private.types[trs.type].save(trs, cb);
	});
}

Transaction.prototype.normalize = function (tx, cb) {
	if (!private.types[tx.type]) {
<<<<<<< HEAD
		return cb('Unknown transaction type ' + tx.type);
	}

	for (var i in tx) {
		if (tx[i] === null || typeof tx[i] === 'undefined') {
=======
		return cb("Unknown transaction type " + tx.type);
	}

	for (var i in tx) {
		if (tx[i] === null || typeof tx[i] === "undefined") {
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
			delete tx[i];
		}
	}

	library.validator.validate(tx, {
		type: "object",
		properties: {
			id: {
				type: "string"
			},
			type: {
				type: "integer"
			},
			timestamp: {
				type: "integer"
			},
			senderId: {
				type: "string"
			},
			senderPublicKey: {
				type: "string",
				format: "publicKey"
			},
			recipientId: {
				type: "string"
			},
			amount: {
				type: "integer",
				minimum: 0
			},
			fee: {
				type: "integer",
				minimum: 0
			},
			signature: {
				type: "string",
				format: "signature"
			},
			blockId: {
				type: "string"
			},
			token: {
				type: "string"
			},
			asset: {
				type: "object"
			}
		},
<<<<<<< HEAD
		required: ['id', 'type', 'timestamp', 'senderPublicKey']
=======
		required: ["id", "type", "timestamp", "senderPublicKey"]
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}, function (err) {
		if (err) {
			return cb(err[0].message);
		}

		private.types[tx.type].normalize.call(self, tx.asset, cb);
	});
}

Transaction.prototype.dbRead = function (row) {
	if (!row.t_id) {
		return null;
	}

	var trs = {
		id: row.t_id,
		type: row.t_type,
		timestamp: row.t_timestamp,
		senderId: row.t_senderId,
		senderPublicKey: row.t_senderPublicKey,
		recipientId: row.t_recipientId,
		amount: row.t_amount,
		fee: row.t_fee,
		signature: row.t_signature,
		blockId: row.t_blockId,
		token: row.t_token || "LISK",
		asset: {}
	};

	if (!private.types[trs.type]) {
<<<<<<< HEAD
		return cb('Unknown transaction type ' + trs.type);
=======
		throw new Error("Unknown transaction type " + trs.type);
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	var asset = private.types[trs.type].dbRead(row);
	if (asset) {
		trs.asset = extend(trs.asset, asset);
	}

	return trs;
}

Transaction.prototype.onBind = function (_modules) {
	modules = _modules;
}

//export
module.exports = Transaction;
