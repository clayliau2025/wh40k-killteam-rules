#!/usr/bin/env python3
"""
版本號單一來源同步腳本 (Single Source of Truth Version Bumper)
用法:
  python3 scripts/bump_version.py [新版本號 | --patch | --minor | --major]

範例:
  python3 scripts/bump_version.py 3.3.2
  python3 scripts/bump_version.py --patch
"""

import sys
import os
import re
import json
import glob
from datetime import datetime

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
VERSION_FILE = os.path.join(ROOT_DIR, 'version.json')
SW_FILE = os.path.join(ROOT_DIR, 'sw.js')

def get_current_version():
    if os.path.exists(VERSION_FILE):
        try:
            with open(VERSION_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get('version', '3.3.1')
        except Exception:
            pass
    return '3.3.1'

def calculate_next_version(current, mode):
    parts = [int(p) for p in current.split('.')]
    while len(parts) < 3:
        parts.append(0)
    
    if mode == '--major':
        parts[0] += 1
        parts[1] = 0
        parts[2] = 0
    elif mode == '--minor':
        parts[1] += 1
        parts[2] = 0
    elif mode == '--patch' or mode == 'patch':
        parts[2] += 1
    else:
        return mode # 自訂版本號
    
    return '.'.join(str(p) for p in parts)

def update_version(new_version):
    old_version = get_current_version()
    print(f"🔄 更新版本號: v{old_version} ➜ v{new_version}")

    # 1. 更新 version.json
    v_data = {
        "version": new_version,
        "updatedAt": datetime.now().astimezone().isoformat()
    }
    with open(VERSION_FILE, 'w', encoding='utf-8') as f:
        json.dump(v_data, f, indent=2, ensure_ascii=False)
        f.write('\n')
    print(f"  ✓ 已更新 {os.path.relpath(VERSION_FILE, ROOT_DIR)}")

    # 2. 更新 sw.js
    if os.path.exists(SW_FILE):
        with open(SW_FILE, 'r', encoding='utf-8') as f:
            sw_content = f.read()

        # 版本註解與 CACHE_NAME
        sw_content = re.sub(r'版本:\s*v[0-9\.]+', f'版本: v{new_version}', sw_content)
        sw_content = re.sub(r"const CACHE_NAME = 'wh40k-pwa-v[0-9\.]+';", f"const CACHE_NAME = 'wh40k-pwa-v{new_version}';", sw_content)
        # PRECACHE_ASSETS 內資源 query string
        sw_content = re.sub(r'(shared\.(?:css|js)\?v=)[0-9\.]+', rf'\g<1>{new_version}', sw_content)

        with open(SW_FILE, 'w', encoding='utf-8') as f:
            f.write(sw_content)
        print(f"  ✓ 已更新 {os.path.relpath(SW_FILE, ROOT_DIR)}")

    # 3. 更新 shared.js 側邊欄範本版本
    shared_js_path = os.path.join(ROOT_DIR, 'shared.js')
    if os.path.exists(shared_js_path):
        with open(shared_js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
        new_js_content = re.sub(r'class="version-badge"[^>]*>v[0-9\.]+[^<]*</span>', f'class="version-badge" id="sidebarVersionBadge" style="font-weight:700; color:#38bdf8; font-size:11px; background:rgba(56,189,248,0.12); padding:1px 6px; border-radius:4px; border: 1px solid rgba(56,189,248,0.25);">v{new_version} PWA</span>', js_content)
        if new_js_content != js_content:
            with open(shared_js_path, 'w', encoding='utf-8') as f:
                f.write(new_js_content)
            print(f"  ✓ 已更新 {os.path.relpath(shared_js_path, ROOT_DIR)}")

    # 4. 更新所有 HTML 檔案
    html_files = glob.glob(os.path.join(ROOT_DIR, '*.html'))
    updated_html_count = 0
    for h_path in html_files:
        with open(h_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = re.sub(r'(shared\.(?:css|js)\?v=)[0-9\.]+', rf'\g<1>{new_version}', content)
        new_content = re.sub(r'class="version-badge"[^>]*>v[0-9\.]+[^<]*</span>', f'class="version-badge" style="font-weight:700; color:#38bdf8; font-size:11px; background:rgba(56,189,248,0.12); padding:1px 6px; border-radius:4px; border: 1px solid rgba(56,189,248,0.25);">v{new_version} PWA</span>', new_content)
        new_content = re.sub(r'v[0-9\.]+\s+全站統一更新', f'v{new_version} 全站統一更新', new_content)
        if new_content != content:
            with open(h_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated_html_count += 1
            print(f"  ✓ 已更新 {os.path.relpath(h_path, ROOT_DIR)}")

    print(f"\n🎉 成功！已同步更新 {updated_html_count} 個 HTML 頁面及 Service Worker 至 v{new_version}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("請指定版本號或模式: python3 scripts/bump_version.py [--patch | --minor | --major | X.Y.Z]")
        sys.exit(1)
    
    arg = sys.argv[1].strip()
    curr = get_current_version()
    next_ver = calculate_next_version(curr, arg)
    update_version(next_ver)
