import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@react-form-builder/core',
      '@react-form-builder/components-material-ui',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'liquidjs',
    ],
  },
})
