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

private.accounts = [];
private.accountsIndexById = {};
private.executor = null;

function Accounts(cb, _library) {
	self = this;
	library = _library;

	cb(null, self);
}

function reverseDiff(diff) {
	var copyDiff = diff.slice();
	for (var i = 0; i < copyDiff.length; i++) {
<<<<<<< HEAD
		var math = copyDiff[i][0] == '-' ? '+' : '-';
=======
		var math = copyDiff[i][0] == "-" ? "+" : "-";
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		copyDiff[i] = math + copyDiff[i].slice(1);
	}
	return copyDiff;
}

function applyDiff(source, diff) {
	var res = source ? source.slice() : [];

	for (var i = 0; i < diff.length; i++) {
		var math = diff[i][0];
		var val = diff[i].slice(1);

		if (math == "+") {
			res = res || [];

			var index = -1;
			if (res) {
				index = res.indexOf(val);
			}
			if (index != -1) {
				return false;
			}

			res.push(val);
		}
		if (math == "-") {
			var index = -1;
			if (res) {
				index = res.indexOf(val);
			}
			if (index == -1) {
				return false;
			}
			res.splice(index, 1);
			if (!res.length) {
				res = null;
			}
		}
	}
	return res;
}

private.addAccount = function (account, scope) {
	if (!account.address) {
		account.address = self.generateAddressByPublicKey(account.publicKey);
	}
	account.balance = account.balance || {};
	account.u_balance = account.u_balance || {};
	account.balance["LISK"] = account.balance["LISK"] || 0;
	account.u_balance["LISK"] = account.u_balance["LISK"] || 0;
	(scope || private).accounts.push(account);
	var index = (scope || private).accounts.length - 1;
	(scope || private).accountsIndexById[account.address] = index;

	return account;
}

private.removeAccount = function (address, scope) {
	var index = (scope || private).accountsIndexById[address];
	delete (scope || private).accountsIndexById[address];
	(scope || private).accounts[index] = undefined;
}

private.getAccount = function (address, scope) {
	var index = (scope || private).accountsIndexById[address];
	return (scope || private).accounts[index];
}

Accounts.prototype.clone = function (cb) {
	var r = {
		data: extend(true, {}, private.accounts),
		index: extend(true, {}, private.accountsIndexById)
	};

	for (var i in r.data) {
		for (var t in r.data[i].u_balance) {
			r.data[i].u_balance[t] = r.data[i].balance[t] || 0;
		}
	}

	cb(null, r);
}

Accounts.prototype.getExecutor = function (cb) {
<<<<<<< HEAD
	if (!process.argv[2]) return setImmediate(cb, "secret is null");
=======
	if (!process.argv[2]) {
		return setImmediate(cb, "Secret is null");
	}
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	if (private.executor) {
		return setImmediate(cb, null, private.executor);
	}
	var keypair = modules.api.crypto.keypair(process.argv[2]);
	modules.api.dapps.getGenesis(function (err, res) {
		var address = self.generateAddressByPublicKey(keypair.publicKey.toString("hex"));
		private.executor = {
			address: address,
			keypair: keypair,
			secret: process.argv[2],
			isAuthor: res.authorId == address
		}
		cb(err, private.executor);
	});
}

Accounts.prototype.generateAddressByPublicKey = function (publicKey) {
<<<<<<< HEAD
	var publicKeyHash = crypto.createHash('sha256').update(publicKey, 'hex').digest();
=======
	var publicKeyHash = crypto.createHash("sha256").update(publicKey, "hex").digest();
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	var temp = new Buffer(8);
	for (var i = 0; i < 8; i++) {
		temp[i] = publicKeyHash[7 - i];
	}

	var address = bignum.fromBuffer(temp).toString() + "L";
	return address;
}

