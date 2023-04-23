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
    it('Logout', () => {
        cy.login();
        cy.get('button').click();
    });
    it('Cadastro de Novos Casos', () => {
        cy.login();
        cy.get('.button').click();
        cy.get('[placeholder="Título do caso"]').type('Ração');
        cy.get('textarea').type('Animais presenten na FGA precisam de ração');
        cy.get('[placeholder="Valor em reais"]').type('150');

        //
        cy.route('POST', '**/incidents').as('newIncident');

        cy.get('.button').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });
    it('Excluir um caso', () => {
        cy.createNewIncident();
        cy.login();

        cy.route('DELETE', '**/incidents/*').as('deleteIncident');
        cy.get('li > button > svg').click();
        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    });
});