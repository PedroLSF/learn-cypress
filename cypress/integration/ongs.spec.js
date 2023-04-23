/// <reference types="cypress" />

describe('Ongs', () => {
     it('Cadastro', () => {
        cy.visit('http://localhost:3000/register');
        // Cy.get -> Busca o Elemento
        // .type -> Digita
        cy.get('[data-cy=name]').type('Dogs da FGA');
        cy.get('[data-cy=email]').type('pedro.fernandes@italents.com');
        cy.get('[data-cy=whatsapp]').type('62985268558');
        cy.get('[data-cy=city]').type('Gama');
        cy.get('[data-cy=uf]').type('DF');

        // Routing
        // Criar uma rota com cy.route()
        // Atribuir rota a um alias
        // Esperar com cy.wait e fazer uma validação

        cy.route('POST', '**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

        
    });
    it('Login', () => {
        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();
    });
});