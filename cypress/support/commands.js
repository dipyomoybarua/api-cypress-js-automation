import {
    constructNewPetRequestBody,
    constructPetRequest,
    constructPetInvalidRequest,
  } from "../support/requestBody";
  import { constructNewUserRequestBody } from "../support/userRequestBody";
  const validHeadder = Cypress.config("validCommonHeaders");
  const url = Cypress.config("baseUrl");
  const userBaseUrl = Cypress.config("userBaseUrl");
  const petRequestBody = constructNewPetRequestBody();
  const invalidBody = constructPetInvalidRequest();
  const validUserBody = constructNewUserRequestBody();
  
  let responseData, petId;
  Cypress.Commands.add("createNewPet", () => {
    cy.request({
      method: "POST",
      url: url,
      headers: validHeadder,
      body: petRequestBody,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to create pet. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      petId = response.body.id;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("id").that.is.a("number");
      expect(responseData).to.have.property("category").that.is.an("object");
      expect(responseData.category).to.have.property("id").that.is.a("number");
      expect(responseData.category).to.have.property("name").that.is.a("string");
      expect(responseData).to.have.property("name").that.is.a("string");
      expect(response.body)
        .to.have.property("photoUrls")
        .that.is.an("array")
        .and.has.lengthOf.at.least(1);
      expect(response.body)
        .to.have.property("tags")
        .that.is.an("array")
        .and.has.lengthOf.at.least(1);
      expect(response.body)
        .to.have.property("status")
        .that.is.a("string")
        .and.is.oneOf(["available", "pending", "sold"]);
    });
  });
  
  Cypress.Commands.add("deletePetById", () => {
    cy.request({
      method: "DELETE",
      url: `${petId}`,
      headers: validHeadder,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to delete pet. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
      expect(responseData).to.have.property("message").that.is.a("string");
    });
  });
  
  Cypress.Commands.add("createNewInvalidPet", () => {
    cy.request({
      method: "POST",
      url: `v2/url`,
      body: invalidBody,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status !== 404) {
        // Handle unexpected status code
        throw new Error(
          `Failed to create pet. Received status code: ${response.status}`
        );
      }
    });
  });
  
  Cypress.Commands.add("deletePetByIdInvalid", () => {
    cy.request({
      method: "DELETE",
      url: `${petId}`,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status !== 404) {
        // Handle unexpected status code
        throw new Error(
          `Failed to delete pet. Received status code: ${response.status}`
        );
      }
    });
  });
  
  Cypress.Commands.add("createNewValidUser", () => {
    cy.request({
      method: "POST",
      url: userBaseUrl + `user`,
      headers: validHeadder,
      body: validUserBody,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to create user. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
      expect(responseData).to.have.property("message").that.is.a("string");
    });
  });
  
  Cypress.Commands.add("createUserInput", () => {
      return cy.request({
        method: "POST",
        url: userBaseUrl + "user/createWithArray",
        headers: validHeadder,
        body: [validUserBody],
      }).then((response) => {
        if (response.status !== 200) {
          throw new Error(`Failed to create user. Received status code: ${response.status}`);
        }
        const responseData = response.body;
        expect(response.status).to.equal(200);
        expect(responseData).to.have.property("code").that.is.a("number");
        expect(responseData).to.have.property("type").that.is.a("string");
        expect(responseData).to.have.property("message").that.is.a("string");
        expect(response.headers)
          .to.have.property("content-type")
          .that.includes("application/json");
        const { username, password,id,firstName,lastName,email,phone,userStatus } = validUserBody;
        return {
          username,
          password,id,firstName,lastName,email,phone,userStatus
        };
      }).then((userData) => {
        // Returning the user data
        return userData;
      });
    });
    