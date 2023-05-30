Feature: Find a existing customer

  Scenario: Before All
    Given I send a PUT request to "/customer" with body:
    """
    {
      "id": "000fcad8-6224-4f1e-92f0-e562095712c1",
      "username": "find",
      "email": "testing@find.com"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A valid existing customer
    Given I send a POST request to "/customer" with body:
    """
    {
      "email": "testing@find.com"
    }
    """
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "id": "000fcad8-6224-4f1e-92f0-e562095712c1",
      "username": "find",
      "email": "testing@find.com"
    }
    """

  Scenario: An valid non existing customer
    Given I send a POST request to "/customer" with body:
    """
    {
      "email": "testing-non-existing@find.com"
    }
    """
    Then the response status code should be 404
    And the response content should be:
    """
    {
        "message": "Email not found"
    }
    """

  Scenario: After All
    Given I send a DELETE request to "/customer/000fcad8-6224-4f1e-92f0-e562095712c1"
    Then the response status code should be 200
    And the response should be empty
