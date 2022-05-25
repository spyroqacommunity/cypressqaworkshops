declare namespace Cypress {
    interface Chainable {
        checkIfCookieBarVisible(text: string): Cypress.Chainable;
        declineCookiePolicy(text: string): Cypress.Chainable;
        checkIfCookieBarNotVisible(text: string): Cypress.Chainable;
        acceptCookiePolicy(text: string): Cypress.Chainable;
        checkIfSelectedSiteFromCarrerTabIsVisible(text: string): Cypress.Chainable;
    }
}