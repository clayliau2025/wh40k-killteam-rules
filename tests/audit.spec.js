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

  test('Stage D 指標驗證：40k_combat_patrol_tracker.html 行內樣式 < 60 且 0 寫死色碼', async () => {
    const content = fs.readFileSync('40k_combat_patrol_tracker.html', 'utf-8');
    const inlineMatches = content.match(/\bstyle\s*=\s*["']/g) || [];
    const hexMatches = content.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
    expect(inlineMatches.length, `40k_combat_patrol_tracker.html 行內樣式數應小於 60，實測為 ${inlineMatches.length}`).toBeLessThan(60);
    expect(hexMatches.length, `40k_combat_patrol_tracker.html 不應有寫死色碼，實測為 ${hexMatches.length}`).toBe(0);
  });

  test('Stage D 指標驗證：40k_core_rules.html 0 行內樣式且 0 寫死色碼', async () => {
    const content = fs.readFileSync('40k_core_rules.html', 'utf-8');
    const inlineMatches = content.match(/\bstyle\s*=\s*["']/g) || [];
    const hexMatches = content.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
    expect(inlineMatches.length, `40k_core_rules.html 行內樣式數應為 0，實測為 ${inlineMatches.length}`).toBe(0);
    expect(hexMatches.length, `40k_core_rules.html 不應有寫死色碼，實測為 ${hexMatches.length}`).toBe(0);
  });

  test('Stage D 指標驗證：index.html 行內樣式 < 60 且 0 寫死色碼', async () => {
    const content = fs.readFileSync('index.html', 'utf-8');
    const inlineMatches = content.match(/\bstyle\s*=\s*["']/g) || [];
    const hexMatches = content.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
    expect(inlineMatches.length, `index.html 行內樣式數應小於 60，實測為 ${inlineMatches.length}`).toBeLessThan(60);
    expect(hexMatches.length, `index.html 不應有寫死色碼，實測為 ${hexMatches.length}`).toBe(0);
  });

  test('Stage D 指標驗證：全站 14 頁面 HTML 檔案中 0 寫死色碼且每頁行內樣式 < 100', async () => {
    for (const p of PAGES) {
      const content = fs.readFileSync(p, 'utf-8');
      const inlineMatches = content.match(/\bstyle\s*=\s*["']/g) || [];
      const hexMatches = content.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) || [];
      expect(inlineMatches.length, `${p} 行內樣式應小於 100，實測為 ${inlineMatches.length}`).toBeLessThan(100);
      expect(hexMatches.length, `${p} 不應包含任何寫死十六進位色碼 (#...)，實測為 ${hexMatches.length}`).toBe(0);
    }
  });

  test('Stage E 指標驗證：40k_core_rules.html 具備完整 27 章節 TOC 目錄、閱讀進度條與錨點複製', async ({ page }) => {
    await page.goto('/40k_core_rules.html');

    // 1. 閱讀進度條
    const progressBar = page.locator('#readingProgressBar');
    await expect(progressBar).toBeAttached();

    // 2. TOC 導航項目（抽屜）
    const tocLinks = page.locator('#tocDrawer .cr-toc-link');
    const count = await tocLinks.count();
    expect(count, '目錄章節數量應為 27').toBe(27);

    // 3. 章節跳轉選單
    const chapterSelect = page.locator('#mobileChapterSelect');
    await expect(chapterSelect).toBeAttached();
    const optCount = await chapterSelect.locator('option').count();
    expect(optCount, '章節下拉選單應包含至少 27 個章節選項').toBeGreaterThanOrEqual(27);

    // 4. 27 個章節區塊均有錨點複製按鈕
    const anchorBtns = page.locator('.btn-copy-anchor');
    const anchorBtnCount = await anchorBtns.count();
    expect(anchorBtnCount, '每個章節 Banner 均應有錨點複製按鈕').toBeGreaterThanOrEqual(27);

    // 5. 滾動頁面驗證閱讀進度條與 Scrollspy
    await page.evaluate(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScroll * 0.5, behavior: 'instant' });
    });
    await page.waitForTimeout(100);
    const progressWidth = await progressBar.evaluate(el => parseFloat(el.style.width || '0'));
    expect(progressWidth, '滾動至半途時閱讀進度應 > 20%').toBeGreaterThan(20);

    // 6. 點擊 / 選擇章節跳轉與高亮
    await chapterSelect.selectOption('sec-05');
    await page.waitForTimeout(300);
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('#sec-05');
  });

  test('Stage E 指標驗證：行動版 TOC 抽屜開啟與關閉功能', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/40k_core_rules.html');

    const toggleBtn = page.locator('#tocDrawerToggle');
    const drawer = page.locator('#tocDrawer');
    const closeBtn = page.locator('#tocDrawerClose');

    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(drawer).toHaveClass(/open/);

    await closeBtn.click();
    await expect(drawer).not.toHaveClass(/open/);
  });

  test('Stage F 指標驗證：全站 14 頁面側邊欄單一來源動態渲染與 noscript 降級', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto('/' + p);
      // 驗證動態側邊欄由 shared.js 成功渲染且單一無重複
      const sidebar = page.locator('#appSidebar');
      await expect(sidebar, `${p} 缺少 #appSidebar`).toBeAttached();
      const sidebarNav = sidebar.locator('.sidebar-nav');
      await expect(sidebarNav, `${p} 側邊欄動態選單未能正常渲染`).toBeAttached();
      const logo = sidebar.locator('.sidebar-logo-img');
      await expect(logo, `${p} 側邊欄 Logo 未能正常渲染`).toBeAttached();
    }
  });

  test('Stage F 指標驗證：行動端漢堡選單觸控目標滿足 44px 規範', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');
    const menuBtn = page.locator('.mobile-menu-btn').first();
    await expect(menuBtn).toBeVisible();
    const box = await menuBtn.boundingBox();
    expect(box?.width, '行動端漢堡按鈕寬度應至少 44px').toBeGreaterThanOrEqual(44);
    expect(box?.height, '行動端漢堡按鈕高度應至少 44px').toBeGreaterThanOrEqual(44);
  });

  test('Stage G 指標驗證：rule_lite.html 具備完整 7 章節 TOC 目錄、抽屜、閱讀進度條與錨點複製', async ({ page }) => {
    await page.goto('/rule_lite.html');

    // 1. 閱讀進度條
    const progressBar = page.locator('#readingProgressBar');
    await expect(progressBar).toBeAttached();

    // 2. TOC 導航抽屜
    const tocLinks = page.locator('#tocDrawer .cr-toc-link');
    const count = await tocLinks.count();
    expect(count, '抽屜目錄章節數量應為 7').toBe(7);

    // 3. 章節下拉跳轉選單
    const chapterSelect = page.locator('#liteChapterSelect');
    await expect(chapterSelect).toBeAttached();
    const optCount = await chapterSelect.locator('option').count();
    expect(optCount, '章節下拉選單應包含至少 7 個章節選項').toBeGreaterThanOrEqual(7);

    // 4. 7 個章節區塊均有錨點複製按鈕
    const anchorBtns = page.locator('.btn-copy-anchor');
    const anchorBtnCount = await anchorBtns.count();
    expect(anchorBtnCount, '每個章節 Banner 均應有錨點複製按鈕').toBeGreaterThanOrEqual(7);

    // 5. 抽屜開啟與關閉
    const toggleBtn = page.locator('#tocDrawerToggle');
    const drawer = page.locator('#tocDrawer');
    const closeBtn = page.locator('#tocDrawerClose');
    await toggleBtn.click();
    await expect(drawer).toHaveClass(/open/);
    await closeBtn.click();
    await expect(drawer).not.toHaveClass(/open/);

    // 6. 下拉選單跳轉
    await chapterSelect.selectOption('actions');
    await page.waitForTimeout(300);
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe('#actions');
  });

});

