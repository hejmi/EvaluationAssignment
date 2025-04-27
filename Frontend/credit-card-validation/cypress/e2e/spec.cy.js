/// <reference types="cypress" />

describe('Credit Card Validation', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('Displays the credit card form', () => {
		cy.contains('Pay with credit card').should('exist')
		cy.contains('Enter your card details to pay').should('exist')
	})

	it('Can submit a valid credit card', () => {
		cy.get('[data-test="name-input"]').type('John Doe')
		cy.get('[data-test="card-number-input"]').type('4111 1111 1111 1111')
		cy.get('[data-test="expiry-input"]').type('12/25')
		cy.get('[data-test="cvv-input"]').type('123')
		cy.contains('Submit').click()

		cy.contains('Your card details are valid').should('exist')
		cy.get('[data-test="valid-card-name"]').should('exist')
		cy.get('[data-test="valid-card-number"]').should('exist')
		cy.get('[data-test="valid-expiry"]').should('exist')
		cy.get('[data-test="valid-cvv"]').should('exist')

		cy.contains('Close').click()
	})

	it('Fails to submit an invalid credit card', () => {
		cy.get('[data-test="name-input"]').type('John Doe')
		cy.get('[data-test="card-number-input"]').type('1111 1111 1111 1111')
		cy.get('[data-test="expiry-input"]').type('12/23')
		cy.get('[data-test="cvv-input"]').type('123')
		cy.contains('Submit').click()

		cy.contains('Your card details are invalid').should('exist')
		cy.get('[data-test="invalid-card-number"]').should('exist')
		cy.get('[data-test="invalid-expiry"]').should('exist')

		cy.contains('Close').click()
	})

	it('Shows the correct card type based on card number', () => {
		cy.visit('/')
		cy.get('[data-test="card-number-input"]').type('1111 1111 1111 1111')
		cy.get('[data-test="card-type-icon"]')
			.invoke('attr', 'data-icon')
			.should('eq', 'unknown')
		cy.get('[data-test="card-number-input"]')
			.clear()
			.type('4111 1111 1111 1111')
		cy.get('[data-test="card-type-icon"]')
			.invoke('attr', 'data-icon')
			.should('eq', 'visa')
		cy.get('[data-test="card-number-input"]')
			.clear()
			.type('5111 1111 1111 1111')
		cy.get('[data-test="card-type-icon"]')
			.invoke('attr', 'data-icon')
			.should('eq', 'mastercard')
		cy.get('[data-test="card-number-input"]').clear()
	})
})
