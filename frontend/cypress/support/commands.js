Cypress.Commands.add("createOng", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:8000/ongs",
    body: {
      name: "Ong FGA",
      email: "teste@gmail.com",
      whatsapp: "62985268888",
      city: "Gama",
      uf: "DF",
    },
  }).then((response) => {
    expect(response.body.id).is.not.null;
    Cypress.env("createdOngId", response.body.id);
  });
});
