/// <reference types="cypress" />

const { FiGitlab } = require("react-icons/fi");

// import Logon from '../support/pages/Logon';
// import Register from '../support/pages/Register';
// import Profile from '../support/pages/Profile';
// import NewIncident from '../support/pages/NewIncident';
//
describe("Ongs", () => {
  it("Cadastro", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("[data-cy=name]").type("Ong da FGA");
    cy.get("[data-cy=email]").type("fga@unb");
    cy.get("[data-cy=whatsapp]").type("(62)985268558");
    cy.get("[data-cy=city]").type("Gama");
    cy.get("[data-cy=uf]").type("DF");

    cy.server();
    cy.route("POST", "**/ongs").as("postOng");

    cy.get("[data-cy=submit]").click();

    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.equal(200);
      expect(xhr.response.body).has.property("id");
    });
  });

  it("Login", () => {
    const createOngId = Cypress.env("createdOngId");
    cy.log(createOngId);
    cy.visit("http://localhost:3000/");
    cy.get("input").type(createOngId);
    cy.get(".button").click();
  });
});
