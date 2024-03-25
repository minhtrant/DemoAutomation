/// <reference types="cypress" />

import HomePage from "../../support/pages/homePage";

let homePage = new HomePage();

describe('Test suite - HTML No ID table', () => {
    beforeEach(() => {
        cy.visit('https://ultimateqa.com/simple-html-elements-for-automation/');
    })

    it('verify that the first letter of each word in the title is in upper case excluding the preposition', () => {
        let preWords = ['a', 'an', 'the', 'and', 'of', 'but', 'ot', 'for', 'nor', 'with', 'on', 'at', 'to', 'from', 'by', 'in'];
        let expectedTitleName = '';
        let observedTitleName = '';

        homePage.getListOfRowTable().then(tableRow => {
            for (let index = 1; index < tableRow.length; index++) {
                cy.wrap(tableRow).eq(index).find('td').first().then(titleName => {
                    observedTitleName = titleName.text();
                    expectedTitleName = '';
                    // Uppercase each words within the string as expected result
                    titleName.text().split(' ').forEach(word => {
                        if (!preWords.includes(word))
                            word.charAt(0).toUpperCase();
                        expectedTitleName = expectedTitleName + ` ${word}`;
                    })
                    // Compare the string after being uppercase and observed string
                    cy.wrap(observedTitleName).should('eq', expectedTitleName.trim());
                })
            }
        })
    })

    it('verify that there is no Manual work', () => {
        homePage.getListOfRowTable().then(tableRow => {
            for (let index = 1; index < tableRow.length; index++) {
                cy.wrap(tableRow).eq(index).find('td').eq(1).then(workNameList => {
                    cy.wrap(workNameList).each(workName => {
                        // Check each work name if it is Manual work or not
                        cy.wrap(workName.text()).should('not.equal', 'Manual');
                    })
                })
            }
        })
    })

    it('verify that all roles have at least $100,000 as salary', () => {
        homePage.getListOfRowTable().then(tableRow => {
            for (let index = 1; index < tableRow.length; index++) {
                cy.wrap(tableRow).eq(index).find('td').eq(2).then(salariesList => {
                    cy.wrap(salariesList).each(salary => {
                        // Convert string with comma to be number and compare with $100,000
                        cy.wrap(parseFloat(salary.text().substring(1, salary.text().length - 1).replace(/,/g, ''))).should('be.gte', 100000);
                    })
                })
            }
        })
    })
})