Accounts.prototype.getAccount = function (filter, cb, scope) {
	var address = filter.address;
	if (filter.publicKey) {
		address = self.generateAddressByPublicKey(filter.publicKey);
	}
	if (!address) {
<<<<<<< HEAD
		return cb("must provide address or publicKey");
=======
		return cb("Account not found");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	cb(null, private.getAccount(address, scope));
}

Accounts.prototype.getAccounts = function (cb, scope) {
	var result = (scope || private).accounts.filter(function (el) {
		if (!el) return false;
		return true;
	})
	cb(null, result);
}

Accounts.prototype.setAccountAndGet = function (data, cb, scope) {
	var address = data.address || null;
	if (address === null) {
		if (data.publicKey) {
			address = self.generateAddressByPublicKey(data.publicKey);
		} else {
<<<<<<< HEAD
			return cb("must provide address or publicKey");
=======
			return cb("Missing address or publicKey");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}
	}
	var account = private.getAccount(address, scope);

	if (!account) {
		account = private.addAccount(data, scope);
	} else {
		extend(account, data);
	}

	cb(null, account);
}

Accounts.prototype.mergeAccountAndGet = function (data, cb, scope) {
	var address = data.address || null;
	if (address === null) {
		if (data.publicKey) {
			address = self.generateAddressByPublicKey(data.publicKey);
		} else {
<<<<<<< HEAD
			return cb("must provide address or publicKey");
=======
			return cb("Missing address or publicKey");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}
	}

	var account = private.getAccount(address, scope);

	if (!account) {
		var raw = {address: address};
		if (data.publicKey) {
			raw.publicKey = data.publicKey;
		}
		account = private.addAccount(raw, scope);
	}

	Object.keys(data).forEach(function (key) {
		var trueValue = data[key];
		if (typeof trueValue == "number") {
			account[key] = (account[key] || 0) + trueValue;
		} else if (util.isArray(trueValue)) {
			account[key] = applyDiff(account[key], trueValue);
		} else if (typeof trueValue == "object") {
			for (var token in trueValue) {
				account[key][token] = (account[key][token] || 0) + trueValue[token];
			}
		}
	})

	cb(null, account);
}

Accounts.prototype.undoMerging = function (data, cb, scope) {
	var address = data.address || null;
	if (address === null) {
		if (data.publicKey) {
			address = self.generateAddressByPublicKey(data.publicKey);
		} else {
<<<<<<< HEAD
			return cb("must provide address or publicKey");
=======
			return cb("Missing address or publicKey");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		}
	}
	var account = private.getAccount(address, scope);

	if (!account) {
		var raw = {address: address};
		if (data.publicKey) {
			raw.publicKey = data.publicKey;
		}
		account = private.addAccount(raw, scope);
	}

	Object.keys(data).forEach(function (key) {
		var trueValue = data[key];
		if (typeof trueValue == "number") {
			account[key] = (account[key] || 0) - trueValue;
		} else if (util.isArray(trueValue)) {
			trueValue = reverseDiff(trueValue);
			account[key] = applyDiff(account[key], trueValue);
		} else if (typeof trueValue == "object") {
			for (var token in trueValue) {
				account[key][token] = (account[key][token] || 0) - trueValue[token];
			}
		}
	});

	cb(null, account);
}

Accounts.prototype.onBind = function (_modules) {
	modules = _modules;
}

Accounts.prototype.open = function (cb, query) {
	var keypair = modules.api.crypto.keypair(query.secret);
	var address = self.generateAddressByPublicKey(keypair.publicKey.toString("hex"));
	var account = private.getAccount(address);

	if (!account) {
		account = private.addAccount({
			address: address,
<<<<<<< HEAD
			publicKey: keypair.publicKey.toString('hex')
		});
	}else{
		account.publicKey = keypair.publicKey.toString('hex');
=======
			publicKey: keypair.publicKey.toString("hex")
		});
	}else{
		account.publicKey = keypair.publicKey.toString("hex");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
	}

	cb(null, {account: account});
}

module.exports = Accounts;
