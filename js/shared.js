const STORAGE_KEY = "haavk_official_progress_v3";

const DEFAULT_PROGRESS = {
  visited: [],
  subscribed: false,
  inquiryCount: 0,
  applications: 0
};

const PAGES = [
  { id: "index", file: "index.html", label: "首页" },
  { id: "about", file: "pages/about.html", label: "关于我们" },
  { id: "business", file: "pages/business.html", label: "业务领域" },
  { id: "news", file: "pages/news.html", label: "新闻动态" },
  { id: "careers", file: "pages/careers.html", label: "加入我们" },
  { id: "contact", file: "pages/contact.html", label: "联系我们" }
];

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (e) {}
  return { ...DEFAULT_PROGRESS };
}

function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function addVisited(pageId) {
  const p = loadProgress();
  if (!p.visited.includes(pageId)) {
    p.visited.push(pageId);
    saveProgress(p);
  }
}

function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2400);
}

function injectTopbar(activePage) {
  const prefix = activePage === "index" ? "" : "../";
  const topbar = document.createElement("div");
  topbar.className = "topbar";
  topbar.innerHTML = `
    <div class="brand">
      <span class="logo">HAAVK</span>
      <span class="slogan">哈夫克集团</span>
    </div>
    <nav class="nav">
      ${PAGES.map(pg => {
        const href = pg.id === "index" ? prefix + "index.html" : prefix + pg.file;
        return `<a href="${href}" class="${pg.id === activePage ? 'active' : ''}">${pg.label}</a>`;
      }).join("")}
    </nav>
  `;
  document.body.prepend(topbar);

  const scan = document.createElement("div");
  scan.className = "scanlines";
  document.body.appendChild(scan);

  const footer = document.createElement("div");
  footer.className = "footer";
  footer.innerHTML = `
    HAAVK CORP 哈夫克集团 · 为阿萨拉地区提供先进安全解决方案<br>
    本页面为玩家自制学习项目，与游戏官方无关
  `;
  document.body.appendChild(footer);
}

function renderVisitedBadge(el) {
  if (!el) return;
  const p = loadProgress();
  const total = PAGES.length;
  el.textContent = `已访问 ${p.visited.length} / ${total} 个页面`;
}
