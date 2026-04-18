import { test, expect, Page } from "@playwright/test";

/**
 * Comprehensive E2E tests for CV Builder language switching.
 *
 * Covers:
 *  1. UI / panels / selector sync
 *  2. Selector shows CURRENT language (ES when Spanish, EN when English)
 *  3. YAML keys MUST change on every language toggle
 *  4. Values change only when a translation exists (demo/skeleton swap; user edits preserved)
 *  5. Edge cases (persistence, rapid toggles, file upload, etc.)
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Force English locale so tests start deterministically in English. */
async function gotoCleanEnglish(page: Page) {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("rendercv-ui-lang", "en");
  });
  await page.reload();
  await page.waitForSelector('[data-testid="language-toggle"]');
  await page.waitForSelector(".view-lines", { timeout: 10000 });
  await page.waitForTimeout(500);
}

/** Force Spanish locale so tests start deterministically in Spanish. */
async function gotoCleanSpanish(page: Page) {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("rendercv-ui-lang", "es");
  });
  await page.reload();
  await page.waitForSelector('[data-testid="language-toggle"]');
  await page.waitForSelector(".view-lines", { timeout: 10000 });
  await page.waitForTimeout(500);
}

/** Get the visible text of the language label inside the toggle button. */
async function getLangLabel(page: Page): Promise<string> {
  return (
    (await page.locator('[data-testid="language-label"]').textContent()) ?? ""
  );
}

/**
 * Get the FULL editor content from Monaco's internal model.
 * This bypasses Monaco's DOM virtualization which only renders visible lines.
 */
async function getEditorModelValue(page: Page): Promise<string> {
  return page.evaluate(() => {
    const editor = (window as any).monaco?.editor?.getEditors?.()?.[0];
    if (editor) return editor.getModel()?.getValue() ?? "";
    // Fallback: try to find via DOM if monaco global isn't available
    return document.querySelector(".view-lines")?.textContent ?? "";
  });
}

/** Wait for Monaco to reflect content by checking for a substring in the visible DOM. */
async function editorContains(page: Page, text: string, timeout = 8000) {
  await expect(page.locator(".view-lines").first()).toContainText(text, {
    timeout,
  });
}

/**
 * Wait for Monaco's model to contain a substring.
 * Uses the internal model value, not the virtualized DOM — works for text anywhere in the document.
 */
async function modelContains(page: Page, text: string, timeout = 8000) {
  await expect
    .poll(
      async () => {
        const content = await getEditorModelValue(page);
        return content.includes(text);
      },
      { timeout, message: `Expected Monaco model to contain "${text}"` },
    )
    .toBe(true);
}

/** Assert that Monaco model does NOT contain a substring. */
async function modelNotContains(page: Page, text: string, timeout = 3000) {
  await expect
    .poll(
      async () => {
        const content = await getEditorModelValue(page);
        return content.includes(text);
      },
      { timeout, message: `Expected Monaco model NOT to contain "${text}"` },
    )
    .toBe(false);
}

/** Click the language toggle once and wait for YAML to update. */
async function toggleLanguage(page: Page) {
  await page.locator('[data-testid="language-toggle"]').click();
  await page.waitForTimeout(1000);
}

/** Inject a custom YAML into localStorage and reload. */
async function loadCustomYaml(page: Page, yamlContent: string) {
  await page.evaluate((yaml) => {
    localStorage.setItem("rendercv-yaml", yaml);
  }, yamlContent);
  await page.reload();
  await page.waitForSelector('[data-testid="language-toggle"]');
  await page.waitForTimeout(1500);
}

// ---------------------------------------------------------------------------
// 1. UI, panels, and selector always synchronized
// ---------------------------------------------------------------------------

test.describe("1 — UI / Selector synchronization", () => {
  test("English mode: toolbar labels and selector are in English", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    expect(await getLangLabel(page)).toBe("EN");
    await expect(page.locator("text=Download PDF").first()).toBeVisible();
  });

  test("Toggle to Spanish: toolbar labels and selector switch to Spanish", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);
    await toggleLanguage(page);

    expect(await getLangLabel(page)).toBe("ES");
    await expect(page.locator("text=Descargar PDF").first()).toBeVisible();
  });

  test("Toggle back to English restores everything", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES
    await toggleLanguage(page); // → EN

    expect(await getLangLabel(page)).toBe("EN");
    await expect(page.locator("text=Download PDF").first()).toBeVisible();
  });

  test("Language persists after page reload", async ({ page }) => {
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES

    await page.reload();
    await page.waitForSelector('[data-testid="language-toggle"]');

    expect(await getLangLabel(page)).toBe("ES");
    await expect(page.locator("text=Descargar PDF").first()).toBeVisible();
  });

  test("Both localStorage keys stay in sync after toggle", async ({ page }) => {
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES

    const uiLang = await page.evaluate(() =>
      localStorage.getItem("rendercv-ui-lang"),
    );
    const themeLang = await page.evaluate(() =>
      localStorage.getItem("rendercv-theme-lang"),
    );

    expect(uiLang).toBe("es");
    expect(themeLang).toBe("spanish");
  });
});

