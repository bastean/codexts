Feature: Login a Customer account

  Scenario: Register a valid non existing account
    Given I am on "/" page
    Then I fill the "Email" with "login@frontend.com"
    * I fill the "Username" with "loginFrontend"
    * I fill the "Password" with "12345678"
    * I fill the "Confirm Password" with "12345678"
    * I click the "Register" button
    And I see "Successfully registered!" notification

  Scenario: Login a valid existing account
    Given I am on "/" page
    Then I click the "LOGIN" tab
    * I fill the "Email" with "login@frontend.com"
    * I fill the "Password" with "12345678"
    * I click the "Login" button
    And I see "Dashboard" title
    * I click the "Logout" tab
    * I see "Welcome" title

  Scenario: Login a valid non existing account
    Given I am on "/" page
    Then I click the "LOGIN" tab
    * I fill the "Email" with "non-existing@frontend.com"
    * I fill the "Password" with "non-existing"
    * I click the "Login" button
    And I see "Email not found" notification
