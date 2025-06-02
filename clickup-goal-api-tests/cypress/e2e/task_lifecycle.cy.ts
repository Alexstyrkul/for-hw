describe('ClickUp Task lifecycle — full test with Personal Token', () => {
const token = Cypress.env('clickUpToken')
const listId = Cypress.env('listId')
  let taskId: string

  it('should create, get, update and delete a task', () => {
    // 1. Create task
    cy.request({
      method: 'POST',
      url: `https://api.clickup.com/api/v2/list/${listId}/task`,
      headers: {
        Authorization: token
      },
      body: {
        name: 'Task from Cypress',
        description: 'Created in Cypress test',
        status: 'to do'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      taskId = res.body.id

      // 2. Get task
      cy.request({
        method: 'GET',
        url: `https://api.clickup.com/api/v2/task/${taskId}`,
        headers: {
          Authorization: token
        }
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.name).to.eq('Task from Cypress')
      })

      // 3. Update task
      cy.request({
        method: 'PUT',
        url: `https://api.clickup.com/api/v2/task/${taskId}`,
        headers: {
          Authorization: token
        },
        body: {
          name: 'Updated Task from Cypress'
        }
      }).then((res) => {
        expect(res.status).to.eq(200)
      })

      // 4. Delete task
      cy.request({
        method: 'DELETE',
        url: `https://api.clickup.com/api/v2/task/${taskId}`,
        headers: {
          Authorization: token
        },
        failOnStatusCode: false
      }).then((res) => {
        expect([200, 204]).to.include(res.status)
      })
    })
  })
})
