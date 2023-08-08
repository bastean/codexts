Feature: Register a new customer

  Scenario: A valid non existing customer
    Given I send a PUT request to "/public/customer" with body:
      """
      {
        "id": "00000000-0000-4000-0000-000000000001",
        "email": "register@test.com",
        "username": "register",
        "password": "12345678"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid non existing customer
    Given I send a PUT request to "/public/customer" with body:
      """
      {
        "id": "",
        "email": "",
        "username": "",
        "password": ""
      }
      """
    Then the response status code should be 422
    And the response content should be:
      """
      {
        "message": "Values should not be empty"
      }
      """
