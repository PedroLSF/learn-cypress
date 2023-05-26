const el = require('./elements').ELEMENTS;

class NewIncident {
  preencherCadastroDeCaso(){
    cy.get(el.title).type('Dogs da FGA');
    cy.get(el.description).type('Ajudar os cachorros da FGA');
    cy.get(el.value).type(150);

    cy.route('POST', '**/incidents').as('newIncident');

    cy.get(el.submit).click();    
  }

  validarCadastroDeCasoComSucesso(){
    cy.wait('@newIncident').then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });    
  }
}

export default new NewIncident();