/**
 * 戰錘 40K & 殺戮小隊 繁體中文全戰棋情報庫
 * 全站統一導航、側邊欄模組化、折疊抽屜、螢幕常亮、震動觸感、SVG 圖示與 PWA 支援
 */

const KT_ICONS = {
  home: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
  bolt: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  crosshair: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/></svg>`,
  swords: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="19" x2="11" y2="13"/><line x1="4" y1="20" x2="8" y2="16"/><line x1="3" y1="19" x2="5" y2="21"/></svg>`,
  shield: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  book: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  blood: `<svg class="svg-icon icon-blood" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  ork: `<svg class="svg-icon icon-ork" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14l8-7 8 7"/><path d="M7 11v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8"/><circle cx="9" cy="15" r="1.5" fill="currentColor"/><circle cx="15" cy="15" r="1.5" fill="currentColor"/><path d="M10 19v-2h4v2"/></svg>`,
  fly: `<svg class="svg-icon icon-fly" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="3"/><circle cx="7" cy="16" r="3"/><circle cx="17" cy="16" r="3"/><path d="M12 10v3"/><path d="M9.5 14.5l-1 1"/><path d="M14.5 14.5l1 1"/></svg>`,
  scroll: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11"/></svg>`,
  gear: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  sun: `<svg class="svg-icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg class="svg-icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  search: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  mobile: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  list: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  menu: `<svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  chevronLeft: `<svg class="svg-icon icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg class="svg-icon icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronDown: `<svg class="svg-icon icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
  bullet: `<svg class="svg-icon icon-bullet" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="4"/></svg>`
};

function getIcon(nameOrEmoji) {
  if (KT_ICONS[nameOrEmoji]) return KT_ICONS[nameOrEmoji];
  const map = {
    '🏠': KT_ICONS.home,
    '⚡': KT_ICONS.bolt,
    '🎯': KT_ICONS.crosshair,
    '⚔️': KT_ICONS.swords,
    '🛡️': KT_ICONS.shield,
    '📖': KT_ICONS.book,
    '🩸': KT_ICONS.blood,
    '🟢': KT_ICONS.ork,
    '🪓': KT_ICONS.ork,
    '🪰': KT_ICONS.fly,
    '📜': KT_ICONS.scroll,
    '⚙️': KT_ICONS.gear,
    '☀️': KT_ICONS.sun,
    '🌙': KT_ICONS.moon,
    '🔍': KT_ICONS.search,
    '📲': KT_ICONS.mobile,
    '📑': KT_ICONS.list,
    '☰': KT_ICONS.menu,
    '◀': KT_ICONS.chevronLeft,
    '▾': KT_ICONS.chevronDown,
    '•': KT_ICONS.bullet
  };
  return map[nameOrEmoji] || nameOrEmoji;
}

const SITE_NAVIGATION = [
  {
    type: 'link',
    href: 'index.html',
    icon: 'home',
    title: '首頁總覽'
  },
  {
    type: 'group',
    title: '戰錘 40K (核心 & 戰巡)',
    icon: 'bolt',
    items: [
      { href: '40k_core_rules.html', title: '40K 完整核心規則 (11版)', badge: 'APP同步', badgeClass: 'badge-blue' },
      { href: '40k_combat_patrol_rules.html', title: '戰巡核心作戰手冊 (11版)' },
      { href: '40k_combat_patrol_rules.html#mission-flow', title: '官方任務流程 (10步驟)' },
      { href: '40k_combat_patrol_tracker.html', title: '戰巡對戰助手 (War Journal)', badge: 'HOT', badgeClass: 'badge-red' },
      { type: 'label', title: '戰巡隊資料卡 (DATASHEETS)' },
      { href: '40k_cp_astartes.html', icon: 'blood', title: '突擊分隊 (阿斯塔特)' },
      { href: '40k_cp_orks.html', icon: 'ork', title: '硬漢幫 (歐克蠻人)' },
      { href: 'index.html#cp-roster-directory', icon: 'scroll', title: 'App 全 24 支戰巡名冊' }
    ]
  },
  {
    type: 'group',
    title: '殺戮小隊 (Kill Team)',
    icon: 'crosshair',
    items: [
      { href: 'rule_lite.html', title: '核心作戰規則 (精簡版)' },
      { href: 'match_tracker.html', title: '殺戮小隊計分助手', badge: 'KT 3版', badgeClass: 'badge-red' },
      { type: 'label', title: '特遣戰隊 (TEAMS)' },
      { href: 'death_of_angel_web_rule.html', icon: 'blood', title: '死亡天使 (Angels of Death)' },
      { href: 'angel_of_death_starter_set_rule.html', icon: 'blood', title: '死亡天使 (入門版手冊)' },
      { href: 'Kommandos.html', icon: 'ork', title: '歐克特戰小子 (Kommandos)' },
      { href: 'plague_marine.html', icon: 'fly', title: '瘟疫戰士 (Plague Marines)' },
      { href: 'plague_marine_starter_set_rule.html', icon: 'fly', title: '瘟疫戰士 (入門版手冊)' },
      { href: 'universal_equipment.html', icon: 'gear', title: '通用戰術裝備庫' }
    ]
  },
  {
    type: 'group',
    title: '對戰助手專區',
    icon: 'swords',
    items: [
      { href: '40k_combat_patrol_tracker.html', icon: 'bolt', title: '40K 戰巡 War Journal 助手', badge: 'HOT', badgeClass: 'badge-red' },
      { href: 'match_tracker.html', icon: 'crosshair', title: '殺戮小隊 對戰計分助手' }
    ]
  },
  {
    type: 'link',
    href: 'index.html#weapons-glossary',
    icon: 'book',
    title: '特規與武器辭典'
  }
];

function toggleNavGroup(btn) {
  const group = btn.closest('.nav-group');
  if (group) {
    group.classList.toggle('open');
    const expanded = group.classList.contains('open');
    btn.setAttribute('aria-expanded', expanded);
  }
}

