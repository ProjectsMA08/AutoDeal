/* ===== Общее меню «Автоучёт» (одинаковое на всех страницах) =====
   Подключение: <script src="nav.js"></script> перед </body>.
   Страницы меняются в PAGES: href:null = раздел пока не подключён. */
(() => {
    const PAGES = [
        { id: 'stock', l: 'Склад', i: 'warehouse', href: 'mainpage.html' },
        { id: 'scan', l: 'VIN скан', i: 'vin', href: 'scan.html' },
        { id: 'revision', l: 'Ревизия', i: 'revision', href: 'revisy.html' },
        { id: 'journal', l: 'Журнал', i: 'journal', href: 'jurnal.html' },
        { id: 'profile', l: 'Профиль', i: 'user', href: 'index.html#/profile' },
    ];
    const IC = {
        car: '<path d="M5 17h14M3 13l2-6h14l2 6v4H3zM7 17v2M17 17v2"/>',
        warehouse: '<path d="M3 10l9-6 9 6v10H3zM8 20v-6h8v6"/>',
        vin: '<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M7 8v8M10 8v8M13 8v8M17 8v8"/>',
        revision: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11l2 2 4-4M9 17h6"/>',
        journal: '<path d="M5 4h12a2 2 0 012 2v14H7a2 2 0 01-2-2zM9 9h6M9 13h6"/>',
        user: '<rect x="4" y="4" width="16" height="17" rx="2"/><circle cx="12" cy="11" r="2.5"/><path d="M8 18c0-2 2-3 4-3s4 1 4 3"/>',
        out: '<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>'
    };
    const svg = n => `<svg viewBox="0 0 24 24">${IC[n]}</svg>`;

    const css = `
.sidebar,.bottom,.side{display:none!important}
.shell{display:block!important}
.ar-side,.ar-bottom{font-family:'Oswald',sans-serif}
.ar-side svg,.ar-bottom svg{width:1em;height:1em;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ar-side button,.ar-bottom button{border:0;background:none;cursor:pointer;font:inherit}
.ar-bottom{position:fixed;left:0;right:0;bottom:0;z-index:40;height:calc(64px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);background:#0f1b33;display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid #2b3b63}
.ar-bottom button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#8c9abb;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase}
.ar-bottom button svg{font-size:22px}
.ar-bottom button.on{color:#fff;background:#16264a;box-shadow:inset 0 -3px 0 #2f63d1}
.ar-bottom button.on svg{outline:1px solid #c9392f;outline-offset:6px;border-radius:1px}
.ar-side{display:none}
.ar-toast{position:fixed;left:50%;bottom:calc(80px + env(safe-area-inset-bottom));transform:translateX(-50%);background:#0f1b33;color:#fff;padding:10px 16px;font:13px 'Inter',sans-serif;z-index:90;border:1px solid #2b3b63;max-width:90vw;text-align:center}
body.ar-off .ar-side,body.ar-off .ar-bottom{display:none!important}
@media(min-width:1024px){
 body.ar:not(.ar-off){padding-left:248px!important}
 .ar-bottom{display:none}
 body:not(.ar-off) .ar-side{display:flex;flex-direction:column;position:fixed;inset:0 auto 0 0;width:248px;background:#0f1b33;color:#fff;z-index:40;padding:20px 14px}
 .ar-logo{display:flex;align-items:center;gap:12px;padding:6px 8px 22px;border-bottom:1px solid #26365c}
 .ar-logo i{width:44px;height:44px;border-radius:8px;background:#2f63d1;display:grid;place-items:center;font-size:24px;font-style:normal}
 .ar-logo b{font-size:20px;letter-spacing:.08em;display:block;font-weight:600}
 .ar-logo span{font:10px 'JetBrains Mono',monospace;color:#8c9abb;letter-spacing:.06em}
 .ar-nav{display:flex;flex-direction:column;gap:4px;margin-top:18px}
 .ar-nav button{display:flex;align-items:center;gap:12px;padding:12px;border-radius:4px;font-weight:500;font-size:16px;letter-spacing:.08em;text-transform:uppercase;color:#a9b6d3;text-align:left}
 .ar-nav button svg{font-size:20px}
 .ar-nav button:hover{background:#1b2c52;color:#fff}
 .ar-nav button.on{background:#2f63d1;color:#fff}
 .ar-foot{margin-top:auto;display:grid;gap:10px}
 .ar-foot .ar-out{display:none;align-items:center;gap:12px;padding:12px;color:#a9b6d3;font-size:16px;letter-spacing:.08em;text-transform:uppercase}
 .ar-foot .ar-out:hover{color:#fff}
}`;
    const font = document.createElement('link'); font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap&subset=cyrillic';
    document.head.append(font);
    const st = document.createElement('style'); st.textContent = css; document.head.append(st);

    const file = () => (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    function active() {
        const f = file(), h = location.hash;
        if (f.startsWith('mainpage')) return 'stock';
        if (f.startsWith('scan') || f.startsWith('vin-scan')) return 'scan';
        if (f.startsWith('revisy') || f.startsWith('revision')) return 'revision';
        if (f.startsWith('jurnal') || f.startsWith('journal')) return 'journal';
        if (f.startsWith('index')) return h.startsWith('#/profile') ? 'profile' : 'stock';
        return document.currentScript?.dataset.active || '';
    }
    function toast(t) { const e = document.createElement('div'); e.className = 'ar-toast'; e.textContent = t; document.body.append(e); setTimeout(() => e.remove(), 2000); }
    function go(p) { if (!p.href) return toast('Раздел «' + p.l + '» ещё не подключён'); location.href = p.href; }

    document.body.classList.add('ar');
    const side = document.createElement('aside'); side.className = 'ar-side';
    side.innerHTML = `<div class="ar-logo"><i>${svg('car')}</i><div><b>АВТОУЧЁТ</b><span>РОЛЬФ СЕВЕР</span></div></div><nav class="ar-nav"></nav>
<div class="ar-foot"><button class="ar-out">${svg('out')}Выйти</button></div>`;
    const bottom = document.createElement('nav'); bottom.className = 'ar-bottom';
    document.body.append(side, bottom);

    function render() {
        const a = active();
        const mk = () => PAGES.map(p => `<button data-p="${p.id}" class="${p.id === a ? 'on' : ''}">${svg(p.i)}<span>${p.l}</span></button>`).join('');
        side.querySelector('.ar-nav').innerHTML = mk(); bottom.innerHTML = mk();
        /* на странице входа (index.html без сессии) меню скрыто */
        const f = file(), login = location.hash.startsWith('#/login') || (f.startsWith('index') && !location.hash);
        document.body.classList.toggle('ar-off', login);
        const out = document.getElementById('out'), b = side.querySelector('.ar-out');
        b.style.display = out ? '' : 'none'; /* кнопка «Выйти» из index.html */
    }
    document.addEventListener('click', e => {
        const b = e.target.closest('.ar-nav button,.ar-bottom button');
        if (b) return go(PAGES.find(p => p.id === b.dataset.p));
        if (e.target.closest('.ar-out')) document.getElementById('out')?.click();
    });
    addEventListener('hashchange', render);
    new MutationObserver(render).observe(document.body, { childList: true });
    render();
})();