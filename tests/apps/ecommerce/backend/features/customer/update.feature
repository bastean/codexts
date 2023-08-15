Feature: Update a existing customer

  Scenario: Register a valid non existing customer
    Given I send a PUT request to "/public/customer" with body:
      """
      {
        "id": "00000000-0000-4000-0000-000000000003",
        "email": "update@backend.com",
        "username": "updateBackend",
        "password": "12345678"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: Login a valid existing customer
    Given I send a POST request to "/public/customer" with body:
      """
      {
        "email": "update@backend.com",
        "password": "12345678"
      }
      """
    Then the response status code should be 200
    And the response content should be:
      """
      {
        "id": "00000000-0000-4000-0000-000000000003",
        "email": "update@backend.com",
        "username": "updateBackend"
      }
      """

  Scenario: Session successfully logged on to system
    Given I send a PATCH request to "/auth/customer" with body:
      """
      {
        "email": "updated@backend.com",
        "username": "updatedBackend",
        "currentPassword": "12345678",
        "updatedPassword": "87654321"
      }
      """
    Then the response status code should be 200
    And the response should be empty

  Scenario: Session not successfully logged on to system
    Given I do not have the required authorization token
    Then I send a PATCH request to "/auth/customer" with body:
      """
      {
        "email": "updated@backend.com",
        "username": "updatedBackend",
        "currentPassword": "12345678",
        "updatedPassword": "87654321"
      }
      """
    And the response status code should be 422
    * the response content should be:
      """
      {
          "message": "Missing Token"
      }
      """
