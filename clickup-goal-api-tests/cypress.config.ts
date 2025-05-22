import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      token: process.env.TOKEN,
      teamId: process.env.TEAM_ID,
    },
    supportFile: false,
  },
});
