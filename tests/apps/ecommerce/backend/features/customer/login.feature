Feature: Login a existing customer

  Scenario: Register valid non existing customer
    Given I send a PUT request to "/public/customer" with body:
      """
      {
        "id": "00000000-0000-4000-0000-000000000002",
        "email": "login@backend.com",
        "username": "loginBackend",
        "password": "12345678"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A valid existing customer
    Given I send a POST request to "/public/customer" with body:
      """
      {
        "email": "login@backend.com",
        "password": "12345678"
      }
      """
    Then the response status code should be 200
    And the response content should be:
      """
      {
        "id": "00000000-0000-4000-0000-000000000002",
        "email": "login@backend.com",
        "username": "loginBackend"
      }
      """

  Scenario: An valid non existing customer
    Given I send a POST request to "/public/customer" with body:
      """
      {
        "email": "non-existing@backend.com",
        "password": "12345678"
      }
      """
    Then the response status code should be 404
    And the response content should be:
      """
      {
          "message": "Email not found"
      }
      """
