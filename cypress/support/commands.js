// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkIfEleExists', (elementName) => {
    let element = '';
    let isExist = false;
    switch (elementName) {
        case 'Successfully email message':
            element = 'p:contains("Thanks for contacting us")';
            break;
        case 'Name textbox':
            element = 'input[data-original_id="name"]';
            break;
        default:
            element = elementName;
            break;
    }
    // cy.wait(1000);
    if (Cypress.$(element).length) {
        isExist = true;
    }

    return cy.wrap(isExist);
});