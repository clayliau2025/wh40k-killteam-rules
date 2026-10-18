/**
 * 戰錘 40K & 殺戮小隊 繁中規則庫 Service Worker
 * 版本: v3.4.4 (PWA 離線支援與官方戰隊模型圖快取)
 */

const CACHE_NAME = 'wh40k-pwa-v3.4.4';

const PRECACHE_ASSETS = [
  './',
  'index.html',
  'shared.css?v=3.4.4',
  'shared.js?v=3.4.4',
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
  'assets/starter/st_ork_squig.png',
  // 40K 核心規則示意圖與戰巡部署地圖 (39 張離線圖)
  'assets/40k_rules/02047c56-f170-4ac8-b7cf-15c6f917257e.jpg',
  'assets/40k_rules/11503a50-952f-407e-ae1b-64a5229966e3.jpg',
  'assets/40k_rules/12f0e492-d3d6-4c68-972d-5f5349831566.jpg',
  'assets/40k_rules/1661adae-fe1a-481b-a0b3-6ac758ed1569.jpg',
  'assets/40k_rules/1f7c8d0c-2302-4ed9-ac33-a4a859720adf.jpg',
  'assets/40k_rules/2344ed1b-db6f-40ee-b921-7257701619b9.jpg',
  'assets/40k_rules/26b5b98b-8730-4285-9438-d87286e169ea.jpg',
  'assets/40k_rules/30c80ef2-e542-4cdf-af17-e8d9f1a502e5.jpg',
  'assets/40k_rules/33b1a6ea-2a48-4db8-9836-cbe0bad4f881.jpg',
  'assets/40k_rules/346a8c02-f2b2-4e25-9592-280c63cf46f3.jpg',
  'assets/40k_rules/35868611-20bc-440a-8a73-05a9825f50fb.jpg',
  'assets/40k_rules/43f3a895-da05-4c12-a208-a112f14c5e62.jpg',
  'assets/40k_rules/4504759d-57cc-44ab-9ef8-2606bbc6b21c.jpg',
  'assets/40k_rules/4686b681-3845-47ae-a5f6-5f99f5d4135e.jpg',
  'assets/40k_rules/4e74f3e2-27cb-4d0c-8771-b619c89008c8.jpg',
  'assets/40k_rules/5ebe87c8-28d9-4851-8fae-4b21d5d2f885.jpg',
  'assets/40k_rules/607dc1a2-cacc-4055-a0f1-5562837d9a44.jpg',
  'assets/40k_rules/7f2cf6d8-f189-4e33-8de3-ddebf0a1c05d.jpg',
  'assets/40k_rules/82e08cef-90a9-4fb7-920e-4f8d05e151c4.jpg',
  'assets/40k_rules/8354aea5-9750-498b-a227-9d1875e9db85.jpg',
  'assets/40k_rules/840138bc-5d39-425f-bda8-a47e79f500d5.jpg',
  'assets/40k_rules/874a09ef-b42f-4e52-8d43-6657f0c416eb.jpg',
  'assets/40k_rules/88abc5b7-1f6b-4d75-ae38-deb04e02013b.jpg',
  'assets/40k_rules/939c4b0d-fc9b-487b-9ecf-54e0ca7aca54.jpg',
  'assets/40k_rules/9ce90d47-6508-457a-bc01-23f41d731462.jpg',
  'assets/40k_rules/a1246a80-4689-45a1-a373-466534a4276b.jpg',
  'assets/40k_rules/a1b9f761-324c-4358-883b-901d56865ed0.jpg',
  'assets/40k_rules/a7248be1-33aa-44ad-9040-f2f8e8ff344a.jpg',
  'assets/40k_rules/b42c2836-fd11-4d09-87e8-944fa42574fd.jpg',
  'assets/40k_rules/b82a0ab2-96d5-4e93-a94c-09df96fb7b60.jpg',
  'assets/40k_rules/c6b41b17-778c-4440-aeb7-85243dfe3008.jpg',
  'assets/40k_rules/cff29710-7604-4ad5-9103-e443cd7941f0.jpg',
  'assets/40k_rules/d0b3d4da-2ee6-4d13-8326-44cabf8695ac.jpg',
  'assets/40k_rules/d12483cb-0b9a-442f-a7b0-0094638d1f62.jpg',
  'assets/40k_rules/d841711d-8bd4-42b1-b030-5039df30f488.jpg',
  'assets/40k_rules/e0f413ec-e5ca-4e4f-b393-8fe2b0aa91c8.jpg',
  'assets/40k_rules/ecd9edde-dc43-45e5-b6be-154fac892681.jpg',
  'assets/40k_rules/f0bc236d-86ba-4172-b139-c4d73c459394.jpg',
  'assets/40k_rules/f540da20-8276-4897-86b6-575354d87f24.jpg',
  // 本地離線字型庫 (Chakra Petch & Rajdhani)
  'assets/fonts/chakra_petch_latin-ext_italic_700.woff2',
  'assets/fonts/chakra_petch_latin-ext_normal_400.woff2',
  'assets/fonts/chakra_petch_latin-ext_normal_600.woff2',
  'assets/fonts/chakra_petch_latin-ext_normal_700.woff2',
  'assets/fonts/chakra_petch_latin_italic_700.woff2',
  'assets/fonts/chakra_petch_latin_normal_400.woff2',
  'assets/fonts/chakra_petch_latin_normal_600.woff2',
  'assets/fonts/chakra_petch_latin_normal_700.woff2',
  'assets/fonts/chakra_petch_thai_italic_700.woff2',
  'assets/fonts/chakra_petch_thai_normal_400.woff2',
  'assets/fonts/chakra_petch_thai_normal_600.woff2',
  'assets/fonts/chakra_petch_thai_normal_700.woff2',
  'assets/fonts/chakra_petch_vietnamese_italic_700.woff2',
  'assets/fonts/chakra_petch_vietnamese_normal_400.woff2',
  'assets/fonts/chakra_petch_vietnamese_normal_600.woff2',
  'assets/fonts/chakra_petch_vietnamese_normal_700.woff2',
  'assets/fonts/rajdhani_devanagari_normal_500.woff2',
  'assets/fonts/rajdhani_devanagari_normal_600.woff2',
  'assets/fonts/rajdhani_devanagari_normal_700.woff2',
  'assets/fonts/rajdhani_latin-ext_normal_500.woff2',
  'assets/fonts/rajdhani_latin-ext_normal_600.woff2',
  'assets/fonts/rajdhani_latin-ext_normal_700.woff2',
  'assets/fonts/rajdhani_latin_normal_500.woff2',
  'assets/fonts/rajdhani_latin_normal_600.woff2',
  'assets/fonts/rajdhani_latin_normal_700.woff2'
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
