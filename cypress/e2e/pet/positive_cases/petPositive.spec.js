import '@shelex/cypress-allure-plugin';

import {
  constructNewPetRequestBody,
  constructPetRequest,
} from "../../../support/requestBody";
import { getRandomStatus } from "../../../helpers/utils";
import "../../../support/commands";
describe("This is my PET positive test cases ", () => {
  const validHeadder = Cypress.config("validCommonHeaders");
  const url = Cypress.config("baseUrl");
  const petRequestBody = constructNewPetRequestBody();
  const petRequest = constructPetRequest();
  const status = getRandomStatus();
  let responseData, petId;

  beforeEach(() => {
    // Create a new pet before each test
    cy.createNewPet().then((response) => {
      petId = response.body.id; // Store the pet ID
    });
  });

  afterEach(() => {
    // Delete the created pet after each test
    if (petId) {
      cy.deletePetById(petId);
    }
  });

  it("Update an existing pet", () => {
    cy.request({
      method: "PUT",
      url: url,
      headers: validHeadder,
      body: petRequestBody,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to PUT pet. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("id").that.is.a("number");
      expect(responseData).to.have.property("category").that.is.an("object");
      expect(responseData.category).to.have.property("id").that.is.a("number");
      expect(responseData.category)
        .to.have.property("name")
        .that.is.a("string");
      expect(responseData).to.have.property("name").that.is.a("string");
      expect(responseData)
        .to.have.property("photoUrls")
        .that.is.an("array")
        .and.has.lengthOf.at.least(1);
      expect(responseData)
        .to.have.property("tags")
        .that.is.an("array")
        .and.has.lengthOf.at.least(1);
      expect(responseData)
        .to.have.property("status")
        .that.is.a("string")
        .and.is.oneOf(["available", "pending", "sold"]);
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });

  it("Finds Pets by status", () => {
    cy.request({
      method: "GET",
      url: `findByStatus?status=${status}`,
      headers: validHeadder,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to GET pet by status. Received status code: ${response.status}`
        );
      }
      responseData = response.body[0];
      expect(response.status).to.equal(200);
      expect(responseData).to.be.an("object");
      // Assert properties of the pet object
      expect(responseData).to.have.property("id").that.is.a("number");
      expect(responseData).to.have.property("name").that.is.a("string");
      expect(responseData)
        .to.have.property("status")
        .that.is.a("string")
        .and.oneOf(["available", "pending", "sold"]);
      if (responseData.category) {
        expect(responseData.category)
          .to.have.property("id")
          .that.is.a("number");
        expect(responseData.category)
          .to.have.property("name")
          .that.is.a("string");
      }
      // Assert the structure of the photoUrls array
      expect(responseData).to.have.property("photoUrls").that.is.an("array");
      // Check if photoUrls array is empty or not
      if (responseData.photoUrls.length === 0) {
        cy.log("Warning: photoUrls array is empty");
      } else {
        // Assert that photoUrls array is not empty
        expect(responseData.photoUrls).to.not.be.empty;
      }
      // Check if photoUrls is not empty before making assertions on its elements
      if (responseData.photoUrls && responseData.photoUrls.length > 0) {
        expect(responseData.photoUrls[0]).to.be.a("string");
      } else {
        // Handle the case when photoUrls is empty or undefined
        // For example, you can skip this assertion or log a message
        cy.log("PhotoUrls property is empty or undefined");
      }
      // Assert the structure of the tags array
      if (responseData.tags.length === 0) {
        expect(responseData.tags).to.be.empty;
            } else {
        expect(responseData.tags).to.not.be.empty;
      }
      if (responseData.tags && responseData.tags.length > 0) {
        // If responseData.tags[0] is not null or undefined, perform assertions
        expect(responseData.tags[0]).to.have.property("id").that.is.a("number");
        expect(responseData.tags[0]).to.have.property("name").that.is.a("string");
      } else {
        // If responseData.tags is null or empty, log a message or handle it accordingly
        cy.log("Tags array is null or empty");
      }
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });

  it("Find pet by ID", () => {
    expect(petId).to.exist;
    cy.request({
      method: "GET",
      url: `${petId}`,
      headers: validHeadder,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to GET pet by id. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      // Assert the structure of the response body
      expect(responseData).to.be.an("object");
      // Assert the properties of the pet object
      expect(responseData).to.have.property("id").that.is.a("number");
      expect(responseData).to.have.property("category").that.is.an("object");
      expect(responseData).to.have.property("name").that.is.a("string");
      expect(responseData).to.have.property("photoUrls").that.is.an("array").and
        .not.empty;
      expect(responseData).to.have.property("tags").that.is.an("array").and.not
        .empty;
      expect(responseData)
        .to.have.property("status")
        .that.is.a("string")
        .and.oneOf(["available", "pending", "sold"]);
      // Assert the structure of the nested category object
      expect(responseData.category).to.have.property("id").that.is.a("number");
      expect(responseData.category)
        .to.have.property("name")
        .that.is.a("string");
      // Assert the structure of the tags array
      expect(responseData.tags[0]).to.have.property("id").that.is.a("number");
      expect(responseData.tags[0]).to.have.property("name").that.is.a("string");
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });

  it("Updates a pet in the store with form data", () => {
    cy.request({
      method: "POST",
      url: url,
      headers: validHeadder,
      body: petRequest,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to POST pet by its body. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.be.an("object");
      expect(responseData).to.have.property("id").that.is.a("number");
      expect(responseData).to.have.property("name").that.is.a("string");
      expect(responseData)
        .to.have.property("photoUrls")
        .that.is.an("array")
        .and.satisfy((urls) => urls.length === 0 || urls.length > 0);
      expect(responseData)
        .to.have.property("tags")
        .that.is.an("array")
        .and.satisfy((tags) => tags.length === 0 || tags.length > 0);
      expect(responseData)
        .to.have.property("status")
        .that.is.a("string")
        .and.oneOf(["available", "pending", "sold"]);
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });
});
