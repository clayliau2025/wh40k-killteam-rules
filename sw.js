/**
 * 戰錘 40K & 殺戮小隊 繁中規則庫 Service Worker
 * 版本: v3.3.5 (PWA 離線支援與官方戰隊模型圖快取)
 */

const CACHE_NAME = 'wh40k-pwa-v3.3.5';

const PRECACHE_ASSETS = [
  './',
  'index.html',
  'shared.css?v=3.3.5',
  'shared.js?v=3.3.5',
  'manifest.json',
  '40k_core_rules.html',
  '40k_combat_patrol_rules.html',
  '40k_combat_patrol_tracker.html',
  '40k_cp_astartes.html',
  '40k_cp_orks.html',
  'rule_lite.html',
  'match_tracker.html',
  'angel_of_death_starter_set_rule.html',
  'plague_marine_starter_set_rule.html',
  'death_of_angel_web_rule.html',
  'Kommandos.html',
  'plague_marine.html',
  'universal_equipment.html',
  'assets/pwa_icon_192.png',
  'assets/pwa_icon_512.png',
  'assets/wh40k_logo.png',
  'assets/kt_logo.png',
  'assets/kt_icon.svg',
  // 星際戰士天使之死 (Space Marines: Angels of Death)
  'assets/starter/st_sm_captain.png',
  'assets/starter/st_sm_sergeant.png',
  'assets/starter/st_sm_assault.png',
  'assets/starter/st_sm_eliminator.png',
  'assets/starter/st_sm_heavy_gunner.png',
  'assets/starter/st_sm_warrior_1.png',
  'assets/starter/st_sm_warrior_2.png',
  'assets/starter/st_sm_grenadier.png',
  'assets/starter/st_sm_gunner.png',
  // 瘟疫戰士 (Death Guard: Plague Marines)
  'assets/starter/st_pm_champion.png',
  'assets/starter/st_pm_plaguecaster.png',
  'assets/starter/st_pm_bombardier.png',
  'assets/starter/st_pm_fighter.png',
  'assets/starter/st_pm_heavy_gunner.png',
  'assets/starter/st_pm_icon_bearer.png',
  'assets/starter/st_pm_warrior.png',
  // 獸人特戰小子 (Ork Kommandos)
  'assets/starter/st_ork_boss.png',
  'assets/starter/st_ork_boy.png',
  'assets/starter/st_ork_boy2.png',
  'assets/starter/st_ork_breacha.png',
  'assets/starter/st_ork_burna.png',
  'assets/starter/st_ork_comms.png',
  'assets/starter/st_ork_dakka.png',
  'assets/starter/st_ork_grot.png',
  'assets/starter/st_ork_rokkit.png',
  'assets/starter/st_ork_slasha.png',
  'assets/starter/st_ork_snipa.png',
  'assets/starter/st_ork_squig.png'
];

// 安裝事件：預先快取核心資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 容錯快取：單一檔案失敗不阻斷其餘安裝
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[Service Worker] 預快取跳過或失敗: ${url}`, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// 啟動事件：清除舊版快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('wh40k-') && name !== CACHE_NAME)
          .map((name) => {
            console.log(`[Service Worker] 清除舊快取: ${name}`);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// 攔截請求：針對 HTML 採 Network-First（確保最新內容，離線時回退快取）；靜態資源採 Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // 僅處理 GET 請求與 HTTP/HTTPS 協議
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  const isHtml = request.headers.get('accept')?.includes('text/html') ||
                 request.url.endsWith('.html') ||
                 request.mode === 'navigate';

  if (isHtml) {
    // HTML 導航：網路優先，失敗時使用快取
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('index.html');
          if (fallback) return fallback;
          return new Response('離線模式：無法連線至伺服器且無本機快取', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        })
    );
  } else {
    // 靜態資源 (CSS, JS, 圖片, 字體)：快取優先 / SWR (附離線容錯保護)
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          })
          .catch(() => null);

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetchPromise.then((networkResponse) => {
          if (networkResponse) return networkResponse;
          return new Response('離線模式：無法取得未快取之靜態資源', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        });
      })
    );
  }
});