function renderModularSidebar() {
  const sidebar = document.getElementById('appSidebar');
  if (!sidebar) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  let navHtml = '';
  SITE_NAVIGATION.forEach(item => {
    if (item.type === 'link') {
      const isTarget = item.href === currentPath || (currentPath === '' && item.href === 'index.html');
      navHtml += `
        <a href="${item.href}" class="nav-item-link ${isTarget ? 'active' : ''}">
          <span class="nav-icon">${getIcon(item.icon)}</span>
          <span class="nav-text">${item.title}</span>
        </a>
      `;
    } else if (item.type === 'group') {
      let groupItemsHtml = '';
      let isGroupActive = false;

      item.items.forEach(sub => {
        if (sub.type === 'label') {
          groupItemsHtml += `<div class="sub-group-label">${sub.title}</div>`;
        } else {
          const subBase = sub.href.split('#')[0];
          const isTarget = sub.href === currentPath || subBase === currentPath;
          if (isTarget) isGroupActive = true;

          const badgeHtml = sub.badge ? `<span class="sub-badge ${sub.badgeClass || 'badge-blue'}">${sub.badge}</span>` : '';
          const bullet = sub.icon ? getIcon(sub.icon) : getIcon('bullet');

          groupItemsHtml += `
            <a href="${sub.href}" class="sub-nav-link ${isTarget ? 'active' : ''}">
              <span class="sub-bullet">${bullet}</span>
              <span>${sub.title}</span>
              ${badgeHtml}
            </a>
          `;
        }
      });

      navHtml += `
        <div class="nav-group ${isGroupActive ? 'open' : ''}">
          <button type="button" class="nav-group-header" onclick="toggleNavGroup(this)" aria-expanded="${isGroupActive}">
            <span class="group-header-left">
              <span class="nav-icon">${getIcon(item.icon)}</span>
              <span class="nav-text">${item.title}</span>
            </span>
            <span class="group-arrow">${getIcon('chevronDown')}</span>
          </button>
          <div class="nav-sub-list">
            ${groupItemsHtml}
          </div>
        </div>
      `;
    }
  });

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <a href="index.html" class="sidebar-logo" title="返回首頁總覽">
        <img src="assets/wh40k_logo.png" alt="戰錘 40K & KT" class="sidebar-logo-img" decoding="async">
        <div class="sidebar-title-group">
          <span class="sidebar-brand-name">戰錘 40K &amp; KT</span>
          <span class="sidebar-brand-sub">繁體中文情報庫</span>
        </div>
      </a>
      <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" title="收合/展開側邊欄" aria-label="收合側邊欄">${getIcon('chevronLeft')}</button>
    </div>

    <div class="sidebar-scrollable">
      <nav class="sidebar-nav">
        ${navHtml}
      </nav>
    </div>

    <div class="sidebar-footer d-flex flex-col gap-1 items-stretch">
      <div class="d-flex justify-between items-center w-full">
        <span>GW 官方 App 實機同步</span>
        <span class="version-badge font-badge" id="sidebarVersionBadge">v3.5.0 PWA</span>
      </div>
      <button type="button" class="btn-pwa-install sidebar-pwa-btn w-full justify-center font-badge d-inline-flex items-center gap-1">${getIcon('mobile')} <span>安裝為桌面/手機 App</span></button>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. 動態渲染標準化側邊欄 (Single Source of Truth)
  renderModularSidebar();

  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const collapseBtn = document.getElementById('sidebarCollapseBtn');
  const menuBtns = document.querySelectorAll('.mobile-menu-btn, .sidebar-toggle-btn, #mobileMenuBtn');

  // 初始化頂部漢堡選單按鈕 SVG 圖示
  menuBtns.forEach(btn => {
    btn.innerHTML = getIcon('menu');
  });

  const updateCollapseIcon = () => {
    if (collapseBtn && sidebar) {
      const isCollapsed = sidebar.classList.contains('collapsed');
      collapseBtn.innerHTML = isCollapsed ? getIcon('chevronRight') : getIcon('chevronLeft');
      collapseBtn.title = isCollapsed ? '展開側邊欄' : '收合側邊欄';
    }
  };

  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('mobile-open');
        if (backdrop) backdrop.classList.remove('active');
      } else {
        sidebar.classList.toggle('collapsed');
        updateCollapseIcon();
        try {
          localStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
        } catch (err) {}
      }
    });

    try {
      if (window.innerWidth > 900 && localStorage.getItem('sidebar_collapsed') === 'true') {
        sidebar.classList.add('collapsed');
      }
    } catch (err) {}
    updateCollapseIcon();
  }

  // 3. 頂部導航列漢堡按鈕 (☰)：桌面端切換收合，手機端開關抽屜
  menuBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!sidebar) return;

      if (window.innerWidth <= 900) {
        // 行動裝置抽屜模式
        const isOpen = sidebar.classList.toggle('mobile-open');
        if (backdrop) {
          if (isOpen) backdrop.classList.add('active');
          else backdrop.classList.remove('active');
        }
      } else {
        // 桌面端縮合模式
        sidebar.classList.toggle('collapsed');
        try {
          localStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
        } catch (err) {}
      }
    });
  });

  // 4. 手機版點擊背景遮罩關閉
  if (backdrop && sidebar) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    });
  }

  // 5. 手機版點擊側邊欄內部的任意連結時，自動關閉抽屜（體驗更流暢）
  if (sidebar) {
    const navLinks = sidebar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          sidebar.classList.remove('mobile-open');
          if (backdrop) backdrop.classList.remove('active');
        }
      });
    });
  }

  // 6. 監聽螢幕寬度改變，若超過 900px 自動關閉手機抽屜
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && sidebar) {
      sidebar.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('active');
    }
  });

  // 7. 註冊 PWA Service Worker (支援離線查閱規則與對戰計分)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('[PWA] ServiceWorker 註冊成功，範圍:', reg.scope);
        })
        .catch(err => {
          console.warn('[PWA] ServiceWorker 註冊失敗:', err);
        });
    });
  }

  // 8. PWA 安裝按鈕支援
  let deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtns = document.querySelectorAll('.btn-pwa-install');
    installBtns.forEach(btn => {
      btn.style.display = 'inline-flex';
      btn.addEventListener('click', async () => {
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          const choiceResult = await deferredInstallPrompt.userChoice;
          console.log('[PWA] 安裝選項回饋:', choiceResult.outcome);
          deferredInstallPrompt = null;
          btn.style.display = 'none';
        }
      });
    });
  });

  // 9. 全站武器規則標籤 (.wp-rule-tag) 點擊 / 懸停互動說明浮窗
  initWpRuleTooltips();

  // 10. 初始化螢幕常亮與觸感回饋按鈕狀態
  updateWakeLockUI(false);
  updateHapticsUI();

  // 11. 初始化全站即時搜尋 (Global Search Modal)
  initGlobalSearch();

  // 12. 初始化深色/淺色主題切換 (Dark Mode)
  initThemeToggle();

  // 13. 初始化手機專屬底部導覽列 (Mobile Bottom Nav)
  initMobileBottomNav();
});

/**
 * 全站武器規則標籤 (.wp-rule-tag) 全域互動浮動提示
 */
/**
 * 全站武器規則標籤 (.wp-rule-tag, .rule-pill, .rule-badge) 全域互動浮動提示
 */
