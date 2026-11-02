Feature: Reading Test Data From The eFeature File

    @method1
    Scenario: Verify reading testdata1
        Given I launch the browser
        Then I launch the test automation practice application
        And I verify reading testdata for test automation practice application "<Name>","<Email>","<Email>","<Email>","<Wikipedia>"
        And I close the browser

        Examples:
            | Name  | Email           | Email      | Email     | Wikipedia  |
            | Sai   | sai@yahoo.com   | 8908908900 | Hyderabad | playwright |
            | Aswin | aswin@gmail.com | 5678907890 | bangalore | selenium   |
            | shena | shena@gmail.com | 4564564567 | kerala    | javascript |

    @method1
    Scenario Outline: Verify reading testdata2
        Given I launch the browser
        Then I launch the test automation practice application
        And I verify reading testdata for test automation practice application "<Name>","<Email>","<Email>","<Email>","<Wikipedia>"
        And I close the browser

        Examples:
            | Name    | Email             | Email      | Email     | Wikipedia  |
            | quality | quality@yahoo.com | 8908908900 | Hyderabad | playwright |
            | morning | morning@gmail.com | 5678907890 | bangalore | selenium   |
            | evening | evening@gmail.com | 4564564567 | kerala    | javascript |

    @method1
    Scenario Outline: Verify orangeHRM
        Given I launch the browser
        And I verify reading testdata for orangeHRM "<url>","<username>","<passowrd>"
        And I close the browser

        Examples:
            | url                                                                | username | passowrd |
            | https://opensource-demo.orangehrmlive.com/web/index.php/auth/login | Admin    | admin123 |
