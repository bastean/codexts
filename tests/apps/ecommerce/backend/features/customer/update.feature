Feature: Update a existing customer

  Scenario: Register a valid non existing customer
    Given I send a PUT request to "/public/customer" with body:
      """
      {
        "id": "00000000-0000-4000-0000-000000000003",
        "email": "update@test.com",
        "username": "update",
        "password": "12345678"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: Login a valid existing customer
    Given I send a POST request to "/public/customer" with body:
      """
      {
        "email": "update@test.com",
        "password": "12345678"
      }
      """
    Then the response status code should be 200
    And the response content should be:
      """
      {
        "id": "00000000-0000-4000-0000-000000000003",
        "email": "update@test.com",
        "username": "update"
      }
      """

  Scenario: Session successfully logged on to system
    Given I send a PATCH request to "/auth/customer" with body:
      """
      {
        "email": "updated@test.com",
        "username": "updated",
        "password": "12345678"
      }
      """
    Then the response status code should be 200
    And the response should be empty

  Scenario: Session not successfully logged on to system
    Given I do not have the required authorization token
    Then I send a PATCH request to "/auth/customer" with body:
      """
      {
        "email": "updated@test.com",
        "username": "updated",
        "password": "12345678"
      }
      """
    And the response status code should be 422
    * the response content should be:
      """
      {
          "message": "Missing Token"
      }
      """
