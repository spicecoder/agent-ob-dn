import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-repo-name' with your actual repository name
export default defineConfig({
  base: '/AGENT-OB-DN/',  // If AGENT-OB-DN is your repository name
  plugins: [react()]
})