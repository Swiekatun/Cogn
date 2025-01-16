import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator("#i0116");
    this.passwordField = page.locator("#i0118");
    this.dontShowAgainCheckbox = page.locator("#KmsiCheckboxField");
    this.submitButton = page.locator("#idSIButton9");
  }

  async openPage() {
    await this.page.goto("https://compass.esa.cognizant.com/");
    await this.page.waitForLoadState("networkidle");
    await expect(this.emailField).toHaveRole("textbox");
  }

  async fillEmailAndPasswordFields(email, password) {
    await this.emailField.fill(email);
    await this.submitButton.click();
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  async checkCheckboxAndCompleteLoginProcess() {
    // expect should have big timeout to give user time to do the authentication part
    await expect(this.dontShowAgainCheckbox).toBeVisible({ timeout: 45000 });
    await this.dontShowAgainCheckbox.check();
    await this.submitButton.click();
  }
}
