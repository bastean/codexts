Feature: Not Found API Endpoint

  Scenario: Request a non-existent API Endpoint
    Given I send a GET request to "/non-existent-endpoint"
    Then the response status code should be 404
