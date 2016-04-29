<<<<<<< HEAD
var util = require('util');
var extend = require('extend');
=======
var util = require("util");
var extend = require("extend");
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b

function Sequence(config) {
	var _default = {
		onWarning: null,
		warningLimit: 10
	}
	_default = extend(_default, config);
	var self = this;
	this.sequence = [];

	setImmediate(function nextSequenceTick() {
		if (_default.onWarning && self.sequence.length >= _default.warningLimit){
			_default.onWarning(self.sequence.length, _default.warningLimit);
		}
		var task = self.sequence.shift();
		if (!task) {
			return setTimeout(nextSequenceTick, 100);
		}
		var args = [function (err, res) {
			task.done && setImmediate(task.done, err, res);
			setTimeout(nextSequenceTick, 100);
		}];
		if (task.args) {
			args = args.concat(task.args);
		}
		task.worker.apply(task.worker, args);
	});
}

Sequence.prototype.add = function (worker, args, done) {
<<<<<<< HEAD
	if (!done && args && typeof(args) == 'function') {
		done = args;
		args = undefined;
	}
	if (worker && typeof(worker) == 'function') {
=======
	if (!done && args && typeof(args) == "function") {
		done = args;
		args = undefined;
	}
	if (worker && typeof(worker) == "function") {
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
		var task = {worker: worker, done: done};
		if (util.isArray(args)) {
			task.args = args;
		}
		this.sequence.push(task);
	}
}

Sequence.prototype.count = function () {
	return this.sequence.length;
}

<<<<<<< HEAD
module.exports = Sequence;
=======
module.exports = Sequence;
>>>>>>> b4ceb242c81baf0199b48c12b3e63f7fd70b5f9b
