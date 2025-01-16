// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
 
// Ścieżka do pliku config.json zdefiniowana przez zmienną środowiskową lub domyślnie
const configPath = process.env.CONFIG_PATH || './config.json';
const customConfig = JSON.parse(fs.readFileSync(path.resolve(configPath), 'utf-8'));
 
module.exports = defineConfig({
  timeout: 180000,
  globalTimeout: 240000,
 
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
 
  reporter: [],
  use: {
    trace: 'off',
    baseURL: customConfig.baseURL, // Zmienna z pliku config.json (jeśli istnieje)
    headless: customConfig.headless !== undefined ? customConfig.headless : true, // Zmienna z config.json (jeśli istnieje)
  },
 
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
 
// Możesz teraz używać customConfig w swoich testach lub innych funkcjach