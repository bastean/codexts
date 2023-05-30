Feature: Register a new customer

  Scenario: A valid non existing customer
    Given I send a PUT request to "/customer" with body:
    """
    {
      "id": "000fcad8-6224-4f1e-92f0-e562095712c7",
      "username": "register",
      "email": "testing@register.com"
    }
    """
    Then the response status code should be 201
    And the response should be empty

 Scenario: An invalid non existing customer
    Given I send a PUT request to "/customer" with body:
    """
    {
      "id": "",
      "username": "",
      "email": ""
    }
    """
    Then the response status code should be 422
    And the response content should be:
    """
    {
        "message": "Values should not be empty"
    }
    """

  Scenario: After All
    Given I send a DELETE request to "/customer/000fcad8-6224-4f1e-92f0-e562095712c7"
    Then the response status code should be 200
    And the response should be empty
