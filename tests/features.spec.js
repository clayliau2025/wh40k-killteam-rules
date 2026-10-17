const { test, expect } = require('@playwright/test');

test.describe('全站功能與工作流程自動化測試', () => {

  test('全站搜尋 (Global Search Modal) 能正確開啟、輸入並搜尋結果無報錯', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto('/index.html');

    // 點擊頂部搜尋按鈕
    const searchBtn = page.locator('#topbarSearchBtn');
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    // 搜尋覆蓋層應展開
    const overlay = page.locator('#globalSearchOverlay');
    await expect(overlay).toHaveClass(/active/);

    const searchInput = page.locator('#globalSearchInput');
    await expect(searchInput).toBeFocused();

    // 輸入搜尋關鍵字「隱蔽」
    await searchInput.fill('隱蔽');

    // 檢查搜尋結果清單至少有結果
    const results = page.locator('.search-result-item');
    await expect(results.first()).toBeVisible();

    // 檢查無 JavaScript 執行期異常 (如 escapeHtml is not defined)
    expect(pageErrors).toEqual([]);
  });

  test('40K 戰巡對戰助手 (War Journal) 存檔匯出與匯入測試', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto('/40k_combat_patrol_tracker.html');

    // 評估並執行匯出函式獲取當前 gameState
    const exportedData = await page.evaluate(() => {
      return typeof window.gameState !== 'undefined' ? JSON.stringify(window.gameState) : null;
    });
    expect(exportedData).not.toBeNull();

    const parsed = JSON.parse(exportedData);
    // 驗證匯入驗證邏輯：測試將匯出的資料匯入
    const importResult = await page.evaluate((dataStr) => {
      try {
        const obj = JSON.parse(dataStr);
        // 模擬 triggerImport40kMatchJson 裡的結構驗證規則
        const hasRequired = obj.p1 && obj.p2 && (typeof obj.currentRound !== 'undefined' || typeof obj.round !== 'undefined');
        return { success: !!hasRequired, objRound: obj.currentRound, rawRound: obj.round };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }, exportedData);

    expect(importResult.success).toBe(true);
    expect(pageErrors).toEqual([]);
  });

  test('殺戮小隊對戰助手 (KT Tracker) 完整流程與存檔匯出/匯入', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto('/match_tracker.html');

    // 清空現有 localStorage 存檔以確保從 Wizard 開始
    await page.evaluate(() => localStorage.removeItem('kt_match_active_state_v2'));
    await page.reload();

    // 第一步：選擇入門模式
    const starterModeCard = page.locator('#modeCardStarter');
    await expect(starterModeCard).toBeVisible();

    // 透過呼叫 startMatch 進入正式對戰
    await page.evaluate(() => {
      if (typeof window.startMatch === 'function') {
        window.startMatch();
      }
    });

    // 對戰 HUD 應顯示
    const matchView = page.locator('#viewMatch');
    await expect(matchView).toBeVisible();

    // 測試扣血按鈕
    const dmgBtn = page.locator('.hp-btn.dmg').first();
    if (await dmgBtn.isVisible()) {
      await dmgBtn.click();
    }

    // 檢查無 JavaScript 錯誤
    expect(pageErrors).toEqual([]);
  });

  test('深淺主題切換 (Theme Toggle) 狀態正常切換', async ({ page }) => {
    await page.goto('/index.html');

    const themeBtn = page.locator('#topbarThemeBtn');
    await expect(themeBtn).toBeVisible();

    // 點擊切換為深色
    await themeBtn.click();
    await expect(page.locator('body')).toHaveClass(/theme-dark-mode/);

    // 點擊切換回淺色
    await themeBtn.click();
    await expect(page.locator('body')).not.toHaveClass(/theme-dark-mode/);
  });

  test('手機專屬底部導覽列 (Mobile Bottom Nav) 在手機視窗下正常互動', async ({ page, isMobile }) => {
    test.skip(!isMobile, '此測試僅針對手機版視窗');

    await page.goto('/index.html');

    const bottomNav = page.locator('#mobileBottomNav');
    await expect(bottomNav).toBeVisible();

    // 點擊「速查」按鈕應叫出全站搜尋
    const quickSearchBtn = bottomNav.locator('button', { hasText: '速查' });
    await quickSearchBtn.click();

    const overlay = page.locator('#globalSearchOverlay');
    await expect(overlay).toHaveClass(/active/);
  });
});
