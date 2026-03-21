import { test, expect, Page } from '@playwright/test';

/**
 * E2E tests for toolbar button/selector synchronization with the editor.
 *
 * These tests verify that toolbar actions (Reset, Demo CV, theme change,
 * accent color, YAML upload) reliably update the Monaco editor, especially
 * AFTER user has typed in the editor (which used to cause sync issues).
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function gotoCleanEnglish(page: Page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('rendercv-ui-lang', 'en');
  });
  await page.reload();
  await page.waitForSelector('[data-testid="language-toggle"]');
  await page.waitForSelector('.view-lines', { timeout: 10000 });
  await page.waitForTimeout(500);
}

/** Get FULL editor content from Monaco's internal model (bypasses DOM virtualization). */
async function getEditorModelValue(page: Page): Promise<string> {
  return page.evaluate(() => {
    const editor = (window as any).monaco?.editor?.getEditors?.()?.[0];
    if (editor) return editor.getModel()?.getValue() ?? '';
    return document.querySelector('.view-lines')?.textContent ?? '';
  });
}

/** Wait for Monaco model to contain a substring. */
async function modelContains(page: Page, text: string, timeout = 8000) {
  await expect.poll(
    async () => (await getEditorModelValue(page)).includes(text),
    { timeout, message: `Expected model to contain "${text}"` }
  ).toBe(true);
}

/** Wait for Monaco model to NOT contain a substring. */
async function modelNotContains(page: Page, text: string, timeout = 3000) {
  await expect.poll(
    async () => (await getEditorModelValue(page)).includes(text),
    { timeout, message: `Expected model NOT to contain "${text}"` }
  ).toBe(false);
}

/** Simulate user typing in the editor (to trigger isUserEditRef). */
async function typeInEditor(page: Page, text: string) {
  await page.locator('.view-lines').first().click();
  await page.keyboard.press('Home');
  await page.keyboard.type(text);
  await page.waitForTimeout(300);
}

/** Click the language toggle. */
async function toggleLanguage(page: Page) {
  await page.locator('[data-testid="language-toggle"]').click();
  await page.waitForTimeout(1000);
}

/** Open Reset dropdown and click an option by its text. */
async function clickResetOption(page: Page, optionText: string) {
  // Use evaluate to find and click the visible Reset button (avoids mobile/desktop duplication issues)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const resetBtn = buttons.find(b => {
      const text = b.textContent?.trim() || '';
      return text.includes('Reset') && b.offsetParent !== null; // offsetParent = null means hidden
    });
    if (resetBtn) resetBtn.click();
  });
  await page.waitForTimeout(400);
  // The dropdown option — use evaluate for same reason
  await page.evaluate((text) => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent?.trim() === text && b.offsetParent !== null);
    if (btn) btn.click();
  }, optionText);
  await page.waitForTimeout(800);
}

// ---------------------------------------------------------------------------
// Demo CV button
// ---------------------------------------------------------------------------

test.describe('Demo CV button synchronization', () => {
  test('Demo CV loads the demo template into the editor', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // First reset to empty to have different content
    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');

    // Click Demo CV
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'AI Solutions Architect');
    await modelNotContains(page, 'Your Full Name');
  });

  test('Demo CV works AFTER user has typed in the editor', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // User types in the editor (this sets isUserEditRef = true)
    await typeInEditor(page, '# my edits');
    await modelContains(page, '# my edits');

    // Click Reset → Empty template (should work despite user edit)
    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');

    // User types again
    await typeInEditor(page, '# more edits');
    await modelContains(page, '# more edits');

    // Click Reset → Demo CV (should work despite user edit)
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'AI Solutions Architect');
    await modelNotContains(page, '# more edits');
  });

  test('Demo CV after language toggle loads correct language demo', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // First switch to Spanish
    await toggleLanguage(page);

    // Reset to empty, then load Demo CV — should be Spanish
    await clickResetOption(page, 'Plantilla vacía');
    await page.waitForTimeout(500);
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'Desarrollador Principal');
    await modelContains(page, 'secciones:');
  });

  test('Demo CV then back to empty template both work consecutively', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Demo CV
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'AI Solutions Architect');

    // Empty template
    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');
    await modelNotContains(page, 'AI Solutions Architect');

    // Demo CV again
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'AI Solutions Architect');
    await modelNotContains(page, 'Your Full Name');
  });
});

