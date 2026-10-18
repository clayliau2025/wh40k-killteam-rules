import { test, expect } from '@playwright/test';

const PAGES = [
  'index.html',
  'rule_lite.html',
  'angel_of_death_starter_set_rule.html',
  'plague_marine_starter_set_rule.html',
  'death_of_angel_web_rule.html',
  'Kommandos.html',
  'plague_marine.html',
  'universal_equipment.html',
  'match_tracker.html',
  '40k_core_rules.html',
  '40k_combat_patrol_rules.html',
  '40k_cp_astartes.html',
  '40k_cp_orks.html',
  '40k_combat_patrol_tracker.html'
];

test.describe('代碼與設計品質量測基準測試 (Quality Audit Baseline)', () => {

  test('全站 14 頁面均有且僅有單一 <h1> 標題 (SEO & A11y 標竿)', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto('/' + p);
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `${p} 的 <h1> 標題數量應為 1，但實測為 ${h1Count}`).toBe(1);
    }
  });

  test('全站 14 頁面所有圖片均具備合規 alt 屬性', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto('/' + p);
      const imagesWithoutAlt = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter(img => !img.hasAttribute('alt')).map(img => img.src);
      });
      expect(imagesWithoutAlt, `${p} 存在缺少 alt 屬性的圖片`).toEqual([]);
    }
  });

  test('全站 14 頁面所有可見輸入控制項均具備無障礙標籤關聯', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto('/' + p);
      const unlabeled = await page.evaluate(() => {
        const controls = Array.from(document.querySelectorAll('input:not([type="hidden"]), select, textarea'));
        const issues = [];
        controls.forEach(ctrl => {
          const id = ctrl.id;
          const hasAria = ctrl.getAttribute('aria-label') || ctrl.getAttribute('aria-labelledby');
          const hasTitle = ctrl.getAttribute('title');
          const parentLabel = ctrl.closest('label');
          const forLabel = id ? document.querySelector(`label[for="${id}"]`) : null;
          if (!hasAria && !hasTitle && !parentLabel && !forLabel) {
            issues.push(ctrl.outerHTML.slice(0, 100));
          }
        });
        return issues;
      });
      expect(unlabeled, `${p} 存在未提供 Accessible Name 的表單元件`).toEqual([]);
    }
  });

});
