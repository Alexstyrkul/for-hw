describe('ClickUp Goal lifecycle — full test', () => {
  let goalId: string;

  const headers = {
    Authorization: Cypress.env('token'),
    'Content-Type': 'application/json'
  };

  const teamId = Cypress.env('teamId');

  it('should create, get, update and delete a goal', () => {
    // 1. CREATE
    cy.request({
      method: 'POST',
      url: `/team/${teamId}/goal`,
      headers,
      body: {
        name: 'Goal from Cypress',
        description: 'Automated test goal',
        due_date: Date.now() + 7 * 24 * 60 * 60 * 1000,
        multiple_owners: false,
        owners: []
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      goalId = res.body.goal.id;

      // 2. GET BY ID
      cy.request({
        method: 'GET',
        url: `/goal/${goalId}`,
        headers
      }).then((getRes) => {
        expect(getRes.status).to.eq(200);

        // 3. UPDATE
        cy.request({
          method: 'PUT',
          url: `/goal/${goalId}`,
          headers,
          body: {
            name: 'Updated Goal Name',
            description: 'Updated description',
          }
        }).then((updateRes) => {
          expect(updateRes.status).to.eq(200);

          // 4. DELETE
          cy.request({
            method: 'DELETE',
            url: `/goal/${goalId}`,
            headers
          }).then((deleteRes) => {
            expect(deleteRes.status).to.eq(200);
          });
        });
      });
    });
  });

  it('Negative test: GET Goal without token — should return 401', () => {
    // GET без авторизації
    cy.request({
      method: 'GET',
      url: `/goal/nonexistentid123`,
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 401]).to.include(res.status);
    });
  });
});
