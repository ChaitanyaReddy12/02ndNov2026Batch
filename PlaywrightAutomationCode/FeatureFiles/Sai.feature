Feature: assertions

    @method1
    Scenario: verify playwright hard assertions
        Given I launch the browser
        And I verify playwright hard assertions
        And I close the browser

    @method1
    Scenario: verify playwright soft assertions
        Given I launch the browser
        And I verify playwright soft assertions
        And I close the browser