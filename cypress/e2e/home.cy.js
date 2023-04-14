///<reference types= "cypress"/>
describe('webapp deve estar online', () => {
  it('site on-line', () => {
    cy.visit('/')
    cy.title().should('eq','Gerencie suas tarefas com Mark L')
  })
})