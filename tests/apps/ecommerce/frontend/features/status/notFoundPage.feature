Feature: Not Found Page load

  Scenario: Check the correct loading of the Not Found page
    Given I am on "/non-existing" page
    Then the page title should be "Not Found"
