describe('ClickUp Goal lifecycle — full test', () => {
  const token = Cypress.env('clickUpToken')
  const workspaceId = Cypress.env('workspaceId')
  const goalFolderId = Cypress.env('goalFolderId')

  let createdGoalId: string

  it('should create, get, update and delete a goal', () => {
    // CREATE
    cy.request({
      method: 'POST',
      url: `/team/${workspaceId}/goal`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: {
        name: 'Goal from Cypress',
        description: 'Automated test goal',
        due_date: Date.now() + 7 * 24 * 60 * 60 * 1000,
        multiple_owners: false,
        owners: [],
        goal_folder_id: goalFolderId
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      createdGoalId = res.body.id
    })

    // GET
    cy.request({
      method: 'GET',
      url: `/goal/${createdGoalId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.name).to.eq('Goal from Cypress')
    })

    // UPDATE
    cy.request({
      method: 'PUT',
      url: `/goal/${createdGoalId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: { name: 'Updated Goal Name' }
    }).then((res) => {
      expect(res.status).to.eq(200)
    })

    // DELETE
    cy.request({
      method: 'DELETE',
      url: `/goal/${createdGoalId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Negative test: GET Goal without token — should return 401', () => {
    cy.request({
      method: 'GET',
      url: `/goal/someInvalidId`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(401)
    })
  })
})
