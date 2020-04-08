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

  onPrepare: function () {
    var jasmineReporters = require("jasmine-reporters");
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: "../reports/HTMLReports",
        filePrefix: "xmlresults",
      })
    );

    var fs = require("fs-extra");

    fs.emptyDir("../reports/HTMLReports/screenshots/", function (err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == "failed") {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get("browserName");

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(
                "../reports/HTMLReports/screenshots/" +
                  browserName +
                  "-" +
                  result.fullName +
                  ".png"
              );
              stream.write(new Buffer(png, "base64"));
              stream.end();
            });
          });
        }
      },
    });
  },

  onComplete: function () {
    var browserName, browserVersion, platform, testConfig;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get("browserName");
      browserVersion = caps.get("version");
      platform = caps.get("platform");

      var HTMLReport = require("protractor-html-reporter-2");

      testConfig = {
        reportTitle: "Protractor Test Execution Report",
        outputPath: "../reports/HTMLReports",
        outputFilename: "ProtractorTestReport",
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform,
      };
      new HTMLReport().from(
        "../reports/HTMLReports/xmlresults.xml",
        testConfig
      );
    });
  },
};
