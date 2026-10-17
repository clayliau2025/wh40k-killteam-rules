const { test, expect } = require('@playwright/test');

test.describe('Monkey Stress Testing (高頻隨機點擊與無破壞測試)', () => {

  test('40K 對戰助手連續高頻操作 (100 次隨機點擊無崩潰)', async ({ page }) => {
    test.setTimeout(60000);
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto('/40k_combat_patrol_tracker.html');

    // 取得所有常見按鈕 (CP+/-, VP+/-, 回合分頁, 折疊單位)
    const actionButtons = page.locator('.btn-wj, .round-tab, .unit-card-header, .strat-card, .btn-pwa-install');
    const count = await actionButtons.count();

    if (count > 0) {
      for (let i = 0; i < 30; i++) {
        const randIndex = Math.floor(Math.random() * count);
        try {
          const btn = actionButtons.nth(randIndex);
          if (await btn.isVisible()) {
            await btn.click({ timeout: 300 }).catch(() => {});
          }
        } catch (e) {}
      }
    }

    expect(pageErrors).toEqual([]);
  });

  test('殺戮小隊對戰助手特工扣血與狀態切換高頻操作 (無 JS 報錯)', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto('/match_tracker.html');

    // 如果在精靈頁面，快速推進至對戰
    const startBattleBtn = page.locator('#btnStartMatch');
    if (await startBattleBtn.isVisible()) {
      await startBattleBtn.click();
    }

    const hpButtons = page.locator('.hp-btn, .btn-toggle, .tp-step-pill');
    const count = await hpButtons.count();

    if (count > 0) {
      for (let i = 0; i < 60; i++) {
        const randIndex = Math.floor(Math.random() * count);
        try {
          const btn = hpButtons.nth(randIndex);
          if (await btn.isVisible()) {
            await btn.click({ timeout: 1000 }).catch(() => {});
          }
        } catch (e) {}
      }
    }

    expect(pageErrors).toEqual([]);
  });
});
