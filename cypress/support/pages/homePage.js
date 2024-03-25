/// <reference types="cypress" />

const ROW_TABLE_LOCATOR = 'table tr';
const LBL_HTML_NO_ID_LOCATOR = 'HTML Table with no id';
const LBL_EMAIL_ME_LOCATOR = 'Email Me!';
const LBL_SUCCESSFULLY_EMAIL_LOCATOR = 'Thanks for contacting us';
const TXT_NAME_LOCATOR = 'input[data-original_id="name"]';
const TXT_EMAIL_LOCATOR = 'input[data-original_id="email"]';
const BTN_SUBMIT_LOCATOR = 'button[type="submit"]';

class HomePage {
    getListOfRowTable() {
        return cy.contains('div', LBL_HTML_NO_ID_LOCATOR).find(ROW_TABLE_LOCATOR);
    }

    getNameTextbox() {
        return cy.get(TXT_NAME_LOCATOR);
    }
    getEmailTextbox() {
        return cy.get(TXT_EMAIL_LOCATOR);
    }
    getEmailMeButton() {
        return cy.contains(BTN_SUBMIT_LOCATOR, LBL_EMAIL_ME_LOCATOR);
    }
    getSuccessfullyEmailButton() {
        return cy.contains('p', LBL_SUCCESSFULLY_EMAIL_LOCATOR, { timeout: 10000 });
    }
}
export default HomePage