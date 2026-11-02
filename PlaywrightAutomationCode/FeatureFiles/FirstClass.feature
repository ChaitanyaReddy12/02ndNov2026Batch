
# Feature means scenario name/module name/big functionality name

# feature contains a group/collection of test cases

Feature: Facebook

# Scenario or Scenario Outline means test case 

# Scenario: 

# Scenario Outline: Scenario Outline name

@Quality
Scenario: Login facebook application in first class
Given I launch the browser
Then I launch the facebook application
And I close the browser

@morning
Scenario Outline: Login amazon application in first class
Given I launch the browser
Then I launch the amazon application
And I close the browser
