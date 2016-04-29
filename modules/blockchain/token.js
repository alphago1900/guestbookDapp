<<<<<<< HEAD
var extend = require('extend');
var util = require('util');
var crypto = require('crypto-browserify');
var bignum = require('browserify-bignum');
=======
var extend = require("extend");
var util = require("util");
var crypto = require("crypto-browserify");
var bignum = require("browserify-bignum");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b

var private = {}, self = null,
	library = null, modules = null;

function Token(cb, _library) {
	self = this;
	library = _library;

	cb(null, self);
}

Token.prototype.addToken = function (cb, query) {
	var keypair = modules.api.crypto.keypair(query.secret);

	library.sequence.add(function (cb) {
<<<<<<< HEAD
		modules.blockchain.accounts.getAccount({publicKey: keypair.publicKey.toString('hex')}, function (err, account) {
=======
		modules.blockchain.accounts.getAccount({publicKey: keypair.publicKey.toString("hex")}, function (err, account) {
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
			if (err) {
				return cb(err.toString());
			}
			if (!account || !account.publicKey) {
<<<<<<< HEAD
				return cb("COMMON.OPEN_ACCOUNT");
=======
				return cb("Account not found");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
			}

			try {
				var transaction = modules.logic.transaction.create({
					type: 5,
					sender: account,
					keypair: keypair,
					name: query.name,
					description: query.description,
					fund: query.fund,
				});
			} catch (e) {
				return cb(e.toString());
			}

			modules.blockchain.transactions.processUnconfirmedTransaction(transaction, cb)
		});
	}, function (err, transaction) {
		if (err) {
			return cb(err.toString());
		}

		cb(null, {transaction: transaction});
	});
}

Token.prototype.getTokens = function (cb, query) {
	modules.api.dapps.getGenesis(function (err, res) {
		if (err) {
			return cb(err);
		}
		modules.api.sql.select({
			table: "asset_token",
			"alias": "tkn",
			join: [
				{
					"type": "inner",
					"table": "transactions",
					"alias": "t",
					"on": {
<<<<<<< HEAD
						"tkn.transactionId": "t.id"
=======
						"tkn.\"transactionId\"": "t.\"id\""
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
					}
				}
			],
			fields: [
<<<<<<< HEAD
				{"tkn.transactionId": "transactionId"},
				{"tkn.name": "name"},
				{"t.senderId": "owner"},
				{"tkn.fund": "fund"},
				{"tkn.description": "description"},
				{
					"name": "balance",
					expression: "tkn.fund - ifnull((select sum(amount) from dapp_" + res.dappid + "_transactions where senderId = t.senderId and token = tkn.name), 0)"
=======
				{"tkn.\"transactionId\"": "transactionId"},
				{"tkn.\"name\"": "name"},
				{"t.\"senderId\"": "owner"},
				{"tkn.\"fund\"": "fund"},
				{"tkn.\"description\"": "description"},
				{
					"name": "balance",
					expression: "tkn.\"fund\" - IFNULL((SELECT SUM(\"amount\")::bigint AS \"amount\" FROM dapp_" + res.dappid + "_transactions WHERE \"senderId\" = t.\"senderId\" AND \"token\" = tkn.\"name\"), 0)"
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
				}
			]
		}, {
			"id": String,
			"tiker": String,
			"owner": String,
			"fund": Number,
			"name": String,
			"balance": Number
		}, function (err, tokens) {
			cb(err, {tokens: tokens});
		});
	});
}

Token.prototype.onBind = function (_modules) {
	modules = _modules;
}

<<<<<<< HEAD
module.exports = Token;
=======
module.exports = Token;
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
