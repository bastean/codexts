Feature: Update a Customer account

  Scenario: Register a valid non existing account
    Given I am on "/" page
    Then I fill the "Email" with "update@frontend.com"
    * I fill the "Username" with "updateFrontend"
    * I fill the "Password" with "12345678"
    * I fill the "Confirm Password" with "12345678"
    * I click the "Register" button
    And I see "Successfully registered!" notification

  Scenario: Login a valid existing account
    Given I am on "/" page
    Then I click the "LOGIN" tab
    * I fill the "Email" with "update@frontend.com"
    * I fill the "Password" with "12345678"
    * I click the "Login" button
    And I see "Dashboard" title

  Scenario: Update a valid existing account
    Given I am on "/" page
    Then I fill the "Email" with "updated@frontend.com"
    * I fill the "Username" with "updatedFrontend"
    * I fill the "Current Password" with "12345678"
    * I fill the "New Password" with "87654321"
    * I fill the "Confirm Password" with "87654321"
    * I click the "Update" button
    And I see "Successfully updated!" notification
    * I click the "Logout" tab
    * I see "Welcome" title
