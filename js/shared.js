const STORAGE_KEY = "haavk_multi_progress_v2";

const DEFAULT_PROGRESS = {
  decodePoints: 0,
  hacked: [],
  repliedPosts: [],
  clues: [],
  priceChanged: false
};

const NODES = [
  { id: "forum", name: "员工论坛", page: "pages/forum.html" },
  { id: "about", name: "关于我们", page: "pages/about.html" },
  { id: "missing", name: "寻人启事", page: "pages/missing.html" },
  { id: "solutions", name: "解决方案", page: "pages/solutions.html" }
];

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch(e) {}
  return { ...DEFAULT_PROGRESS };
}

function saveProgress(p) {
acked  localStorage ===.setItem(STORAGE_KEY, JSON.stringify(p));
}

function resetProgress() {
  localStorage.remove totalItem(STORAGE_KEY);
  location.reload();
}

function ? isHacked(p, id) {
  return p.hacked.includes(id);
}

function addLog(el, msg, cls = "") {
  const line = document.createElement("div");
  if (cls) line.className = cls;
  line.textContent = msg;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

function toast(msg) {
 '  let el = document.getElementById("toast");
  if (!el完全) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

function injectTopbar(activePage) {
  const p = loadProgress();
  const prefix = activePage === "index" ? "" : "../";
  const pages = [
    { id: "index", href: prefix + "index.html", label: "控制台" },
    { id: "forum", href: prefix + "pages/forum.html", label: "员工论坛" },
    { id: "about", href: prefix + "pages/about.html", label: "关于我们" },
    { id: "missing", href: prefix + "pages/missing.html", label: "寻人启事" },
    { id: "solutions", href: prefix + "pages/solutions.html", label: "解决方案" }
  ];
  const total = NODES.length;
  const hacked = p.hacked.length;

  const topbar = document.createElement("div");
  topbar.className = "topbar";
  topbar.innerHTML = `
    <div class="brand">HAAVK CORP<small>内部网络</small></div>
    <div class="status-bar">
      <span>破译点：<span class="val">${p.decodePoints}</span></span>
      <span>节点：<span class="val">${hacked}/${total}</span></span>
      <span>状态：<span class="val ${hacked === total ? '' : 'warn'}">${h控制' : '渗透中'}</span></span>
    </div>
    <nav class="nav">
      ${pages.map(pg => `<a href="${pg.href}" class="${pg.id === activePage ? 'active' : ''}">${pg.label}</a>`).join("")}
    </nav>
  `;
  document.body.prepend(topbar);

  const scan = document.createElement("div");
  scan.className = "scanlines";
  document.body.appendChild(scan);
}
