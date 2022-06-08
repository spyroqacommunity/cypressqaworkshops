/// <reference types="cypress" />

import { olxLocators } from "../pages/olxPages.js"
import * as olxBannerSample from "../fixtures/olxBannerSample.json"

describe('Tests main OLX page using intercept', () => {

    it('Should be able to check search request', () => {
        let searchText = "truskawki"
        cy.intercept('GET',`**/offers/metadata/search/**`).as('SearchForItems')
        cy.visit('https://www.olx.pl/')
        cy.get(olxLocators.acceptCookies).click()
        cy.get(olxLocators.searchInput).type(searchText)
        cy.get(olxLocators.searchButton).click()
        cy.wait('@SearchForItems').its('request.url').should('contain', searchText)
        cy.url().should('contain', searchText)
    })
//PONIZSZE NADAL DO ZMIANY
    it('Should be able to mock no items found', () => {
        let searchText = "truskawki"
        cy.intercept(
            'GET',
            `**/offers/metadata/search/**`,
            { fixture: 'olxNoItemsFound.json'}
        )
        cy.visit('https://www.olx.pl/')
        cy.get(olxLocators.acceptCookies).click()
        cy.get(olxLocators.searchInput).type(searchText)
        cy.get(olxLocators.searchButton).click()
        cy.url().should('contain', searchText)
        cy.get(olxLocators.singleItemCard).should('have.length', 0)
    })

    it('Should be able to change banner text and url', () => {
        cy.intercept(
            'GET',
            '**/onb/content**',
            { fixture: 'olxBannerSample.json' }
        ).as('olxBannerResponse') 
        cy.visit('https://www.olx.pl/')
        cy.wait('@olxBannerResponse')
        cy.get(olxLocators.acceptCookies).click()
        cy.get(olxLocators.bannerText).should('have.text', olxBannerSample[0].text)
        cy.get(olxLocators.bannerLink).should('have.text', olxBannerSample[0].ctaLabel)
        cy.get(olxLocators.bannerLink).should('have.attr', 'href', olxBannerSample[0].ctaUrl)
    })
})