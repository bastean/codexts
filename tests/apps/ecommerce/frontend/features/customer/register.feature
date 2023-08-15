Feature: Register a new Customer account

  Scenario: Register a valid non existing account
    Given I am on "/" page
    Then I fill the "Email" with "register@frontend.com"
    * I fill the "Username" with "registerFrontend"
    * I fill the "Password" with "12345678"
    * I fill the "Confirm Password" with "12345678"
    * I click the "Register" button
    And I see "Successfully registered!" notification

  Scenario: Register already existing account
    Given I am on "/" page
    Then I fill the "Email" with "register@frontend.com"
    * I fill the "Username" with "registerFrontend"
    * I fill the "Password" with "12345678"
    * I fill the "Confirm Password" with "12345678"
    * I click the "Register" button
    And I see "Email already registered" notification
