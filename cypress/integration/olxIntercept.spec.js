/// <reference types="cypress" />

import {
    olxLocators
} from "../pages/olxPages.js"
import * as olxBannerSample from "../fixtures/olxBannerSample.json"

describe('Tests main OLX page using intercept', () => {

    it('Should be able to check search request', () => {
        let searchText = "truskawki"
        cy.intercept('GET', `**/offers/metadata/search/**`).as('SearchForItems')
        cy.visit('https://www.olx.pl/')
        cy.get(olxLocators.acceptCookies).click()
        cy.get(olxLocators.searchInput).type(searchText)
        cy.get(olxLocators.searchButton).click()
        cy.wait('@SearchForItems').its('request.url').should('contain', searchText)
        cy.url().should('contain', searchText)
    })

    it('Should be able to simulate 500 on few categories', () => {
        cy.intercept('GET', `https://categories.olxcdn.com/promo/categories/active?brand=olxpl&lang=pl`, {
            statusCode: 500
        }).as('500onPromoCategories')
        cy.visit('https://www.olx.pl/')
        cy.wait('@500onPromoCategories')
        cy.get(olxLocators.acceptCookies).click()
    })

    it('Should be able to change image and titles on Promo Categories', () => {
        cy.intercept('GET', `https://categories.olxcdn.com/promo/categories/active?brand=olxpl&lang=pl`, {
            body: [{
                    "icon": {
                        "image_url": "https://data3.cupsell.pl/upload/generator/63755/640x420/3032453_print_1.png?resize=max_sizes&key=55f9a22768eed085006592c1174c0235",
                        "big_image_url": "https://data3.cupsell.pl/upload/generator/63755/640x420/3032453_print_1.png?resize=max_sizes&key=55f9a22768eed085006592c1174c0235"
                    },
                    "name": "Zaba z przesyłką za 1 zł",
                    "link": {
                        "url": "https://www.olx.pl/dom-ogrod/wyposazenie-wnetrz/posciel/?search%5Bcourier%5D=1\u0026utm_source=olx\u0026utm_medium=promocategory\u0026utm_campaign=posciel-za1zl",
                        "is_external": false
                    }
                },
                {
                    "icon": {
                        "image_url": "https://i.pinimg.com/280x280_RS/ac/cd/e1/accde1bcd977e53ec5d29c934fd0b220.jpg",
                        "big_image_url": "https://i.pinimg.com/280x280_RS/ac/cd/e1/accde1bcd977e53ec5d29c934fd0b220.jpg"
                    },
                    "name": "Zostan kocurem finansow",
                    "link": {
                        "url": "https://www.olx.pl/praca/finanse-ksiegowosc/?utm_source=olx\u0026utm_medium=promocategory\u0026utm_campaign=praca-finanse",
                        "is_external": false
                    }
                },
                {
                    "icon": {
                        "image_url": "https://client4659.idosell.com/data/gfx/pictures/large/7/3/4237_3.png",
                        "big_image_url": "https://client4659.idosell.com/data/gfx/pictures/large/7/3/4237_3.png"
                    },
                    "name": "Domki na miare mozliwosci",
                    "link": {
                        "url": "https://www.olx.pl/noclegi/?search%5Bfilter_enum_type%5D%5B0%5D=house\u0026utm_source=olx\u0026utm_medium=promocategory\u0026utm_campaign=noclegi_domki",
                        "is_external": false
                    }
                }
            ]
        }).as('changedCategories')
        cy.visit('https://www.olx.pl/')
        cy.wait('@changedCategories')
        cy.get(olxLocators.acceptCookies).click()
    })

    it('Should be able to simulate 500 error on baner', () => {
        cy.intercept('GET', `**/onb/content**`, {
            statusCode: 500
        }).as('500errorOnBaner')
        cy.visit('https://www.olx.pl/')
        cy.wait('@500errorOnBaner')
        cy.get(olxLocators.acceptCookies).click()
        cy.get(olxLocators.bannerText).should('not.be.visible')
        cy.get(olxLocators.bannerLink).should('not.be.visible')
    })

    it('Should be able to change banner text and url', () => {
        cy.intercept(
            'GET',
            '**/onb/content**', {
                fixture: 'olxBannerSample.json'
            }
        ).as('olxBannerResponse')
        cy.visit('https://www.olx.pl/')
        cy.wait('@olxBannerResponse')
        cy.get(olxLocators.acceptCookies).click()
        cy.get(olxLocators.bannerText).should('have.text', olxBannerSample[0].text)
        cy.get(olxLocators.bannerLink).should('have.text', olxBannerSample[0].ctaLabel)
        cy.get(olxLocators.bannerLink).should('have.attr', 'href', olxBannerSample[0].ctaUrl)
    })

    //ZADADNIE 1: Na stronie głównej x-kom.pl wyszukaj dowolny produkt po tekście i sprawdź czy w requeście "searchPromotion" jest wyszukiwana fraza
    // it('Should search for promotion items by search text', () => {

    // })

    //ZADANIE 2 Zmień nazwę i cenę pierwszego rekomendowanego produktu na stronie głównej x-kom.pl
    // it('Should be able to change name and price of first recommended imtem', () => {

    // })

})