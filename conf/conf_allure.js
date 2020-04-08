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

  // Assign the test reporter to each running instance
  onPrepare: function () {
    var AllureReporter = require("jasmine-allure-reporter");
    jasmine
      .getEnv()
      .addReporter(
        new AllureReporter({ resultsDir: "../reports/allure-results" })
      );

    jasmine.getEnv().afterEach(function (done) {
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment(
          "Screenshot",
          function () {
            return new Buffer(png, "base64");
          },
          "image/png"
        )();
        done();
      });
    });
  },
};