// ---------------------------------------------------------------------------
// 2. Selector shows CURRENT language
// ---------------------------------------------------------------------------

test.describe("2 — Selector displays current language", () => {
  test("In English → shows EN", async ({ page }) => {
    await gotoCleanEnglish(page);
    expect(await getLangLabel(page)).toBe("EN");
  });

  test("In Spanish → shows ES", async ({ page }) => {
    await gotoCleanEnglish(page);
    await toggleLanguage(page);
    expect(await getLangLabel(page)).toBe("ES");
  });

  test("Rapid toggles stay consistent", async ({ page }) => {
    await gotoCleanEnglish(page);
    for (let i = 0; i < 4; i++) await toggleLanguage(page);
    // Even number of toggles → back to EN
    expect(await getLangLabel(page)).toBe("EN");
  });

  test("Starting in Spanish shows ES", async ({ page }) => {
    await gotoCleanSpanish(page);
    expect(await getLangLabel(page)).toBe("ES");
  });

  test("Starting in Spanish, toggle shows EN", async ({ page }) => {
    await gotoCleanSpanish(page);
    await toggleLanguage(page);
    expect(await getLangLabel(page)).toBe("EN");
  });
});

// ---------------------------------------------------------------------------
// 3. YAML keys MUST change on every language toggle
// ---------------------------------------------------------------------------

test.describe("3 — YAML keys change on language toggle", () => {
  test("EN → ES: English keys become Spanish keys", async ({ page }) => {
    await gotoCleanEnglish(page);

    await editorContains(page, "name:");
    await editorContains(page, "sections:");
    await editorContains(page, "highlights:");

    await toggleLanguage(page);

    await editorContains(page, "nombre:");
    await editorContains(page, "secciones:");
    await editorContains(page, "logros:");
  });

  test("ES → EN: Spanish keys become English keys", async ({ page }) => {
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES

    await editorContains(page, "nombre:");
    await editorContains(page, "secciones:");

    await toggleLanguage(page); // → EN

    await editorContains(page, "name:");
    await editorContains(page, "sections:");
    await editorContains(page, "highlights:");
  });

  test("Section names translate (Experience ↔ Experiencia)", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    // Use model value to check full document (including parts not visible in viewport)
    await modelContains(page, "Experience:");
    await modelContains(page, "Education:");

    await toggleLanguage(page); // → ES

    await modelContains(page, "Experiencia:");
    await modelContains(page, "Educación:");
  });

  test("locale.language reflects the current language", async ({ page }) => {
    await gotoCleanEnglish(page);

    // Use model to check locale block at bottom of document
    await modelContains(page, "language: english");

    await toggleLanguage(page);

    await modelContains(page, "language: spanish");
  });

  test("locale.language toggles back to english", async ({ page }) => {
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES
    await modelContains(page, "language: spanish");

    await toggleLanguage(page); // → EN
    await modelContains(page, "language: english");
  });

  test("All entry-level keys translate (company, position, date, etc.)", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    await modelContains(page, "company:");
    await modelContains(page, "position:");
    await modelContains(page, "date:");

    await toggleLanguage(page);

    await modelContains(page, "empresa:");
    await modelContains(page, "cargo:");
    await modelContains(page, "fecha:");
  });
});

// ---------------------------------------------------------------------------
// 4. YAML values change only when a translation exists
// ---------------------------------------------------------------------------

