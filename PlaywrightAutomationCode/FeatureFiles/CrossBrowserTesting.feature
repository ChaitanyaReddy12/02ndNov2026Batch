
Feature: Playwright method1s

    @method1
    Scenario: verify playwright shadow DOM in chrome
        Given I launch the browser
        And I verify playwright shadow DOM
        And I close the browser

    @method1
    Scenario: verify playwright shadow DOM in firefox
        Given I launch the firefox browser
        And I verify playwright shadow DOM
        And I close the browser

    @method1
    Scenario: verify playwright shadow DOM in safari
        Given I launch the safari browser
        And I verify playwright shadow DOM
        And I close the browser

    @method1
    Scenario: verify playwright shadow DOM in headless
        Given I launch the headless browser
        And I verify playwright shadow DOM
        And I close the browser

