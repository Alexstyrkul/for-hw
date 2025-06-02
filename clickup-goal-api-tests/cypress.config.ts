import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    env: {
      clickUpToken: process.env.CLICKUP_TOKEN,
      workspaceId: process.env.WORKSPACE_ID,
      goalFolderId: process.env.GOAL_FOLDER_ID,
      listId: process.env.LIST_ID,
    }
  }
})
