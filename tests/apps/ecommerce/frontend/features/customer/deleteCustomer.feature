Feature: Delete a Customer account

  Scenario: BeforeAll
    Given I am on "/" page
    Then I fill the "Username" with "TestingDelete"
    * I fill the "Email" with "testing@delete.com"
    * I click the "Register" button
    And I see "Registration Successfully!" notification

  Scenario: Delete a valid existing account
    Given I am on "/" page
    Then I click the "DELETE" tab
    * I fill the "Email" with "testing@delete.com"
    * I click the "Delete" button
    And I see "Deleted Successfully!" notification

  Scenario: Delete a valid non existing account
    Given I am on "/" page
    Then I click the "DELETE" tab
    *  I fill the "Email" with "non-existing@delete.com"
    * I click the "Delete" button
    And I see "Email not found" notification

  Scenario: Delete a invalid non existing account
    Given I am on "/" page
    Then I click the "DELETE" tab
    * I fill the "Email" with ""
    * I click the "Delete" button
    And I see "Please, check invalid values" notification
