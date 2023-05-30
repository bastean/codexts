Feature: Find a Customer account

  Scenario: Before All
    Given I am on "/" page
    Then I fill the "Username" with "TestingFind"
    * I fill the "Email" with "testing@find.com"
    * I click the "Register" button
    And I see "Registration Successfully!" notification

  Scenario: Find a valid existing account
    Given I am on "/" page
    Then I click the "FIND" tab
    * I fill the "Email" with "testing@find.com"
    * I click the "Find" button
    And I see "Found" notification

  Scenario: Find a valid non existing account
    Given I am on "/" page
    Then I click the "FIND" tab
    *  I fill the "Email" with "non-existing@find.com"
    * I click the "Find" button
    And I see "Email not found" notification

  Scenario: Find a invalid non existing account
    Given I am on "/" page
    Then I click the "FIND" tab
    Then I fill the "Email" with ""
    * I click the "Find" button
    And I see "Please, check invalid values" notification

  Scenario: After All
    Given I am on "/" page
    Then I click the "DELETE" tab
    * I fill the "Email" with "testing@find.com"
    * I click the "Delete" button
    And I see "Deleted Successfully!" notification
