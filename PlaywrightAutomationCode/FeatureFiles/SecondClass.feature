
# Feature means scenario name/module name/big functionality name

# feature contains a group/collection of test cases

Feature: Facebook

# Scenario or Scenario Outline means test case 

# Scenario: 

# Scenario Outline: Scenario Outline name

Scenario: Login facebook application in second class
Given I launch the browser
Then I launch the facebook application
And I close the browser

@Quality
Scenario Outline: Login amazon application in second class
Given I launch the browser
Then I launch the amazon application
And I close the browser