function initWpRuleTooltips() {
  if (document.getElementById('tacticalPopover')) return;

  // 判斷當前頁面是 40K 戰巡/核心規則 或是 殺戮小隊 (Kill Team)
  const is40k = document.body.dataset.game === '40k' ||
                window.location.pathname.includes('40k_') ||
                (document.title.includes('40K') && !document.title.includes('Kill Team') && !document.title.includes('KT') && !document.title.includes('殺戮小隊'));

  // 殺戮小隊 (Kill Team 3版) 規則定義
  const ktRuleDefs = [
    {
      regex: /^(?:射程|Range)\s*(\d+["”]?)/i,
      title: (m) => `射程 ${m[1]} (Range ${m[1]})`,
      desc: (m) => `距離限制武器。只有在距離發動特工 ${m[1]} 範圍以內的敵方特工，才能被選為此武器的有效目標。`
    },
    {
      regex: /^(?:洪流|Torrent)\s*(\d+["”]?)/i,
      title: (m) => `洪流 ${m[1]} (Torrent ${m[1]})`,
      desc: (m) => `選定主要目標後，可同時選擇距離主要目標 ${m[1]} 範圍內、且不在友軍控制範圍內的任意數量其他可見特工為次要目標，依序分別單獨射擊。`
    },
    {
      regex: /^(?:爆破|爆炸|Blast)\s*(\d+["”]?)/i,
      title: (m) => `爆破 ${m[1]} (Blast ${m[1]})`,
      desc: (m) => `射擊主目標後，對距離主目標 ${m[1]} 範圍以內且對其可見的所有次要目標依序單獨結算射擊（次要目標結算時無視隱蔽指令）。`
    },
    {
      regex: /^(?:爆擊穿刺|Piercing\s+Crits)\s*(\d+)/i,
      title: (m) => `爆擊穿刺 ${m[1]} (Piercing Crits ${m[1]})`,
      desc: (m) => `唯有你在此次攻擊中保留了「爆擊成功」時，防禦方擲出的防禦骰數量才減少 ${m[1]} 顆。`
    },
    {
      regex: /^(?:穿刺|Piercing)\s*(\d+)/i,
      title: (m) => `穿刺 ${m[1]} (Piercing ${m[1]})`,
      desc: (m) => `防禦方擲出的防禦骰數量直接減少 ${m[1]} 顆。`
    },
    {
      regex: /^(?:毀滅|Devastating)\s*(\d+)/i,
      title: (m) => `毀滅 ${m[1]} (Devastating ${m[1]})`,
      desc: (m) => `你每次保留 1 次爆擊成功時，立即對目標造成 ${m[1]} 點直接傷害。此爆擊骰後續仍可正常進行打擊結算。`
    },
    {
      regex: /^(?:致命|Lethal)\s*(\d+\+?)/i,
      title: (m) => `致命 ${m[1].includes('+') ? m[1] : m[1] + '+'} (Lethal ${m[1].includes('+') ? m[1] : m[1] + '+'})`,
      desc: (m) => `點數大於或等於 ${m[1].includes('+') ? m[1] : m[1] + '+'} 的成功骰直接視為「爆擊成功」。`
    },
    {
      regex: /^(?:受限|限定|Limited)\s*(\d+)(?:次)?/i,
      title: (m) => `受限 ${m[1]} (Limited ${m[1]})`,
      desc: (m) => `特工在一場戰鬥中累計使用本武器達到 ${m[1]} 次後彈藥耗盡，無法再次使用本武器。`
    },
    {
      regex: /^(?:精準|Accurate)\s*(\d+)/i,
      title: (m) => `精準 ${m[1]} (Accurate ${m[1]})`,
      desc: (m) => `發動攻擊時，你可以在不擲骰子的情況下，將最多 ${m[1]} 顆攻擊骰直接作為普通成功保留。`
    },
    {
      regex: /^(?:重型|Heavy)(?:\s*\((?:僅奔馳|僅衝刺|Dash only)\))?/i,
      title: (m) => m[0].includes('(') ? '重型 (僅衝刺) (Heavy - Dash only)' : '重型 (Heavy)',
      desc: (m) => m[0].includes('(')
        ? '特工不能在進行過常規移動的啟動或反制中使用此武器。但本特工在同一啟動中仍可執行奔馳/衝刺 (Dash) 行動。'
        : '特工不能在進行過常規移動的啟動或反制中使用此武器，使用此武器後亦不能再執行任何移動。'
    },
    {
      regex: /^(?:過熱|Hot)/i,
      title: () => '過熱 (Hot)',
      desc: () => '使用本武器射擊後擲 1 顆 D6。若點數小於武器命中值，射手受到相當於該點數 × 2 的傷害。'
    },
    {
      regex: /^(?:殘暴|Brutal)/i,
      title: () => '殘暴 (Brutal)',
      desc: () => '在近戰搏鬥中，你的對手只能使用「爆擊成功」進行招架，無法使用普通成功招架你的任何打擊。'
    },
    {
      regex: /^(?:不息|無休|Ceaseless)/i,
      title: () => '不息 (Ceaseless)',
      desc: () => '攻擊擲骰後，你可以挑選一個點數結果，並重擲所有該點數的攻擊骰。'
    },
    {
      regex: /^(?:痛擊|Punishing)/i,
      title: () => '痛擊 (Punishing)',
      desc: () => '若你在攻擊擲骰中保留了任何爆擊成功，你可以將 1 顆原本失敗的攻擊骰轉為普通成功。'
    },
    {
      regex: /^(?:無情|Relentless)/i,
      title: () => '無情 (Relentless)',
      desc: () => '攻擊擲骰後，你可以重擲該次攻擊骰中的任意數量骰子。'
    },
    {
      regex: /^(?:撕裂|Rending)/i,
      title: () => '撕裂 (Rending)',
      desc: () => '若你在此次攻擊中保留了任何爆擊成功，你可以將另外 1 顆普通成功升級為爆擊成功。'
    },
    {
      regex: /^(?:飽和|Saturate)/i,
      title: () => '飽和 (Saturate)',
      desc: () => '防禦方無法獲得掩體（Cover）帶來的免費保留防禦成功（必須正常擲出所有防禦骰）。'
    },
    {
      regex: /^(?:索敵|Seek)/i,
      title: () => '索敵 (Seek)',
      desc: () => '選擇有效目標時，持有隱蔽指令的特工無法藉由地形獲得掩體判定。'
    },
    {
      regex: /^(?:重創|劇烈|Severe)/i,
      title: () => '重創 (Severe)',
      desc: () => '若你本次攻擊擲骰中沒有保留任何爆擊成功，你可以將 1 次普通成功直接替換為爆擊成功。'
    },
    {
      regex: /^(?:震盪|震擊|Shock)/i,
      title: () => '震盪 (Shock)',
      desc: () => '在近戰搏鬥中你首次使用爆擊成功進行打擊時，額外棄置對手 1 顆尚未結算的普通成功。'
    },
    {
      regex: /^(?:靜音|無聲|Silent)/i,
      title: () => '靜音 (Silent)',
      desc: () => '特工在持有「隱蔽指令」的狀態下，依然可以使用本武器正常宣告並執行射擊行動。'
    },
    {
      regex: /^(?:擊暈|Stun)/i,
      title: () => '擊暈 (Stun)',
      desc: () => '若你保留了任何爆擊成功，被本武器攻擊的目標特工其 APL 屬性立即扣減 1 點。'
    },
    {
      regex: /^(?:平衡|Balanced)/i,
      title: () => '平衡 (Balanced)',
      desc: () => '發動攻擊擲骰後，你可以重擲其中的 1 顆攻擊骰。'
    },
    {
      regex: /^(?:劇毒|Poison)/i,
      title: () => '劇毒 (Poison)',
      desc: () => '攻擊骰造成傷害時，目標獲得 1 枚劇毒標記。每次被啟動時受到 1 點傷害。'
    },
    {
      regex: /^(?:淬毒|Toxic)/i,
      title: () => '淬毒 (Toxic)',
      desc: () => '攻擊在行動開始前已帶有劇毒標記的敵方特工時，武器普通傷害與爆擊傷害皆 +1。'
    },
    {
      regex: /^(?:自爆|Explosive)/i,
      title: () => '自爆 (Explosive)',
      desc: () => '史奎格自身恆為爆炸中心主目標，無法獲得掩體，爆炸波及周遭所有敵我單位！'
    }
  ];

  // 戰錘 40,000 (10/11版 戰巡特遣隊) 規則定義
  const wh40kRuleDefs = [
    {
      regex: /^(?:手槍|Pistol)/i,
      title: () => '手槍 (Pistol)',
      desc: () => '【40K 武器特規】配備手槍之模型即使其所屬單位處於敵方單位的接戰範圍（Engagement Range）內，依然可以進行射擊（必須以最近的敵方單位為目標）。'
    },
    {
      regex: /^(?:重型|Heavy)/i,
      title: () => '重型 (Heavy)',
      desc: () => '【40K 武器特規】若配備此武器之單位在此移動階段中「保持靜止（Remained Stationary）」，則該次射擊的命中檢定（Hit roll）+1。'
    },
    {
      regex: /^(?:洪流|Torrent)/i,
      title: () => '洪流 (Torrent)',
      desc: () => '【40K 武器特規】此武器之攻擊自動命中目標單位，無需進行任何命中骰檢定。'
    },
    {
      regex: /^(?:爆破|爆炸|Blast)/i,
      title: () => '爆破 (Blast)',
      desc: () => '【40K 武器特規】目標單位每擁有滿 5 個模型，此武器的攻擊次數（Attacks）便額外 +1。處於接戰範圍內時不可使用。'
    },
    {
      regex: /^(?:持續命中|持續攻擊|Sustained\s+Hits)\s*(\d+)?/i,
      title: (m) => `持續命中 ${m[1] || '1'} (Sustained Hits ${m[1] || '1'})`,
      desc: (m) => `【40K 武器特規】命中擲骰中擲出未經修正的 6（爆擊命中），除了原本的 1 次命中外，額外自動產生 ${m[1] || '1'} 次命中。`
    },
    {
      regex: /^(?:致命命中|Lethal\s+Hits)/i,
      title: () => '致命命中 (Lethal Hits)',
      desc: () => '【40K 武器特規】命中擲骰中擲出未經修正的 6（爆擊命中）將自動成功致傷，無需進行致傷擲骰（Wound roll）。'
    },
    {
      regex: /^(?:毀滅致傷|Devastating\s+Wounds)/i,
      title: () => '毀滅致傷 (Devastating Wounds)',
      desc: () => '【40K 武器特規】致傷擲骰中擲出爆擊致傷（通常為未經修正的 6）時，防禦方不可進行任何防禦檢定（包括無敵存救），直接受到致命傷害。'
    },
    {
      regex: /^(?:危險|Hazardous)/i,
      title: () => '危險 (Hazardous)',
      desc: () => '【40K 武器特規】使用此武器攻擊後擲 1 顆 D6。若出現 1，則該單位必須損失 1 個配備該武器的模型（或受到 3 點致命傷害）。'
    },
    {
      regex: /^(?:速射|Rapid\s+Fire)\s*(\d+)/i,
      title: (m) => `速射 ${m[1]} (Rapid Fire ${m[1]})`,
      desc: (m) => `【40K 武器特規】若目標處於該武器射程的一半（Half Range）距離內，該武器的攻擊次數增加 ${m[1]} 次。`
    },
    {
      regex: /^(?:長矛|Lance)/i,
      title: () => '長矛 (Lance)',
      desc: () => '【40K 武器特規】若裝備者所屬單位在當次回合執行過「衝鋒（Charged）」，則其近戰致傷檢定 +1。'
    },
    {
      regex: /^(?:精準|Precision)/i,
      title: () => '精準 (Precision)',
      desc: () => '【40K 武器特規】當攻擊附隨有「人物（Character）」的衛隊單位時，攻擊方可將致傷成功的傷害直接指定分配給該人物模型。'
    },
    {
      regex: /^(?:反|Anti-)\s*(\w+)\s*(\d+\+?)/i,
      title: (m) => `反 ${m[1]} ${m[2]} (Anti-${m[1]} ${m[2]})`,
      desc: (m) => `【40K 武器特規】當攻擊具備【${m[1]}】關鍵字的目標單位時，致傷骰大於或等於 ${m[2]} 便直接判定為「爆擊致傷（Critical Wound）」。`
    },
    {
      regex: /^(?:雙聯|Twin-linked)/i,
      title: () => '雙聯 (Twin-linked)',
      desc: () => '【40K 武器特規】此武器進行攻擊時，可以重擲所有的致傷骰（Wound roll）。'
    },
    {
      regex: /^(?:忽略掩體|Ignores\s+Cover)/i,
      title: () => '忽略掩體 (Ignores Cover)',
      desc: () => '【40K 武器特規】目標單位無法因掩體（Cover）而在防禦檢定中獲得 +1 存救值效益。'
    },
    {
      regex: /^(?:先攻|Fights\s+First)/i,
      title: () => '先攻 (Fights First)',
      desc: () => '【40K 單位特規】在近戰格鬥階段中，具備先攻的單位優先於未具備先攻的敵方單位選定並結算搏鬥。'
    }
  ];

  const ruleDefs = is40k ? wh40kRuleDefs.concat(ktRuleDefs) : ktRuleDefs.concat(wh40kRuleDefs);

  let tooltipEl = document.getElementById('globalWpTooltip');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'globalWpTooltip';
    tooltipEl.setAttribute('role', 'tooltip');
    tooltipEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(tooltipEl);
  }

  let hideTimer = null;

  function hideTooltip() {
    clearTimeout(hideTimer);
    tooltipEl.style.display = 'none';
  }

  function scheduleHideTooltip(delay = 200) {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideTooltip, delay);
  }

  // 允許使用者滑鼠移動至浮窗內部閱讀或點擊
  tooltipEl.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  tooltipEl.addEventListener('mouseleave', () => scheduleHideTooltip(160));

  function showTooltip(el, e) {
    clearTimeout(hideTimer);
    const rawText = el.innerText.trim();
    if (!rawText || rawText === '—') return;

    let found = null;
    for (const def of ruleDefs) {
      const match = rawText.match(def.regex);
      if (match) {
        found = { title: def.title(match), desc: def.desc(match) };
        break;
      }
    }

    const gameBadge = is40k ? '<span style="font-size:10px; background:#1e3a8a; color:#93c5fd; padding:1px 5px; border-radius:3px; margin-left:6px;">40K 戰巡</span>'
                            : '<span style="font-size:10px; background:#7c2d12; color:#fed7aa; padding:1px 5px; border-radius:3px; margin-left:6px;">殺戮小隊</span>';

    if (!found) {
      found = { 
        title: rawText, 
        desc: is40k 
          ? '此為 40K 特殊武器規則或部隊專屬能力。請參考陣營手冊相關章節說明。' 
          : '此為殺戮小隊之特殊規則或專屬特性。請參考戰隊手冊相關章節說明。' 
      };
    }

    tooltipEl.innerHTML = `
      <div class="tooltip-title" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-weight:800; border-bottom:1px solid #334155; padding-bottom:4px;">
        <span style="display:flex; align-items:center; gap:6px;">${getIcon('search')} ${found.title} ${gameBadge}</span>
        <button type="button" aria-label="關閉提示" style="font-size:14px; color:#94a3b8; background:transparent; border:none; cursor:pointer; padding:2px 6px; line-height:1;" onclick="event.stopPropagation(); document.getElementById('globalWpTooltip').style.display='none';">✕</button>
      </div>
      <p class="tooltip-desc" style="margin:0; font-size:11.5px; line-height:1.5; color:#cbd5e1;">${found.desc}</p>
    `;

    tooltipEl.style.display = 'block';
    const rect = el.getBoundingClientRect();
    const ttWidth = Math.min(300, window.innerWidth - 20);
    tooltipEl.style.width = ttWidth + 'px';

    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 6;

    if (left + ttWidth > window.innerWidth - 12) {
      left = Math.max(8, window.innerWidth - ttWidth - 16 + window.scrollX);
    }

    // 若下方超出螢幕，自動調整顯示在標籤上方
    if (rect.bottom + 180 > window.innerHeight && rect.top > 180) {
      top = rect.top + window.scrollY - 8;
      tooltipEl.style.transform = 'translateY(-100%)';
    } else {
      tooltipEl.style.transform = 'none';
    }

    tooltipEl.style.left = Math.max(8, left) + 'px';
    tooltipEl.style.top = top + 'px';
  }

  // 支援全站所有規則標籤 (.wp-rule-tag, .rule-pill, .rule-badge)
  const targetTags = document.querySelectorAll('.wp-rule-tag, .rule-pill, .rule-badge');
  targetTags.forEach(tag => {
    tag.setAttribute('title', '點擊或懸停查看規則詳情');
    if (!tag.hasAttribute('tabindex')) {
      tag.setAttribute('tabindex', '0');
    }
    tag.setAttribute('role', 'button');
    tag.setAttribute('aria-haspopup', 'dialog');

    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      showTooltip(tag, e);
    });
    tag.addEventListener('mouseenter', (e) => {
      showTooltip(tag, e);
    });
    tag.addEventListener('mouseleave', () => {
      scheduleHideTooltip(220);
    });
    tag.addEventListener('focus', (e) => {
      showTooltip(tag, e);
    });
    tag.addEventListener('blur', () => {
      scheduleHideTooltip(160);
    });
    tag.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showTooltip(tag, e);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!tooltipEl.contains(e.target)) {
      hideTooltip();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideTooltip();
    }
  });

  window.addEventListener('scroll', () => {
    scheduleHideTooltip(120);
  }, { passive: true });
}

// 10. 自動依當前 URL 標記側邊欄現正瀏覽項目 (Active Nav Link)
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-link, .nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || href.startsWith(currentPath + '?'))) {
      link.classList.add('active');
    }
  });
});

