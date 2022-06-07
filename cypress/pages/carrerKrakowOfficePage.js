const careerPageKrakowOfficeCss = {
    siteNameInHeader: '.container.container-xl',
    jobTile: 'div.offer'
}

export const careerKrakowOfficePage = {
    checkIfMainTextHeaderIsVisible: (text) => {
        cy.get(careerPageKrakowOfficeCss.siteNameInHeader).should('have.text', text)
    },

    checkIfAtLeastOneJobOfferIsAvailable: () => {
        cy.get(careerPageKrakowOfficeCss.jobTile).should('have.length.greaterThan', 0)
    }

}