// AI Atlas — directory + news data (seed content)
// In production, these are fetched from the Notion CMS databases.
const TOOLS = [
  { name: "ChatGPT", category: "Writing", desc: "Conversational AI for writing, coding, and brainstorming.", price: "Free / $20/mo", url: "https://chat.openai.com" },
  { name: "Claude", category: "Writing", desc: "Powerful AI assistant from Anthropic.", price: "Free / Pro", url: "https://claude.ai" },
  { name: "Midjourney", category: "Image", desc: "AI image generation via Discord.", price: "Paid", url: "https://midjourney.com" },
  { name: "Runway", category: "Video", desc: "AI video and image generation for creators.", price: "Free / Paid", url: "https://runwayml.com" },
  { name: "Perplexity", category: "Productivity", desc: "AI-powered answer engine with sources.", price: "Free / Pro", url: "https://perplexity.ai" },
  { name: "Jasper", category: "Marketing", desc: "AI copywriting for marketing teams.", price: "Paid", url: "https://jasper.ai" },
  { name: "GitHub Copilot", category: "Coding", desc: "AI pair programmer for developers.", price: "Paid", url: "https://github.com/features/copilot" },
  { name: "agent-qa", category: "Coding", desc: "Plain-English web, Android and iOS tests with persistent memidex memory and evidence-validated self-improvement. FSL-1.1-ALv2; model/API and environment costs extra.", price: "Free permitted use", url: "https://vostride.com" },
  { name: "Canva", category: "Design", desc: "Design platform with AI features.", price: "Free / Pro", url: "https://canva.com" },
  { name: "Descript", category: "Audio", desc: "AI-powered audio and video editing.", price: "Free / Paid", url: "https://descript.com" },
  { name: "Notion AI", category: "Productivity", desc: "AI writing and organization inside Notion.", price: "Free / add-on", url: "https://notion.com" },
  { name: "Synthesia", category: "Video", desc: "AI video avatars for training and presentations.", price: "Paid", url: "https://synthesia.io" },
  { name: "ElevenLabs", category: "Audio", desc: "Realistic AI voice generation.", price: "Free / Paid", url: "https://elevenlabs.io" },
];

const NEWS = [
  { title: "OpenAI launches GPT-5 with advanced reasoning", date: "Nov 6, 2026", excerpt: "The newest model brings major improvements in reasoning, coding, and multimodal understanding.", category: "Launch" },
  { title: "Anthropic upgrades Claude to 3.6", date: "Nov 5, 2026", excerpt: "Faster responses and a new computer-use capability for desktop automation.", category: "Update" },
  { title: "Google rolls out AI Overviews globally", date: "Nov 4, 2026", excerpt: "AI-generated summaries now appear in more languages and regions.", category: "Industry" },
  { title: "Midjourney v7 alpha opens to subscribers", date: "Nov 3, 2026", excerpt: "Higher fidelity and better prompt adherence in the latest image model.", category: "Launch" },
  { title: "EU AI Act compliance deadlines approach", date: "Nov 2, 2026", excerpt: "Key provisions of the AI Act take effect for providers and deployers.", category: "Policy" },
  { title: "Runway Gen-4 improves video consistency", date: "Nov 1, 2026", excerpt: "Better character and scene consistency across AI-generated clips.", category: "Update" },
];

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderTools(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = list.map(t => `
    <article class="tool-card">
      <span class="cat">${escapeHtml(t.category)}</span>
      <h3><a href="${escapeHtml(t.url)}" target="_blank" rel="noopener">${escapeHtml(t.name)}</a></h3>
      <p>${escapeHtml(t.desc)}</p>
      <div class="footer"><span class="price">${escapeHtml(t.price)}</span></div>
    </article>
  `).join("");
}

function renderNews(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = list.map(n => `
    <article class="news-card">
      <div class="date">${escapeHtml(n.category)} &middot; ${escapeHtml(n.date)}</div>
      <h3><a href="#">${escapeHtml(n.title)}</a></h3>
      <p>${escapeHtml(n.excerpt)}</p>
      <a class="read-more" href="#">Read more</a>
    </article>
  `).join("");
}

function setupSearch(allTools, searchId, filterId, gridId, countId) {
  const search = document.getElementById(searchId);
  const filter = document.getElementById(filterId);
  const grid = document.getElementById(gridId);
  const countEl = document.getElementById(countId);
  if (!search || !filter || !grid) return;

  function apply() {
    const term = (search.value || "").toLowerCase().trim();
    const cat = (filter.value || "").trim();
    const filtered = allTools.filter(t => {
      const matchTerm = !term || t.name.toLowerCase().includes(term) || t.desc.toLowerCase().includes(term);
      const matchCat = !cat || t.category === cat;
      return matchTerm && matchCat;
    });
    renderTools(filtered, gridId);
    if (countEl) countEl.textContent = filtered.length;
  }
  search.addEventListener("input", apply);
  filter.addEventListener("change", apply);
}

document.addEventListener("DOMContentLoaded", () => {
  // Homepage featured
  renderTools(TOOLS.slice(0, 6), "featured-tools");
  renderNews(NEWS.slice(0, 3), "featured-news");

  // Directory page
  if (document.getElementById("directory-grid")) {
    renderTools(TOOLS, "directory-grid");
    document.getElementById("count-num").textContent = TOOLS.length;
    setupSearch(TOOLS, "dir-search", "cat-filter", "directory-grid", "count-num");
  }

  // News page
  if (document.getElementById("news-grid")) {
    renderNews(NEWS, "news-grid");
  }

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.style.display === "flex";
      nav.style.display = open ? "block" : "flex";
    });
  }
});