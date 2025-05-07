// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/level-3/assignments/meme-generator/',
    plugins: [react()]
});
