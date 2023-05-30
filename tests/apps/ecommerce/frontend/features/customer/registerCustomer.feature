Feature: Register a new Customer account

  Scenario: Register a valid non existing account
    Given I am on "/" page
    Then I fill the "Username" with "TestingRegister"
    * I fill the "Email" with "testing@register.com"
    * I click the "Register" button
    And I see "Registration Successfully!" notification

  Scenario: Register a invalid non existing account
    Given I am on "/" page
    Then I fill the "Username" with ""
    * I fill the "Email" with ""
    * I click the "Register" button
    And I see "Please, check invalid values" notification

  Scenario: AfterAll
    Given I am on "/" page
    Then I click the "DELETE" tab
    * I fill the "Email" with "testing@register.com"
    * I click the "Delete" button
    And I see "Deleted Successfully!" notification
