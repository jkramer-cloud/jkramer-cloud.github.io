/* PlayForge Living World 0.14 — isolated, opt-in controller. */
(() => {
  'use strict';
  const script = document.currentScript;
  const base = new URL('./', script.src || document.baseURI || location.href);
  const prefix = 'playforge.livingWorld.v1.';
  const keys = { daily: prefix+'daily', unlocked: prefix+'unlocked', mode: prefix+'mode' };
  const WINDOW = 15000;
  const MODES = new Set(['original','enhanced','ultra']);
  const day = t => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  let storageOK = true;
  const get = k => { try { return localStorage.getItem(k); } catch { storageOK = false; return null; } };
  const put = (k,v) => { try { localStorage.setItem(k,v); return true; } catch { storageOK = false; return false; } };
  const known = () => get(keys.unlocked) === 'yes' && storageOK;
  const savedMode = () => { const v = get(keys.mode); return known() && MODES.has(v) ? v : 'original'; };
  const openedAt = Date.now();
  const openedDay = day(openedAt);
  let deadline = 0;
  if (!known() && storageOK) {
    let prior;
    try { prior = JSON.parse(get(keys.daily)); } catch { /* malformed data is replaced */ }
    if (storageOK) {
      if (prior && prior.day === openedDay) {
        if (Number.isFinite(prior.start) && prior.start <= openedAt) deadline = prior.start + WINDOW;
      } else if (put(keys.daily, JSON.stringify({day:openedDay,start:openedAt}))) deadline = openedAt+WINDOW;
    }
  }
  const available = () => storageOK && !known() && Date.now() < deadline && day(Date.now()) === openedDay;
  let row, expiryTimer, loader, currentMode = 'original', revision = 0;
  const panelStyle = `#pf-lw-control{grid-column:1/-1;border:1px solid #c2b07a60;border-radius:12px;padding:12px;background:#132d43;color:#e7eef7;font:inherit;min-width:0;display:grid;gap:9px}#pf-lw-control[hidden]{display:none!important}#pf-lw-control .pf-lw-line{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}#pf-lw-control strong{font-size:.86rem;color:#f0d89a}#pf-lw-control small{font-size:.75rem;color:#b9cce0}#pf-lw-control button{border:1px solid #d5bd7880;background:#243c51;color:#f4dfac;border-radius:9px;padding:8px 12px;cursor:pointer;font-weight:700;font-size:.8rem}#pf-lw-control input{width:100%;height:auto;min-height:40px;border:1px solid #8caac2;background:#10283f;border-radius:8px;padding:8px;color:#fff;font:inherit}#pf-lw-control form{display:grid;gap:8px;margin:0}#pf-lw-control label{display:grid;gap:5px}#pf-lw-control select{width:100%;min-height:42px;background:#173954;color:#fff;border:1px solid #8cbbd46c;border-radius:9px;padding:6px 8px}#pf-lw-control .pf-lw-status{min-height:1em;font-size:.76rem;color:#f1d795}`;
  function addStyle() { const el = document.createElement('style'); el.id='pf-lw-control-style'; el.textContent=panelStyle; document.head.append(el); }
  function hide() { if (row) { row.remove(); row=null; } }
  function clearVisual() { document.body.removeAttribute('data-pf-lw'); document.dispatchEvent(new CustomEvent('pf-lw-mode',{detail:{mode:'original'}})); }
  async function applyMode(mode) {
    const id = ++revision;
    currentMode = mode;
    if (mode === 'original') { clearVisual(); return; }
    try {
      loader ||= import(new URL('world-engine.js',base).href).catch(e=>{loader=null;throw e});
      const engine = await loader;
      if (id !== revision || currentMode !== mode) return;
      if (engine.prepare) await engine.prepare();
      if (id !== revision || currentMode !== mode) return;
      engine.activate(mode);
      document.dispatchEvent(new CustomEvent('pf-lw-mode',{detail:{mode}}));
    } catch {
      if (id !== revision) return;
      currentMode = 'original'; put(keys.mode,'original'); clearVisual();
      if (row && known()) { renderUnlocked(); row.querySelector('.pf-lw-status').textContent='Enhanced graphics could not load. Original mode restored.'; }
    }
  }
  function ensureRow() {
    if (row) return row;
    const inner=document.querySelector('#valley-settings .valley-settings-inner');
    if (!inner) return null;
    row=document.createElement('section'); row.id='pf-lw-control'; row.setAttribute('aria-label','Living World graphics');
    inner.prepend(row); return row;
  }
  function renderUnlocked() {
    const el=ensureRow(); if(!el) return;
    el.innerHTML=`<div class="pf-lw-line"><strong>Living World graphics</strong><small>Experimental · v1.0 RC</small></div><label>Graphics level<select id="pf-lw-mode"><option value="original">Original — normal Learning Hub</option><option value="enhanced">Enhanced — Living World</option><option value="ultra">Ultra — Living World</option></select></label><small>Optional graphics layer. Existing scene settings still apply. Seven seasonal landscapes follow the existing season selection. Rare alternate worlds appear automatically on designated dates. Enhanced adds quiet landscape motion; Ultra adds more activity and subtle orchard sway. Weather adds layered rain, snow, fog, storm clouds, icy precipitation and wind. The underground foundry appears as you reach In development. Graphics automatically scale down under sustained rendering pressure. Existing Animate scenery and intensity preferences still apply.</small><div class="pf-lw-status" role="status"></div>`;
    const select=el.querySelector('select'); select.value=savedMode();
    select.addEventListener('change',()=>{
      const mode=select.value;
      if (!known() || !MODES.has(mode) || !put(keys.mode,mode)){ select.value='original'; applyMode('original'); el.querySelector('.pf-lw-status').textContent='Browser storage is unavailable.'; return; }
      applyMode(mode); el.querySelector('.pf-lw-status').textContent=mode==='original'?'Original experience restored.':'Experimental graphics enabled.';
    });
  }
  function renderDoor() {
    const el=ensureRow(); if (!el) return;
    el.innerHTML='<div class="pf-lw-line"><strong>Living World</strong><button type="button">Unlock</button></div><small>Experimental scene graphics</small>';
    el.querySelector('button').addEventListener('click',()=>{
      if (!available()) { hide(); return; }
      el.innerHTML='<form autocomplete="off"><label>What is the last name of the teacher who created the Learning Hub?<input type="text" maxlength="60" required autocomplete="off" spellcheck="false" aria-label="Teacher last name"></label><div class="pf-lw-line"><button type="submit">Unlock</button><button type="button" data-cancel>Cancel</button></div><div class="pf-lw-status" role="status"></div></form>';
      const input=el.querySelector('input'); input.focus();
      el.querySelector('[data-cancel]').addEventListener('click',()=>available()?renderDoor():hide());
      el.querySelector('form').addEventListener('submit',e=>{
        e.preventDefault();
        if (!available()) { hide(); return; }
        if (input.value.trim().toLowerCase()!=='kramer') { el.querySelector('.pf-lw-status').textContent='That answer is not correct.'; input.select(); return; }
        if (!put(keys.mode,'original') || !put(keys.unlocked,'yes')) { hide(); return; }
        clearTimeout(expiryTimer); renderUnlocked(); applyMode('original');
      });
    });
  }
  function sync() {
    if (known()) { if (!row?.querySelector('select')) renderUnlocked(); const mode=savedMode(); if(row?.querySelector('select')) row.querySelector('select').value=mode; if (currentMode!==mode) applyMode(mode); return; }
    if (currentMode!=='original') applyMode('original');
    if (!available()) hide(); else if (!row) renderDoor();
  }
  function init() {
    if (!document.querySelector('#valley-settings .valley-settings-inner')) return;
    addStyle(); sync();
    if (available()) expiryTimer=setTimeout(sync,Math.max(0,deadline-Date.now()));
    window.addEventListener('pageshow',sync);
    document.addEventListener('visibilitychange',sync);
    window.addEventListener('storage',e=>{if(e.key===null||Object.values(keys).includes(e.key))sync()});
    document.querySelector('#valley-settings').addEventListener('toggle',sync);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
