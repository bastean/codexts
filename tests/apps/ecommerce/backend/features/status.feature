Feature: API Status

  Scenario: Check the API Status
    Given I send a GET request to "/public/status"
    Then the response status code should be 200