// ---------------------------------------------------------------------------
// Reset (Empty template) button
// ---------------------------------------------------------------------------

test.describe('Empty template button synchronization', () => {
  test('Empty template replaces demo content', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Default is demo CV
    await modelContains(page, 'AI Solutions Architect');

    // Reset to empty
    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');
    await modelNotContains(page, 'AI Solutions Architect');
  });

  test('Empty template works after user types in the editor', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // User types
    await typeInEditor(page, '# user modification');
    await modelContains(page, '# user modification');

    // Reset
    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');
    await modelNotContains(page, '# user modification');
  });

  test('Empty template in Spanish produces Spanish skeleton', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES

    await clickResetOption(page, 'Plantilla vacía');
    await modelContains(page, 'Tu Nombre');
    await modelContains(page, 'secciones:');
    await modelContains(page, 'language: spanish');
  });
});

// ---------------------------------------------------------------------------
// Theme change synchronization
// ---------------------------------------------------------------------------

test.describe('Theme change synchronization', () => {
  test('Changing theme updates the YAML design.theme field', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    await modelContains(page, 'theme: mart');

    // Change to moderncv
    await page.locator('#theme-select').first().selectOption('moderncv');
    await page.waitForTimeout(1000);

    await modelContains(page, 'theme: moderncv');
  });

  test('Theme change works after user edits', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Type in editor
    await typeInEditor(page, '# test');
    await page.waitForTimeout(200);

    // Change theme
    await page.locator('#theme-select').first().selectOption('moderncv');
    await page.waitForTimeout(1000);

    await modelContains(page, 'theme: moderncv');
  });

  test('Theme change preserves content', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Verify initial content
    await modelContains(page, 'AI Solutions Architect');
    await modelContains(page, 'theme: mart');

    // Change theme
    await page.locator('#theme-select').first().selectOption('moderncv');
    await page.waitForTimeout(1000);

    // Content should still be there, only theme changed
    await modelContains(page, 'AI Solutions Architect');
    await modelContains(page, 'theme: moderncv');
  });
});

// ---------------------------------------------------------------------------
// Combined toolbar operations
// ---------------------------------------------------------------------------

test.describe('Combined toolbar operations', () => {
  test('Edit → Reset → Demo CV → Edit → Language toggle all sync correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // 1. User edits
    await typeInEditor(page, '# step1');
    await modelContains(page, '# step1');

    // 2. Reset to empty
    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');
    await modelNotContains(page, '# step1');

    // 3. Load Demo CV
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'AI Solutions Architect');
    await modelNotContains(page, 'Your Full Name');

    // 4. User edits again
    await typeInEditor(page, '# step4');
    await modelContains(page, '# step4');

    // 5. Toggle language to Spanish
    await toggleLanguage(page);
    await modelContains(page, 'nombre:');
    await modelContains(page, 'secciones:');
  });

  test('Toggle language → Edit → Reset → Demo CV sequence', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Toggle to Spanish
    await toggleLanguage(page);
    await modelContains(page, 'nombre:');

    // User edits
    await typeInEditor(page, '# edit-in-spanish');
    await modelContains(page, '# edit-in-spanish');

    // Reset to empty
    await clickResetOption(page, 'Plantilla vacía');
    await modelContains(page, 'Tu Nombre');
    await modelNotContains(page, '# edit-in-spanish');

    // Load Demo CV
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'Desarrollador Principal');
    await modelNotContains(page, 'Tu Nombre');
  });

  test('Rapid Reset/Demo alternation stays in sync', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Alternate 3 times
    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');

    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'AI Solutions Architect');

    await clickResetOption(page, 'Empty template');
    await modelContains(page, 'Your Full Name');

    // Final state should be the empty template
    await modelNotContains(page, 'AI Solutions Architect');
  });

  test('Theme change + language toggle + Demo CV all interoperate', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Change theme
    await page.locator('#theme-select').first().selectOption('moderncv');
    await page.waitForTimeout(1000);
    await modelContains(page, 'theme: moderncv');

    // Toggle language
    await toggleLanguage(page);
    await modelContains(page, 'nombre:');

    // Load Demo CV
    await clickResetOption(page, 'Demo CV');
    await modelContains(page, 'Desarrollador Principal');

    // Theme should be reset to mart (Demo CV resets theme)
    await modelContains(page, 'theme: mart');
  });
});
