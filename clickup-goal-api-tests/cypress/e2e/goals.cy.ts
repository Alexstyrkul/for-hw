describe('ClickUp Goal lifecycle — full test', () => {
  const token        = Cypress.env('clickUpToken')
  const workspaceId  = Cypress.env('workspaceId')
  const goalFolderId = Cypress.env('goalFolderId')
  const baseUrl      = Cypress.config('baseUrl')

  const headers = {
    Authorization: token,
    'Content-Type': 'application/json'
  }

  it('create → get → update → delete goal', () => {
    const goalName = 'Goal from Cypress'
    const dueDate  = Date.now() + 259200000

    cy.request({
      method: 'POST',
      url: `${baseUrl}/team/${workspaceId}/goal`,
      headers,
      body: {
        name: goalName,
        description: 'Automated test goal',
        due_date: dueDate,
        multiple_owners: false,
        owners: [],
        folder_id: goalFolderId
      }
    })
    .then(res => {
      expect(res.status).to.eq(200)
      const goalId = res.body.goal.id

      return cy.request({
        method: 'GET',
        url: `${baseUrl}/goal/${goalId}`,
        headers
      }).then(() => {
        return cy.request({
          method: 'PUT',
          url: `${baseUrl}/goal/${goalId}`,
          headers,
          body: { name: 'Updated Goal' }
        })
      }).then(() => {
        return cy.request({
          method: 'DELETE',
          url: `${baseUrl}/goal/${goalId}`,
          headers
        })
      }).then(delRes => {
        expect(delRes.status).to.eq(200)
      })
    })
  })

  it('Negative test: GET goal without token → 400', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/goal/bad_id`,
      failOnStatusCode: false
    }).its('status').should('eq', 400)
  })
})
