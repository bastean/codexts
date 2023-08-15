Feature: Delete a Customer account

  Scenario: Register a valid non existing account
    Given I am on "/" page
    Then I fill the "Email" with "delete@frontend.com"
    * I fill the "Username" with "deleteFrontend"
    * I fill the "Password" with "12345678"
    * I fill the "Confirm Password" with "12345678"
    * I click the "Register" button
    And I see "Successfully registered!" notification

  Scenario: Login a valid existing account
    Given I am on "/" page
    Then I click the "LOGIN" tab
    * I fill the "Email" with "delete@frontend.com"
    * I fill the "Password" with "12345678"
    * I click the "Login" button
    And I see "Dashboard" title

  Scenario: Delete a valid existing account
    Given I am on "/" page
    Then I click the "DELETE" tab
    * I fill the "Password" with "12345678"
    * I click the "Delete" button
    And I see "Successfully deleted!" notification
