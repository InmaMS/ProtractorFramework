let homepage = function () {
  let firstNumber = element(by.model("first"));
  let secondNumber = element(by.model("second"));
  let goButton = element(by.css('[ng-click="doAddition()"]'));

  this.get = (url) => {
    browser.get(url);
  };

  this.enterFirstNumber = (firstNo) => {
    firstNumber.sendKeys(firstNo);
  };

  this.enterSecondNumber = (secondNo) => {
    secondNumber.sendKeys(secondNo);
  };

  this.clickGo = () => {
    goButton.click();
  };

  this.getResult = (result) => {
    return element(by.cssContainingText(".ng-binding", result)).getText();
  };
};

module.exports = new homepage();
