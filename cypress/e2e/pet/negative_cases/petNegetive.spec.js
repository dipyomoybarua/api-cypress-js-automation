import '@shelex/cypress-allure-plugin';

import {
  constructPetRequest,
  constructPetInvalidRequest,
} from "../../../support/requestBody";
import { getRandomStatus } from "../../../helpers/utils";
import "../../../support/commands";
describe("This is my PET negative test cases ", () => {
  const validHeadder = Cypress.config("validCommonHeaders");
  const url = Cypress.config("baseUrl");
  const invalidBody = constructPetInvalidRequest();
  let responseData, petId;

  beforeEach(() => {
    // Create a new pet before each test
    cy.createNewInvalidPet().then((response) => {
      petId = response.body.id; 
    });
  });


  it("Uploads an image to the pet store", () => {
    cy.request({
      method: "POST",
      url: `${petId}/uploadImage`,
      headers: validHeadder,
      failOnStatusCode: false,
    }).then((response) => {
      responseData = response.body;
      if (response.status === 415) {
        // Handle the unsupported media type error
        cy.log(
          "Unsupported media type error: The server does not support the media type of the request."
        );
      } else {
        // Unexpected response status, fail the test
        throw new Error(`Unexpected response status: ${response.status}`);
      }
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
    });
  });
  it("Update an existing pet", () => {
    cy.request({
      method: "PUT",
      url: `url/neg/v1`,
      body: invalidBody,
      failOnStatusCode: false,
    }).then((response) => {
      responseData = response.body;

      if (response.status === 404) {
        // Handle the unsupported media type error
        cy.log("The server does not support the body type of the request.");
      } else {
        // Unexpected response status, fail the test
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    });
  });

  it("Finds Pets by status", () => {
    cy.request({
      method: "GET",
      url: `findbyStatusss`,
      followRedirect: false,
      failOnStatusCode: false,
    }).then((response) => {
      responseData = response.body;
      if (response.status === 404) {
        // Handle the unsupported media type error
        cy.log("It does not support the url type of the request.");
      } else {
        // Unexpected response status, fail the test
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      expect(response.body).to.have.property("type").that.equals("unknown");
      expect(response.body)
        .to.have.property("message")
        .that.includes("NumberFormatException");
    });
  });

  it("Find pet by ID", () => {
    cy.request({
      method: "GET",
      url: `{petId}`,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 404) {
        // Handle unexpected status code
        cy.log("The server does not support the body type of the request.");
      }else{
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    });
  });

  it("Updates a pet in the store with form data", () => {
    cy.request({
      method: "POST",
      url: `url/`,
      body: invalidBody,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status !== 415) {
        // Handle unexpected status code
        throw new Error(
          `Failed to POST pet by its body. Received status code: ${response.status}`
        );
      }
    });
  });
  it("This is for delete pet id", () => {
    if (petId) {
      cy.deletePetByIdInvalid(petId);
    }
  });
});
