import { test } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { TimesheetPage } from "../page-objects/timesheetPage";
const config = require("../config.json");

test.use({
  browserName: "chromium",
  launchOptions: {
    headless: false,
  },
  viewport: { width: 1920, height: 1080 },
});

test("performing login and taking screenshots", async ({ page }) => {
  const onLoginPage = new LoginPage(page);
  await onLoginPage.openPage();
  await onLoginPage.fillEmailAndPasswordFields(config.email, config.password);
  await onLoginPage.checkCheckboxAndCompleteLoginProcess();

  const onTimesheetPage = new TimesheetPage(page, config.screenshotDirectory);
  await onTimesheetPage.checkLandingPage();
  await onTimesheetPage.captureTimesheetScreenshots(config.numberOfTimesheetsToOpen);
});
