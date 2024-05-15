import '@shelex/cypress-allure-plugin';
import {
  constructNewUserRequestBody,
  constructUserUpdateRequest,
} from "../../../support/userRequestBody";
import "../../../support/commands";
describe("This is my user positive test cases ", () => {
  const validHeadder = Cypress.config("validCommonHeaders");
  const url = Cypress.config("userBaseUrl");
  const userRequestBody = constructNewUserRequestBody();
  const updateUserBody = constructUserUpdateRequest();
  let responseData, username, userPassword;

  it("Creates a new valid user", () => {
    // Call the custom command to create a new valid user
    cy.createNewValidUser();
  });

  it("Creates list of users with given input array", () => {
    // Call the custom command to create a new valid user
    cy.createUserInput().then(({ username, password }) => {
      // Access the username and password here
      expect(username).to.exist;
      expect(password).to.exist;
      cy.log(`Username: ${username}, Password: ${password}`);
    });
  });

  it("Creates list of users with given input list ", () => {
    cy.request({
      method: "POST",
      url: url + `user/createWithList`,
      headers: validHeadder,
      body: [userRequestBody],
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to create user using array. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
      expect(responseData).to.have.property("message").that.is.a("string");
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });

  it("Gets the username for a specific user ID", () => {
    cy.createUserInput().then((userData) => {
      username = userData.username;
      userPassword = userData.password;
      expect(username).to.exist;
      expect(userPassword).to.exist;
      expect(userData).to.have.property("username").that.is.a("string");
      expect(userData).to.have.property("password").that.is.a("string");
      expect(userData).to.have.property("id").that.is.a("number");
      expect(userData).to.have.property("firstName").that.is.a("string");
      expect(userData).to.have.property("lastName").that.is.a("string");
      expect(userData).to.have.property("email").that.is.a("string");
      expect(userData).to.have.property("phone").that.is.a("string");
      expect(userData).to.have.property("userStatus").that.is.a("number");
    });
  });

  it("Update an existing user", () => {
    cy.request({
      method: "PUT",
      url: url + `user/${username}`,
      headers: validHeadder,
      body: updateUserBody,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to PUT user. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
      expect(responseData).to.have.property("message").that.is.a("string");
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });

  it("Logs user into the system", () => {
    cy.request({
      method: "GET",
      url: url + `user/login?username=${username}&password=${userPassword}`,
      headers: validHeadder,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to GET user data. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
      expect(responseData).to.have.property("message").that.is.a("string");
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });

  it("Logs out the user", () => {
    cy.request({
      method: "GET",
      url: url + `user/login`,
      headers: validHeadder,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to GET user data. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
      expect(responseData).to.have.property("message").that.is.a("string");
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
    });
  });
  it("Delete the user name", () => {
    cy.request({
      method: "DELETE",
      url: url + `user/${username}`,
      headers: validHeadder,
      //   body: updateUserBody,
    }).then((response) => {
      if (response.status !== 200) {
        // Handle unexpected status code
        throw new Error(
          `Failed to PUT user. Received status code: ${response.status}`
        );
      }
      responseData = response.body;
      expect(response.status).to.equal(200);
      expect(responseData).to.have.property("code").that.is.a("number");
      expect(responseData).to.have.property("type").that.is.a("string");
      expect(responseData).to.have.property("message").that.is.a("string");
      expect(response.headers)
        .to.have.property("content-type")
        .that.includes("application/json");
        });
  });
});
