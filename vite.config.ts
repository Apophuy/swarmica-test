import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://support.swarmica.com/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,
  //       // configure: (proxy, _options) => {
  //       //   proxy.on('error', (err, _req, _res) => {
  //       //     console.log('error', err);
  //       //   });
  //       //   proxy.on('proxyReq', (proxyReq, req, _res) => {
  //       //     console.log('Request sent to target:', req.method, req.url);
  //       //   });
  //       //   proxy.on('proxyRes', (proxyRes, req, _res) => {
  //       //     console.log('Response received from target:', proxyRes.statusCode, req.url);
  //       //   });
  //       // },
  //     },
  //   },
  //   cors: false,
  // },
  // preview: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://support.swarmica.com/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,
  //       configure: (proxy, _options) => {
  //         proxy.on('error', (err, _req, _res) => {
  //           console.log('error', err);
  //         });
  //         proxy.on('proxyReq', (proxyReq, req, _res) => {
  //           console.log('Request sent to target:', req.method, req.url);
  //         });
  //         proxy.on('proxyRes', (proxyRes, req, _res) => {
  //           console.log('Response received from target:', proxyRes.statusCode, req.url);
  //         });
  //       },
  //     },
  //   },
  //   cors: false,
  // },
});
