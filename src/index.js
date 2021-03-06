var reporters = require('./reporters');
var extract = require('./extract');
var fileIgnored = require('./fileIgnored');
var makeLint = require('./lint');
var stream = require('./stream');

var jshintPlugin = function (opt) {
  var lint = makeLint(opt);

  return stream(function (file, cb) {
    fileIgnored(file, function (err, ignored) {
      if (err) return cb(err);
      if (ignored) return cb(null, file);

      lint(file, function (err) {
        if (err) return cb(err);
        cb(null, file);
      });
    });
  });
};

// expose the reporters
jshintPlugin.failReporter = reporters.fail;
jshintPlugin.loadReporter = reporters.loadReporter;
jshintPlugin.reporter = reporters.reporter;

// export the extractor
jshintPlugin.extract = extract;
jshintPlugin.makeLint = makeLint;
jshintPlugin.fileIgnored = fileIgnored;

module.exports = jshintPlugin;
