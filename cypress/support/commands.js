// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


Cypress.Commands.add('acceptCookiePolicy', () => {
    cy.get('#hs-eu-confirmation-button').click()
})

Cypress.Commands.add('declineCookiePolicy', () => {
    cy.get('#hs-eu-decline-button').click()
})

Cypress.Commands.add('checkIfCookieBarNotVisible', () => {
    cy.get('#hs-eu-cookie-confirmation-inner').should('not.be.visible')
})

Cypress.Commands.add('checkIfCookieBarVisible', () => {
    cy.get('#hs-eu-cookie-confirmation-inner').should('be.visible')
})

Cypress.Commands.add('checkIfSelectedSiteFromCarrerTabIsVisible', (siteName) => {
    cy.get('.container.container-xl').should('contain.text', siteName)
})


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