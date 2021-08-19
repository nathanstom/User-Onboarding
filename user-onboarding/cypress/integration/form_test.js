const baseUrl = "http://localhost:3000/"

describe('The Form Page', () => {

    it("Successfully loads", () => {
        cy.visit(baseUrl)
    })


})

describe('Fill Out Form', () => {
    it("Fill out and check form for correct values", () => {

        cy.get('input[name=username]').should('have.value', '').type('mikesflapper').should('have.value', 'mikesflapper')
        cy.get('input[name=email]').should('have.value', '').type('nathanjobstom@gmail.com').should('have.value', 'nathanjobstom@gmail.com')
        cy.get('input[name=password]').should('have.value', '').type('password123').should('have.value', 'password123')
        cy.get('input[name=agreedTOS]').should('be.visible').and('not.be.checked').check()
        cy.get('#submit').should('not.be.disabled')
    })
})

describe('Submit Form', () => {
    it('Looks for a new user card with the correct info', () => {
        cy.get('#submit').click()
        cy.get('.user h2').contains('mikesflapper')
        cy.get('.user h3').contains('nathanjobstom@gmail.com')
    })
})

describe('Form Validation', () => {
    it('Checks for validation if input is left empty', () => {
        cy.get('#username').type('mikesflapper')
        cy.get('#password').type('password123')
        cy.get('#email').type('n{backspace}')
        cy.get('#tos').check()
        cy.get('.errorMsg').contains('Must include email address.')
    })
}) 