test.describe("4 — Conditional value translation", () => {
  test("Unmodified demo CV: full template swap on language change", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    await editorContains(page, "AI Solutions Architect");
    await editorContains(page, "Lead Developer");

    await toggleLanguage(page);

    await editorContains(page, "Desarrollador Principal");
    await modelContains(page, "Investigador y Desarrollador de IA");
  });

  test("Unmodified demo CV: full swap back preserves demo content", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES
    await toggleLanguage(page); // → EN

    // Should be back to the original English demo
    await editorContains(page, "AI Solutions Architect");
    await editorContains(page, "Lead Developer");
    await modelContains(page, "language: english");
  });

  test("Reset-like skeleton: keys translate on language change", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);

    // Load an English skeleton-like template via localStorage
    const skeletonYaml = `cv:
  name: Your Full Name
  headline: Your Professional Headline
  location: City, Country
  email: your.email@example.com
  sections:
    Experience:
    - company: Company Name
      position: Job Title
      location: City, Country
      date: Jan. 2024 - Present
      highlights:
      - Key achievement or responsibility
    Skills:
    - label: Category
      details: Skill 1, Skill 2, Skill 3
    Education:
    - institution: University Name
      area: Degree Field
      location: City, Country
      date: Mar. 2020 - Dec. 2024
locale:
  language: english
design:
  theme: mart`;
    await loadCustomYaml(page, skeletonYaml);

    await editorContains(page, "Your Full Name");
    await modelContains(page, "company:");

    await toggleLanguage(page);

    // Keys must translate to Spanish
    await modelContains(page, "nombre:");
    await modelContains(page, "empresa:");
    await modelContains(page, "secciones:");
    // Values stay (no translation exists for generic content)
    await modelContains(page, "Your Full Name");
    await modelContains(page, "Company Name");
  });

  test("User-modified CV: keys translate but user values are preserved", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    const customYaml = `cv:
  name: John Custom
  headline: My Custom Headline That Is Significantly Different From Any Template
  location: Custom City, Custom Country
  email: john.custom@example.com
  sections:
    Experience:
      - company: Custom Corp International
        position: Senior Engineer
        date: Jan. 2020 - Present
        highlights:
          - Built a custom thing that is very unique to this user and cannot be confused with the demo template content at all
          - Another custom achievement that proves this is definitely user modified content and not any default template
    Skills:
      - label: Custom Category
        details: Custom Skill A, Custom Skill B, Custom Skill C
    Education:
      - institution: Custom University of Testing
        area: Custom Degree
        date: Mar. 2015 - Dec. 2019
locale:
  language: english
design:
  theme: mart`;
    await loadCustomYaml(page, customYaml);

    await editorContains(page, "John Custom");
    await editorContains(page, "company:");

    await toggleLanguage(page);

    // KEYS must have changed to Spanish
    await editorContains(page, "nombre:");
    await editorContains(page, "empresa:");
    await editorContains(page, "cargo:");

    // USER VALUES must be PRESERVED
    await editorContains(page, "John Custom");
    await editorContains(page, "Custom Corp International");
    await editorContains(page, "Senior Engineer");
    await modelContains(page, "Custom University of Testing");
  });

  test("Round-trip on user-modified CV: keys return to English, values preserved", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    const customYaml = `cv:
  name: Jane Doe
  headline: A Very Custom Headline For Testing Purposes That Differs Greatly From Templates
  location: Test City, Test Country
  email: jane.doe@example.com
  sections:
    Experience:
      - company: Acme Inc
        position: CTO
        date: Jun. 2021 - Present
        highlights:
          - Led a team of 50 engineers in building a revolutionary product offering for the testing purposes of this end to end test
    Education:
      - institution: MIT
        area: Computer Science
        date: Sep. 2017 - Jun. 2021
locale:
  language: english
design:
  theme: mart`;
    await loadCustomYaml(page, customYaml);

    await editorContains(page, "name:");
    await editorContains(page, "Jane Doe");

    // Toggle to Spanish
    await toggleLanguage(page);
    await editorContains(page, "nombre:");
    await editorContains(page, "Jane Doe");

    // Toggle back to English
    await toggleLanguage(page);

    // English keys must be restored
    await modelContains(page, "company:");
    await modelContains(page, "position:");
    await modelContains(page, "sections:");
    await modelContains(page, "highlights:");

    // User values preserved through round-trip
    await editorContains(page, "Jane Doe");
    await modelContains(page, "Acme Inc");
    await modelContains(page, "MIT");
  });
});

// ---------------------------------------------------------------------------
// 5. Edge cases
// ---------------------------------------------------------------------------

