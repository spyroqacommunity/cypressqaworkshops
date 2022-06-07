/// <reference types="cypress" />

import {careerPage} from "../pages/careerPage"
import {careerKrakowOfficePage} from "../pages/carrerKrakowOfficePage"

describe('Career section tests', () => {

    beforeEach(() => {
        cy.visit(Cypress.env("careerUrl"))
    })

    it('Check if Cookies Policy could be declined', () => {
        cy.checkIfCookieBarVisible()
        cy.declineCookiePolicy()
        cy.checkIfCookieBarNotVisible()
    })

    it('Should be able to see main header text after opeining career section', () => {
        careerPage.checkIfMainTextHeaderIsVisible('Join one of fastest growing tech companies in Europe & work from anywhere ')
    })

    it('Should check if all offices are visible - SINGLE method per office', () => {
        careerPage.checkIfSingleOfficeNameIsVisible('Bialystok')
        careerPage.checkIfSingleOfficeNameIsVisible('Bournemouth')
        careerPage.checkIfSingleOfficeNameIsVisible('Krakow')
        careerPage.checkIfSingleOfficeNameIsVisible('Szczecin')
        careerPage.checkIfSingleOfficeNameIsVisible('Wroclaw')
        careerPage.checkIfSingleOfficeNameIsVisible('Zagreb')
    })

    it('Should check if all offices are visible - one method for all offices', () => {
        careerPage.checkIfAllOfficesNameAreVisible()
    })

//  TIP: 'it.only' spowoduje uruchomienie jedynie oznaczonego tym tagiem ('only') testu/testów 
    it('Should be able to open Krakow office details from career tab', () => {
        careerPage.clickOnSiteDetails('Krakow')
        cy.checkIfSelectedSiteFromCarrerTabIsVisible('Krakow, PL')
        careerKrakowOfficePage.checkIfAtLeastOneJobOfferIsAvailable()
    })

    // ZADANIE 1 - z poziomu strony 'Careers' otwórz podstronę biura w Białymstoku i sprawdź czy się na niej znajdujesz (sprawdź URL)
    // it('Should be able to open Bialystok office details and should see Bialystok in URL', () => {

    // })

    // ZADANIE 2 - z poziomu strony 'Careers' sprawdź czy mozliwe jest wyslanie zapytania z formularza kontaktowe bez uzupełniania pól oznaczonych jako obowiązkowe (symbolem *) 
    // it('Should not be able to send contanct form message without filling out the mandatory fields', () => {

    // })

    // ZADANIE 3 - z poziomu strony 'Careers' sprawdz czy URLe social mediow w stopce strony prowadzą do stron nalezących do Spyro
    // it(`Should check if social media urls link to Spyro's pages`, () => {

    // })
 
})