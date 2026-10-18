import { test, expect } from '@playwright/test';
import fs from 'fs';

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

  test('離線完整性驗證：全站 14 頁面零外部 CDN 資源請求且本地圖片均加載成功', async ({ page }) => {
    const externalRequests = [];
    page.on('request', req => {
      const url = req.url();
      if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com') || url.includes('d3ocysny7bghv8.cloudfront.net')) {
        externalRequests.push(url);
      }
    });

    for (const p of PAGES) {
      await page.goto('/' + p);
      // 檢查頁面內圖片是否有破圖
      const brokenImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
          .filter(img => img.complete && img.naturalWidth === 0)
          .map(img => img.src);
      });
      expect(brokenImages, `${p} 存在破圖 (naturalWidth === 0)`).toEqual([]);
    }

    expect(externalRequests, '頁面發送了外部 CDN 請求').toEqual([]);
  });

  test('字級系統 Token 化驗證：全站 14 頁面最小字級均 >= 11px (徽章 11px / 內文 >= 12px)', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto('/' + p);
      const smallestInfo = await page.evaluate((currentPage) => {
        const textElements = Array.from(document.querySelectorAll('body *:not(script):not(style):not(svg):not(path)'));
        let minSize = 999;
        let worst = null;
        textElements.forEach(el => {
          if (!el.textContent.trim()) return;
          if (el.offsetWidth === 0 && el.offsetHeight === 0) return;
          const fs = parseFloat(window.getComputedStyle(el).fontSize);
          if (!isNaN(fs) && fs > 0 && fs < 10.9) {
            if (fs < minSize) {
              minSize = fs;
              worst = {
                tag: el.tagName,
                cls: el.className,
                id: el.id,
                text: el.textContent.trim().slice(0, 40),
                fs: fs,
                html: el.outerHTML.slice(0, 150)
              };
            }
          }
        });
        return worst;
      }, p);
      expect(smallestInfo, `${p} 存在不可讀極小字: ${JSON.stringify(smallestInfo)}`).toBeNull();
    }
  });

  test('Stage D 指標驗證：match_tracker.html 行內樣式 < 60 且 0 寫死色碼', async () => {
    const content = fs.readFileSync('match_tracker.html', 'utf-8');
    const inlineMatches = content.match(/\bstyle\s*=\s*["']/g) || [];
    const hexMatches = content.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
    expect(inlineMatches.length, `match_tracker.html 行內樣式數應小於 60，實測為 ${inlineMatches.length}`).toBeLessThan(60);
    expect(hexMatches.length, `match_tracker.html 不應有寫死色碼，實測為 ${hexMatches.length}`).toBe(0);
  });

});

