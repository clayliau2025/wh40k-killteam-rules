/**
 * 戰錘 40K & 殺戮小隊 繁體中文全戰棋情報庫
 * 全站統一導航、側邊欄折疊、手機抽屜與 PWA 支援
 */

function toggleNavGroup(btn) {
  const group = btn.closest('.nav-group');
  if (group) {
    group.classList.toggle('open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const collapseBtn = document.getElementById('sidebarCollapseBtn');
  const menuBtns = document.querySelectorAll('.mobile-menu-btn, .sidebar-toggle-btn, #mobileMenuBtn');

  // 1. 根據目前活躍頁面，自動展開該 nav-group
  const activeLink = document.querySelector('.app-sidebar .sub-nav-link.active');
  if (activeLink) {
    const parentGroup = activeLink.closest('.nav-group');
    if (parentGroup) {
      parentGroup.classList.add('open');
    }
  }

  // 2. 側邊欄內部按鈕：手機端為關閉抽屜，桌面端為折疊 (◀)
  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('mobile-open');
        if (backdrop) backdrop.classList.remove('active');
      } else {
        sidebar.classList.toggle('collapsed');
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
});
