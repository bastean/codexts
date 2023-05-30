Feature: Delete a existing customer

  Scenario: Before All
    Given I send a PUT request to "/customer" with body:
    """
    {
      "id": "000fcad8-6224-4f1e-92f0-e562095712c2",
      "username": "delete",
      "email": "testing@delete.com"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: A valid existing customer
    Given I send a DELETE request to "/customer/000fcad8-6224-4f1e-92f0-e562095712c2"
    Then the response status code should be 200
    And the response should be empty

  Scenario: An invalid customer id
    Given I send a DELETE request to "/customer/000fcad8-6224-4f1e-92f0-e562095712"
    Then the response status code should be 422
    And the response content should be:
    """
    {
        "message": "UUID value is invalid"
    }
    """
