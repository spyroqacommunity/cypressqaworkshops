export const careerPageCss = {
    mainTextHeader: 'h1',
    mainSubtextHeader: 'p.hero__subtext',
    officeNameText: 'div.office_city',
}

export const careerPage = {
    checkIfMainTextHeaderIsVisible: (text) => {
        cy.get(careerPageCss.mainTextHeader).should('have.text', text)
    },

    checkIfSingleOfficeNameIsVisible: (officeName) => {
        cy.get(careerPageCss.officeNameText).should('contain.text', officeName)
    },

    checkIfAllOfficesNameAreVisible: () => {
        cy.get(careerPageCss.officeNameText).should('contain.text', 'Bialystok')
        cy.get(careerPageCss.officeNameText).should('contain.text', 'Bournemouth')
        cy.get(careerPageCss.officeNameText).should('contain.text', 'Krakow')
        cy.get(careerPageCss.officeNameText).should('contain.text', 'Szczecin')
        cy.get(careerPageCss.officeNameText).should('contain.text', 'Wroclaw')
        cy.get(careerPageCss.officeNameText).should('contain.text', 'Zagreb')
    },

    clickOnSiteDetails: (text) => {
        cy.get(careerPageCss.officeNameText).contains(text).click({force:true})
    }


}