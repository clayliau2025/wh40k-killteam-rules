const { test, expect } = require('@playwright/test');

const ALL_PAGES = [
  'index.html',
  'match_tracker.html',
  '40k_combat_patrol_tracker.html',
  'rule_lite.html',
  'universal_equipment.html',
  'death_of_angel_web_rule.html',
  'angel_of_death_starter_set_rule.html',
  'plague_marine.html',
  'plague_marine_starter_set_rule.html',
  'Kommandos.html',
  '40k_core_rules.html',
  '40k_combat_patrol_rules.html',
  '40k_cp_astartes.html',
  '40k_cp_orks.html'
];

test.describe('全站 14 頁面 Smoke Test (基礎可用性與零報錯檢查)', () => {
  for (const pageName of ALL_PAGES) {
    test(`頁面 ${pageName} 載入成功、無致命 Console 錯誤且側邊欄正常`, async ({ page }) => {
      const pageErrors = [];
      page.on('pageerror', err => pageErrors.push(err.message));

      const response = await page.goto(`/${pageName}`);
      expect(response.status()).toBe(200);

      // 檢查側邊欄是否存在且已由 shared.js 注入
      const sidebar = page.locator('#appSidebar');
      await expect(sidebar).toBeVisible();

      // 檢查側邊欄包含 Logo 與導覽項目
      const brandName = page.locator('.sidebar-brand-name');
      await expect(brandName).toBeVisible();

      // 檢查是否無 pageerror
      expect(pageErrors).toEqual([]);
    });
  }
});
