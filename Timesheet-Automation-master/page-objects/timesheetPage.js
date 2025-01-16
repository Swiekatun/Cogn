import { expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');

export class TimesheetPage {
  constructor(page, screenshotDirectory) {
    this.page = page;
    this.screenshotDirectory = screenshotDirectory;
    this.screenshotPrefix = 'screenshot_';
    this.timesheetButton = page.locator('[groupletid="CTS_TS_LANDING_PG_LNK"]');
    this.weeklyTimesheetBox = page.locator('.timesheet_period_group_box .ps-link');
    this.iframeElement = page.locator('#ptifrmtgtframe');
    this.ensureDirectoryExists();
  }

  // Ensure the screenshot directory exists
  ensureDirectoryExists() {
    if (!fs.existsSync(this.screenshotDirectory)) {
      fs.mkdirSync(this.screenshotDirectory, { recursive: true });
    }
  }

  // Function to check the landing page and navigate if necessary
  async checkLandingPage() {
    try {
      await Promise.race([
        this.waitForTitle('Timesheet Landing Component'),
        this.waitForTitle('Homepage')
      ]);
      if (await this.page.title() === 'Homepage') {
        await this.timesheetButton.first().click();
        await this.waitForTitle('Timesheet Landing Component');
      }
    } catch {
      throw new Error('Unknown landing page detected.');
    }
  }

  // Wait for a specific page title
  async waitForTitle(title, timeout = 30000) {
    await this.page.waitForFunction((expectedTitle) => document.title === expectedTitle, title, { timeout });
  }

  // Open timesheets and take screenshots
  async captureTimesheetScreenshots(numberOfTimesheetsToOpen) {
    await this.waitForTitle('Timesheet Landing Component');
    await this.page.waitForLoadState('networkidle');

    const numberOfTimesheetsFound = await this.weeklyTimesheetBox.count();
    const maxTimesheetsToOpen = Math.min(numberOfTimesheetsToOpen, numberOfTimesheetsFound);

    for (let i = 0; i < maxTimesheetsToOpen; i++) {
      await this.weeklyTimesheetBox.nth(i).click();
      await this.waitForTitle('Review Report');
      await this.page.waitForLoadState('networkidle');
      const screenshotPath = path.join(this.screenshotDirectory, `${this.screenshotPrefix}${i + 1}.png`);
      await this.iframeElement.screenshot({ path: screenshotPath, fullPage: true });
      await this.page.goBack();
    }

    await this.page.waitForLoadState('networkidle');
    const summaryPath = path.join(this.screenshotDirectory, `TimesheetSummary.png`);
    await this.page.screenshot({ path: summaryPath, fullPage: true });
  }
}