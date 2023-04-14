///<reference types= "cypress"/>

describe('tarefas', () => {

    let testData;

    before(()=>{
        cy.fixture('tasks').then(t =>{
            testData = t
        })
    })
    
    context('cadastro', () => {
        it('Deve adicionar tarefas', () => {

            const taskName = "Ler um livro node.js"

            cy.removeTask(taskName)
            cy.createTask(taskName)
            cy.contains("main div p", taskName)
                .should("be.visible")
        })

        it("Nao deve ter tarefa duplicada", () => {

            const task = {
                name: "Estudar Javascript",
                is_done: false
            }

            cy.removeTask(task.name)
            cy.postTask(task)
            cy.createTask(task.name)

            cy.get(".swal2-html-container")
                .should("be.visible")
                .should("have.text", "Task already exists!")
        })

        it('campo obrigatorio', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })

    context('atualização', () => {
        it('finalizar tarefa', () => {

            const task = testData.dup

            cy.removeTask(task.name)
            cy.postTask(task)

            cy.visit('http://localhost:8080')
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })

    })

    context('exclusão', () => {
        it('excluir tarefa', () => {

            const task = {
                name: 'Pagar conta de consumo',
                is_done: 'false'
            }

            cy.removeTask(task.name)
            cy.postTask(task)

            cy.visit('/')
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })

    })
})

