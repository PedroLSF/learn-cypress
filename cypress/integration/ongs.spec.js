/// <reference types="cypress" />

import Logon from '../support/pages/Logon';
import Register from '../support/pages/Register';
import Profile from '../support/pages/Profile';
import NewIncident from '../support/pages/NewIncident';

describe('Ongs', () => {
    it('Cadastro', () => {
        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastroDeOngComSucesso();
    });

    it('Login', () => {
        Logon.acessarLogin();
        Logon.preencherLogin();
    });

    it.skip('Logout', () => {
        cy.login();
        Profile.clicarNoBotaoLogout();
    });

    it('Novos Casos', () => {
        cy.login()

        Profile.clicarNoBotaoCadastrarNovosCasos();
        NewIncident.preencherCadastroDeCaso();
        NewIncident.validarCadastroDeCasoComSucesso();
    });

    it('Excluir Casos', () => {
        cy.createNewIncident();
        cy.login();

        Profile.clicarNoBotaoExcluirUmCaso();
        Profile.validarExclusaoDeCasoComSucesso();
    });
    
});