// An example configuration file.
var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");

var reporter = new HtmlScreenshotReporter({
  dest: "../reports/screenshots",
  filename: "my-report.html",
});

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: "chrome",
  },

  // Framework to use. Jasmine is recommended.
  framework: "jasmine",

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ["../tests/calculator.js"],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },

  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function () {
    jasmine.getEnv().addReporter(reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
};