test.describe("5 — Edge cases", () => {
  test("Triple toggle cycle works (EN→ES→EN→ES)", async ({ page }) => {
    await gotoCleanEnglish(page);

    // EN→ES
    await toggleLanguage(page);
    await editorContains(page, "nombre:");
    expect(await getLangLabel(page)).toBe("ES");

    // ES→EN
    await toggleLanguage(page);
    await editorContains(page, "name:");
    expect(await getLangLabel(page)).toBe("EN");

    // EN→ES
    await toggleLanguage(page);
    await editorContains(page, "nombre:");
    expect(await getLangLabel(page)).toBe("ES");
  });

  test("Theme change does not affect language state", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await gotoCleanEnglish(page);
    await toggleLanguage(page); // → ES
    await page.waitForTimeout(500);

    // Change theme
    await page.locator("#theme-select").first().selectOption("moderncv");
    await page.waitForTimeout(1500); // Give time for YAML dump + re-render

    // Language should still be ES
    expect(await getLangLabel(page)).toBe("ES");
    await modelContains(page, "nombre:");
    await modelContains(page, "language: spanish");
  });

  test("Language toggle updates page title", async ({ page }) => {
    await gotoCleanEnglish(page);
    const enTitle = await page.title();
    expect(enTitle).toContain("CV Builder");

    await toggleLanguage(page);
    const esTitle = await page.title();
    expect(esTitle).toContain("CV Builder");
    // Titles differ between languages
    expect(esTitle).not.toBe(enTitle);
  });

  test("Multiple toggles on user-modified CV preserve content integrity", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    const customYaml = `cv:
  name: Multi Toggle Test
  headline: Testing multiple toggles on custom content to ensure nothing is lost
  location: Anywhere
  email: test@test.com
  sections:
    Experience:
      - company: Toggle Corp
        position: QA Lead
        date: Jan. 2020 - Present
        highlights:
          - Verified that multiple language toggles preserve all user data without corruption or loss
locale:
  language: english
design:
  theme: mart`;
    await loadCustomYaml(page, customYaml);

    // Toggle 3 times: EN→ES→EN→ES
    await toggleLanguage(page);
    await toggleLanguage(page);
    await toggleLanguage(page);

    // Should be in Spanish
    expect(await getLangLabel(page)).toBe("ES");
    await editorContains(page, "nombre:");
    await editorContains(page, "Multi Toggle Test");
    await modelContains(page, "Toggle Corp");
  });

  test("Starting fresh with Spanish browser: initial state is correct", async ({
    page,
  }) => {
    // Simulate a fresh load with Spanish preference
    await gotoCleanSpanish(page);

    expect(await getLangLabel(page)).toBe("ES");
    await expect(page.locator("text=Descargar PDF").first()).toBeVisible();
  });

  test("design block is never translated (keys stay in English)", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);
    await modelContains(page, "design:");
    await modelContains(page, "theme:");

    await toggleLanguage(page);

    // design block must remain untranslated
    await modelContains(page, "design:");
    await modelContains(page, "theme:");
  });

  test("social_networks block is preserved during translation", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    await modelContains(page, "social_networks:");
    await modelContains(page, "network: LinkedIn");
    await modelContains(page, "username:");

    await toggleLanguage(page);

    // social_networks should still exist with same values
    await modelContains(page, "social_networks:");
    await modelContains(page, "network: LinkedIn");
    await modelContains(page, "username:");
  });

  test("Empty editor state does not crash on language toggle", async ({
    page,
  }) => {
    await gotoCleanEnglish(page);

    // Set empty YAML
    await loadCustomYaml(page, "");
    await toggleLanguage(page);

    // Should not crash — selector should update
    expect(await getLangLabel(page)).toBe("ES");
  });

  test("Invalid YAML does not crash on language toggle", async ({ page }) => {
    await gotoCleanEnglish(page);

    await loadCustomYaml(page, "this is: [not: valid yaml: {{{}}}");
    await toggleLanguage(page);

    // Should not crash
    expect(await getLangLabel(page)).toBe("ES");
  });

  test("Accent colors persist through language toggle", async ({ page }) => {
    await gotoCleanEnglish(page);

    // Read initial accent color from localStorage
    const colorBefore = await page.evaluate(() =>
      localStorage.getItem("rendercv-accent"),
    );

    await toggleLanguage(page);
    await toggleLanguage(page);

    const colorAfter = await page.evaluate(() =>
      localStorage.getItem("rendercv-accent"),
    );
    expect(colorAfter).toBe(colorBefore);
  });
});