/**
 * 全站現代化 Toast 通知系統 (代替傳統 alert)
 * @param {string} message 提示訊息
 * @param {'success'|'danger'|'warning'|'info'} type 類型
 * @param {number} duration 停留時間 (ms)
 */
function showToast(message, type = 'info', duration = 3200) {
  let container = document.getElementById('ui-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ui-toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const icons = {
    success: '✅',
    danger: '⚠️',
    warning: '🔔',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `ui-toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span style="flex:1;">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/**
 * 全站現代化無障礙確認對話框 (代替傳統 window.confirm)
 */
function showConfirmModal({
  title = '操作確認',
  message = '您確定要執行此操作嗎？',
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = '確定',
  cancelText = '取消',
  isDanger = false
}) {
  let overlay = document.getElementById('ui-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'ui-modal-overlay';
    document.body.appendChild(overlay);
  }

  const hasCancel = cancelText !== null && cancelText !== false;

  overlay.innerHTML = `
    <div class="ui-modal-box" role="dialog" aria-modal="true" aria-labelledby="uiModalTitle">
      <div class="ui-modal-header">
        <span id="uiModalTitle">${title}</span>
        <button type="button" class="btn btn-ghost btn-sm" id="uiModalCloseBtn" aria-label="關閉對話框" style="padding:2px 8px; font-size:16px;">✕</button>
      </div>
      <div class="ui-modal-body">
        ${message}
      </div>
      <div class="ui-modal-footer">
        ${hasCancel ? `<button type="button" class="btn btn-secondary btn-md" id="uiModalCancelBtn">${cancelText}</button>` : ''}
        <button type="button" class="btn ${isDanger ? 'btn-danger' : 'btn-primary'} btn-md" id="uiModalConfirmBtn">${confirmText}</button>
      </div>
    </div>
  `;

  overlay.classList.add('active');

  const cleanup = () => {
    overlay.classList.remove('active');
    overlay.innerHTML = '';
    document.removeEventListener('keydown', handleEsc);
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      cleanup();
      onCancel();
    }
  };
  document.addEventListener('keydown', handleEsc);

  const closeBtn = document.getElementById('uiModalCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      cleanup();
      onCancel();
    });
  }

  if (hasCancel) {
    const cancelBtn = document.getElementById('uiModalCancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        cleanup();
        onCancel();
      });
    }
  }

  const confirmBtn = document.getElementById('uiModalConfirmBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      cleanup();
      onConfirm();
    });
  }

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      cleanup();
      onCancel();
    }
  };
}

/**
 * 全站現代化醒目警示/通知彈窗 (代替重大 alert，具備標題與完整內容)
 */
function showModalAlert({
  title = '系統提醒',
  message = '',
  onConfirm = () => {},
  confirmText = '了解'
}) {
  showConfirmModal({
    title,
    message,
    onConfirm,
    confirmText,
    cancelText: null
  });
}

// 支援全域掛載 window.showToast, window.showConfirmModal, window.showModalAlert
window.showToast = showToast;
window.showConfirmModal = showConfirmModal;
window.showModalAlert = showModalAlert;

// ===================================================================
// 對戰體驗增強：螢幕常亮控制 (Screen Wake Lock API)
// ===================================================================
let wakeLockSentinel = null;

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        updateWakeLockUI(false);
      });
      updateWakeLockUI(true);
      return true;
    } catch (err) {
      console.warn('[WakeLock] 請求失敗:', err);
      updateWakeLockUI(false);
      return false;
    }
  }
  return false;
}

async function releaseWakeLock() {
  if (wakeLockSentinel) {
    try {
      await wakeLockSentinel.release();
    } catch (err) {}
    wakeLockSentinel = null;
    updateWakeLockUI(false);
  }
}

async function toggleWakeLock() {
  if (wakeLockSentinel) {
    await releaseWakeLock();
    if (window.showToast) window.showToast('已關閉螢幕常亮', 'info');
  } else {
    const ok = await requestWakeLock();
    if (ok) {
      if (window.showToast) window.showToast('🔆 螢幕常亮已開啟（對戰期間不會自動休眠黑屏）', 'success');
      triggerHaptic('success');
    } else {
      if (window.showToast) window.showToast('此瀏覽器或裝置不支援 Screen Wake Lock', 'warning');
    }
  }
}

function updateWakeLockUI(active) {
  const btns = document.querySelectorAll('.btn-wake-lock');
  btns.forEach(btn => {
    const icon = btn.querySelector('.wake-lock-icon');
    const text = btn.querySelector('.wake-lock-text');
    if (active) {
      btn.classList.add('btn-success');
      btn.classList.remove('btn-secondary');
      if (icon) icon.textContent = '💡';
      if (text) text.textContent = '常亮中';
      btn.title = '螢幕常亮中（對戰不黑屏），點擊關閉';
    } else {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-secondary');
      if (icon) icon.textContent = '🔆';
      if (text) text.textContent = '螢幕常亮';
      btn.title = '開啟螢幕常亮（防止手機自動休眠鎖屏）';
    }
  });
}

document.addEventListener('visibilitychange', async () => {
  if (wakeLockSentinel !== null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
});

// ===================================================================
// 對戰體驗增強：觸感震動回饋 (Haptic Feedback API)
// ===================================================================
let isHapticsEnabled = localStorage.getItem('kt_haptics_enabled') !== 'false';

function triggerHaptic(type = 'light') {
  if (!isHapticsEnabled || !navigator.vibrate) return;
  try {
    switch (type) {
      case 'light':
        navigator.vibrate(15);
        break;
      case 'medium':
        navigator.vibrate(28);
        break;
      case 'heavy':
        navigator.vibrate(45);
        break;
      case 'success':
        navigator.vibrate([20, 30, 20]);
        break;
      case 'warning':
        navigator.vibrate([35, 25, 35]);
        break;
      case 'danger':
        navigator.vibrate([60, 40, 80]);
        break;
      case 'dice':
        navigator.vibrate([12, 18, 12, 18, 25]);
        break;
      default:
        navigator.vibrate(20);
    }
  } catch (err) {}
}

function toggleHaptics() {
  isHapticsEnabled = !isHapticsEnabled;
  localStorage.setItem('kt_haptics_enabled', isHapticsEnabled);
  updateHapticsUI();
  if (isHapticsEnabled) {
    triggerHaptic('success');
    if (window.showToast) window.showToast('📳 觸感震動回饋已開啟', 'success');
  } else {
    if (window.showToast) window.showToast('📳 觸感震動回饋已關閉', 'info');
  }
}

function updateHapticsUI() {
  const btns = document.querySelectorAll('.btn-haptic-toggle');
  btns.forEach(btn => {
    btn.style.opacity = isHapticsEnabled ? '1' : '0.4';
    btn.title = isHapticsEnabled ? '操作震動回饋：已開啟 (點擊關閉)' : '操作震動回饋：已關閉 (點擊開啟)';
  });
}

// 支援全域掛載
window.triggerHaptic = triggerHaptic;
window.toggleWakeLock = toggleWakeLock;
window.toggleHaptics = toggleHaptics;
window.requestWakeLock = requestWakeLock;
window.releaseWakeLock = releaseWakeLock;
window.updateWakeLockUI = updateWakeLockUI;
window.updateHapticsUI = updateHapticsUI;

// ===================================================================
// 全站即時規則與陣營搜尋系統 (GLOBAL SEARCH MODAL)
// ===================================================================
const SITE_SEARCH_INDEX = [
  // 核心入口與對戰助手
  {
    title: '首頁總覽 (Portal Home)',
    category: '首頁總覽',
    desc: '雙系統規則導覽、對戰助手與各陣營數據卡總入口',
    url: 'index.html',
    keywords: ['首頁', '總覽', 'home', 'portal', '戰錘', 'kill team', 'combat patrol']
  },
  {
    title: '殺戮小隊：對戰助手 (Kill Team Match Tracker)',
    category: 'KT 工具',
    desc: '雙人即時對戰計分、特工血量 (Wounds) 扣減、CP/VP 計算、先攻擲骰與戰鬥記錄',
    url: 'match_tracker.html',
    keywords: ['對戰助手', '計分', '血量', 'tracker', 'match', '殺戮小隊', 'kt', 'vp', 'cp', 'tp', '轉折點']
  },
  {
    title: '戰錘40K：戰巡對戰助手 (Combat Patrol Tracker)',
    category: '40K 工具',
    desc: '雙人 40K 戰巡對戰計分、部隊血量與傷亡狀態、作戰日誌、次要任務記分',
    url: '40k_combat_patrol_tracker.html',
    keywords: ['40k對戰助手', '戰巡記分', 'combat patrol tracker', '血量追蹤', '次要任務', '作戰日誌']
  },

  // 殺戮小隊規則與裝備
  {
    title: '殺戮小隊：快速入門規則 (Kill Team Lite Rules)',
    category: 'KT 規則',
    desc: '3版核心行動速查：衝鋒、交戰/隱蔽指令、射擊/肉搏結算、掩蔽判定與視線',
    url: 'rule_lite.html',
    keywords: ['lite', '入門規則', 'apl', '行動點數', '隱蔽', '交戰', '射擊', '肉搏', '掩蔽', '視線', 'cover', 'los']
  },
  {
    title: '殺戮小隊：通用裝備庫 (Universal Equipment)',
    category: 'KT 裝備',
    desc: '通用裝備 10 項完整數據卡：攀爬繩、梯子、輕型掩體、破片手榴彈、克拉選手榴彈等',
    url: 'universal_equipment.html',
    keywords: ['通用裝備', '裝備', 'equipment', 'ladder', 'barricade', 'grenade', '手榴彈', '梯子', '掩體']
  },

  // 殺戮小隊陣營數據卡
  {
    title: '殺戮小隊：死亡天使 - 完整版 (Angels of Death)',
    category: 'KT 陣營',
    desc: '星際戰士阿斯塔特修會完整特工數據卡、戰團戰術方針、策略與專用裝備',
    url: 'death_of_angel_web_rule.html',
    keywords: ['死亡天使', '星際戰士', 'space marine', 'angels of death', '仲裁者', '突擊仲裁者', '滅絕者', '狙擊手']
  },
  {
    title: '殺戮小隊：死亡天使 - 入門版 (Starter Angels)',
    category: 'KT 陣營',
    desc: '入門套組專用簡化版死亡天使特工數據卡與規則',
    url: 'angel_of_death_starter_set_rule.html',
    keywords: ['入門死亡天使', 'starter angels', '星際戰士入門', '簡易數據卡']
  },
  {
    title: '殺戮小隊：莫塔里安之子 - 完整版 (Plague Marines)',
    category: 'KT 陣營',
    desc: '死亡守衛莫塔里安之子特工數據卡、瘟疫惡疾、厭惡耐受、死亡守衛策略',
    url: 'plague_marine.html',
    keywords: ['莫塔里安之子', '瘟疫戰士', 'plague marine', 'death guard', '死亡守衛', '瘟疫惡疾', '噁心耐受']
  },
  {
    title: '殺戮小隊：莫塔里安之子 - 入門版 (Starter Plague)',
    category: 'KT 陣營',
    desc: '入門套組專用簡化版莫塔里安之子數據卡',
    url: 'plague_marine_starter_set_rule.html',
    keywords: ['入門瘟疫戰士', 'starter plague', '死亡守衛入門']
  },
  {
    title: '殺戮小隊：特戰小子 (Kommandos)',
    category: 'KT 陣營',
    desc: '歐克獸人特戰小子全特工數據卡：首領、爆破小子、狙擊小子、偷偷摸摸策略',
    url: 'Kommandos.html',
    keywords: ['特戰小子', 'kommandos', '歐克獸人', 'ork', '首領', '爆破小子', 'waaagh']
  },

  // 戰錘40K 規則與陣營
  {
    title: '戰錘40K：第11版核心規則 (40K Core Rules)',
    category: '40K 規則',
    desc: '11版核心規則完整手冊：戰鬥輪次、移動階段、射擊階段、衝鋒與近戰、戰鬥耗損考驗 (Battle-shock)',
    url: '40k_core_rules.html',
    keywords: ['核心規則', 'core rules', '40k', '移動階段', '射擊階段', '衝鋒', '肉搏', '戰鬥耗損', 'battleshock', 'stratagem']
  },
  {
    title: '戰錘40K：戰巡作戰規則 (Combat Patrol Rules)',
    category: '40K 規則',
    desc: '戰巡作戰模式規則：次要任務卡牌系統、增強策略與戰巡計分方式',
    url: '40k_combat_patrol_rules.html',
    keywords: ['戰巡作戰規則', 'combat patrol rules', '次要任務', '作戰方針', '增強策略']
  },
  {
    title: '戰錘40K：極限戰士打擊部隊 (Strike Force Octavius)',
    category: '40K 戰巡',
    desc: '星際戰士極限戰士戰巡部隊數據卡：終結者隊長、無畏機甲、地獄火小隊、誓言目標',
    url: '40k_cp_astartes.html',
    keywords: ['極限戰士', 'astartes', 'strike force octavius', '終結者隊長', '無畏機甲', '誓言目標', 'oath of moment']
  },
  {
    title: '戰錘40K：莫格林屠夫部隊 (Morgrim\'s Butchas)',
    category: '40K 戰巡',
    desc: '歐克獸人戰巡部隊數據卡：莫格林野獸首領、野獸小子、騎豬大隻佬、WAAAGH! 大狂呼',
    url: '40k_cp_orks.html',
    keywords: ['歐克戰巡', 'morgrim', 'butchas', '野獸首領', '野獸小子', 'waaagh', '獸人戰巡']
  },

  // 常見核心規則速查錨點
  {
    title: '殺戮小隊：行動點數限制 (APL) 與通用行動',
    category: 'KT 規則',
    desc: '每回合特工擁有的行動點數限制 (APL)，可用於一般移動、改向、衝鋒、射擊、肉搏、拾取等行動。',
    url: 'rule_lite.html#actions',
    keywords: ['apl', '行動點數', '通用行動', '衝鋒', 'charge', 'reposition', '改向', '移動']
  },
  {
    title: '殺戮小隊：隱蔽 (Conceal) 與交戰 (Engage) 指令',
    category: 'KT 規則',
    desc: '特工指令狀態：隱蔽狀態下在有效掩體後無法被選為射擊有效目標；交戰狀態可進行射擊與衝鋒。',
    url: 'rule_lite.html#orders',
    keywords: ['隱蔽', '交戰', 'conceal', 'engage', '指令', 'order', '視線', '掩體']
  },
  {
    title: '戰錘40K：戰鬥震懾步驟 (Battle-shock Step)',
    category: '40K 規則',
    desc: '部隊低於半數實力時必須進行戰鬥震懾擲骰，未通過時控點數 (OC) 歸零且無法使用戰略計策。',
    url: '40k_core_rules.html#sec-08',
    keywords: ['battleshock', '戰鬥震懾', '戰鬥耗損', '士氣', '控點', 'oc', '震懾']
  },
  {
    title: '戰錘40K：戰略計策與指揮點數 (Command Points & Stratagems)',
    category: '40K 規則',
    desc: '指揮重投、迎頭痛擊、英雄介入、火力掩護等核心戰略計策說明與 CP 消耗方式。',
    url: '40k_core_rules.html#sec-15',
    keywords: ['cp', '指揮點數', 'stratagems', '計謀', '計策', '重投', '英雄介入', '火力掩護']
  }
];

let searchSelectedIndex = -1;
let currentSearchResults = [];

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initGlobalSearch() {
  // 1. 如果頂部導航列已有 actions 容器且尚未放入搜尋按鈕，自動注入搜尋按鈕
  const topbarActions = document.querySelector('.topbar-actions');
  if (topbarActions && !document.getElementById('topbarSearchBtn')) {
    const searchBtn = document.createElement('button');
    searchBtn.type = 'button';
    searchBtn.className = 'topbar-search-btn';
    searchBtn.id = 'topbarSearchBtn';
    searchBtn.title = '全站即時搜尋 (⌘K / Ctrl+K / /)';
    searchBtn.innerHTML = `<span class="search-icon" style="display:inline-flex; align-items:center;">${getIcon('search')}</span><span>搜尋...</span><kbd>⌘K</kbd>`;
    searchBtn.addEventListener('click', openGlobalSearch);
    topbarActions.prepend(searchBtn);
  }

  // 2. 注入搜尋彈出框 HTML（若不存在）
  if (!document.getElementById('globalSearchOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'globalSearchOverlay';
    overlay.innerHTML = `
      <div class="search-modal-box" onclick="event.stopPropagation()">
        <div class="search-input-header">
          <span class="search-icon-large" style="display:inline-flex; align-items:center;">${getIcon('search')}</span>
          <input type="text" id="globalSearchInput" class="search-main-input" aria-label="搜尋全站規則、陣營、數據卡、武器特性 (支援中英文)" placeholder="搜尋全站規則、陣營、數據卡、武器特性 (支援中英文)..." autocomplete="off" spellcheck="false">
          <span class="search-close-key" onclick="closeGlobalSearch()" style="cursor:pointer;" title="關閉">ESC</span>
        </div>
        <div class="search-results-list" id="searchResultsList"></div>
        <div class="search-footer-hint">
          <span style="display:inline-flex; align-items:center; gap:4px;">${getIcon('bolt')} 支援快捷鍵 <kbd>↑</kbd> <kbd>↓</kbd> 選擇，<kbd>Enter</kbd> 前往，<kbd>ESC</kbd> 退出</span>
          <span id="searchResultCount">共 ${SITE_SEARCH_INDEX.length} 筆項目</span>
        </div>
      </div>
    `;
    overlay.addEventListener('click', closeGlobalSearch);
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#globalSearchInput');
    input.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim());
    });

    input.addEventListener('keydown', handleSearchKeydown);
  }

  // 3. 全域鍵盤快捷鍵 (Cmd+K / Ctrl+K / '/')
  document.addEventListener('keydown', (e) => {
    const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
    const activeEl = document.activeElement;
    const isEditing = activeEl && (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName) || activeEl.isContentEditable);
    const isSlash = e.key === '/' && !isEditing;
    if (isCmdK || isSlash) {
      e.preventDefault();
      toggleGlobalSearch();
    } else if (e.key === 'Escape') {
      const overlay = document.getElementById('globalSearchOverlay');
      if (overlay && overlay.classList.contains('active')) {
        closeGlobalSearch();
      }
    }
  });
}

function openGlobalSearch() {
  const overlay = document.getElementById('globalSearchOverlay');
  if (!overlay) return;
  overlay.classList.add('active');
  const input = document.getElementById('globalSearchInput');
  if (input) {
    input.value = '';
    renderSearchResults('');
    input.focus();
  }
}

function closeGlobalSearch() {
  const overlay = document.getElementById('globalSearchOverlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

function toggleGlobalSearch() {
  const overlay = document.getElementById('globalSearchOverlay');
  if (overlay && overlay.classList.contains('active')) {
    closeGlobalSearch();
  } else {
    openGlobalSearch();
  }
}

function renderSearchResults(query) {
  const listEl = document.getElementById('searchResultsList');
  const countEl = document.getElementById('searchResultCount');
  if (!listEl) return;

  searchSelectedIndex = 0;

  if (!query) {
    // 預設列出全部主要頁面
    currentSearchResults = [...SITE_SEARCH_INDEX];
  } else {
    const qLower = query.toLowerCase();
    const tokens = qLower.split(/\s+/).filter(Boolean);
    currentSearchResults = SITE_SEARCH_INDEX.filter(item => {
      const textToSearch = [
        item.title,
        item.category,
        item.desc,
        ...(item.keywords || [])
      ].join(' ').toLowerCase();
      return tokens.every(token => textToSearch.includes(token));
    });
  }

  if (countEl) {
    countEl.textContent = `找到 ${currentSearchResults.length} 筆結果`;
  }

  if (currentSearchResults.length === 0) {
    listEl.innerHTML = `
      <div style="padding:24px 16px; text-align:center; color:#94a3b8; font-size:13px;">
        <span style="display:flex; justify-content:center; margin-bottom:8px;">${getIcon('search')}</span>
        找不到符合「<strong>${escapeHtml(query)}</strong>」的規則或頁面，請嘗試其他關鍵字。
      </div>
    `;
    return;
  }

  listEl.innerHTML = currentSearchResults.map((item, idx) => `
    <a href="${item.url}" class="search-result-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}" onclick="closeGlobalSearch()">
      <div class="search-result-left">
        <div class="search-result-title">${highlightMatch(item.title, query)}</div>
        <div class="search-result-desc">${highlightMatch(item.desc, query)}</div>
      </div>
      <span class="search-result-cat">${item.category}</span>
    </a>
  `).join('');
}

function highlightMatch(text, query) {
  if (!query || !text) return escapeHtml(text);
  const qLower = query.toLowerCase();
  const idx = text.toLowerCase().indexOf(qLower);
  if (idx === -1) return escapeHtml(text);
  const matched = text.substring(idx, idx + query.length);
  return escapeHtml(text.substring(0, idx)) +
    `<strong style="color:var(--theme-primary, #0284c7); text-decoration:underline;">${escapeHtml(matched)}</strong>` +
    escapeHtml(text.substring(idx + query.length));
}

function handleSearchKeydown(e) {
  const items = document.querySelectorAll('.search-result-item');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    searchSelectedIndex = (searchSelectedIndex + 1) % items.length;
    updateSelectedSearchItem(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    searchSelectedIndex = (searchSelectedIndex - 1 + items.length) % items.length;
    updateSelectedSearchItem(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (items[searchSelectedIndex]) {
      items[searchSelectedIndex].click();
    }
  }
}

function updateSelectedSearchItem(items) {
  items.forEach((item, idx) => {
    if (idx === searchSelectedIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

// ===================================================================
// 深色模式主題切換 (DARK / LIGHT MODE TOGGLE)
// ===================================================================
function initThemeToggle() {
  const savedTheme = localStorage.getItem('kt_theme_mode');
  // 預設採用淺色主題，避免在深色樣式未完備前因 OS 偏好引發對比破版；僅使用者手動點擊才切換深色
  const isDark = savedTheme === 'dark';

  applyTheme(isDark, false);

  // 注入頂部主題切換按鈕（若頂部 actions 容器存在且尚未加入）
  const topbarActions = document.querySelector('.topbar-actions');
  if (topbarActions && !document.getElementById('topbarThemeBtn')) {
    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'topbar-theme-btn';
    themeBtn.id = 'topbarThemeBtn';
    themeBtn.setAttribute('aria-label', '切換深色/淺色主題');
    themeBtn.title = isDark ? '切換為淺色模式' : '切換為深色模式';
    themeBtn.innerHTML = isDark ? getIcon('sun') : getIcon('moon');
    themeBtn.addEventListener('click', toggleThemeMode);
    topbarActions.appendChild(themeBtn);
  }
}

function toggleThemeMode() {
  const isCurrentlyDark = document.body.classList.contains('theme-dark-mode');
  const newDark = !isCurrentlyDark;
  applyTheme(newDark, true);
}

function applyTheme(isDark, showToastFeedback = false) {
  if (isDark) {
    document.body.classList.add('theme-dark-mode');
    localStorage.setItem('kt_theme_mode', 'dark');
  } else {
    document.body.classList.remove('theme-dark-mode');
    localStorage.setItem('kt_theme_mode', 'light');
  }

  const themeBtn = document.getElementById('topbarThemeBtn');
  if (themeBtn) {
    themeBtn.innerHTML = isDark ? getIcon('sun') : getIcon('moon');
    themeBtn.title = isDark ? '切換為淺色模式' : '切換為深色模式';
  }

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', isDark ? '#0b1120' : '#0f172a');
  }

  if (showToastFeedback && window.showToast) {
    window.showToast(isDark ? '已開啟深色模式' : '已切換為淺色模式', 'info');
  }
}

// ===================================================================
// 手機版底部導覽列 (MOBILE BOTTOM NAVIGATION)
// ===================================================================
function initMobileBottomNav() {
  if (document.getElementById('mobileBottomNav')) return;

  const currentPath = window.location.pathname.toLowerCase();
  const isHome = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
  const isKT = currentPath.includes('match_tracker');
  const is40k = currentPath.includes('40k_combat_patrol_tracker');

  const nav = document.createElement('nav');
  nav.className = 'mobile-bottom-nav';
  nav.id = 'mobileBottomNav';
  nav.setAttribute('aria-label', '手機快速導覽列');
  nav.innerHTML = `
    <a href="index.html" class="bottom-nav-item ${isHome ? 'active' : ''}">
      <span class="bottom-nav-icon">${getIcon('home')}</span>
      <span>首頁</span>
    </a>
    <a href="match_tracker.html" class="bottom-nav-item ${isKT ? 'active' : ''}">
      <span class="bottom-nav-icon">${getIcon('crosshair')}</span>
      <span>KT 記分</span>
    </a>
    <a href="40k_combat_patrol_tracker.html" class="bottom-nav-item ${is40k ? 'active' : ''}">
      <span class="bottom-nav-icon">${getIcon('shield')}</span>
      <span>40K 記分</span>
    </a>
    <button type="button" class="bottom-nav-item" onclick="openGlobalSearch()">
      <span class="bottom-nav-icon">${getIcon('search')}</span>
      <span>速查</span>
    </button>
    <button type="button" class="bottom-nav-item" onclick="handleMobileBottomMenuClick()">
      <span class="bottom-nav-icon">${getIcon('list')}</span>
      <span>目錄</span>
    </button>
  `;

  document.body.appendChild(nav);
}

function handleMobileBottomMenuClick() {
  if (typeof window.toggleSidebar === 'function') {
    window.toggleSidebar(true);
  } else {
    const btn = document.getElementById('mobileMenuBtn');
    if (btn) btn.click();
  }
}

// 全域掛載匯出
window.initGlobalSearch = initGlobalSearch;
window.openGlobalSearch = openGlobalSearch;
window.closeGlobalSearch = closeGlobalSearch;
window.toggleGlobalSearch = toggleGlobalSearch;
window.initThemeToggle = initThemeToggle;
window.toggleThemeMode = toggleThemeMode;
window.initMobileBottomNav = initMobileBottomNav;
window.handleMobileBottomMenuClick = handleMobileBottomMenuClick;
window.escapeHtml = escapeHtml;
window.KT_ICONS = KT_ICONS;
window.getIcon = getIcon;

