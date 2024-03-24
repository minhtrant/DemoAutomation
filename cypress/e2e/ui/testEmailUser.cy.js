/// <reference types="cypress" />

import HomePage from "../../support/pages/homePage";

let homePage = new HomePage();

describe('Test suite - Email user', () => {
    beforeEach(() => {
        cy.visit('https://ultimateqa.com/simple-html-elements-for-automation/');
    })

    it('Verify that user is able to send email 10 times', () => {

        for (let index = 1; index <= 10; index++) {
            homePage.getNameTextbox().clear().type(`Name ${index}`);
            homePage.getEmailTextbox().clear().type(`email${index}@mail.com`);
            homePage.getEmailMeButton().click();

            // Sometimes the website needs time to load fully elements, so the page will be reload while running automation
            // The code below is using to handle this issue => clicked the Email Me! button again after the page just reloaded
            // This issue does not happen when tested by manual
            cy.checkIfEleExists('Successfully email message').then(isExist => {
                if (!isExist) {
                    homePage.getEmailMeButton().click();
                }
            })
            homePage.getSuccessfullyEmailButton().should('exist');

            cy.reload();
        }
    })
})
