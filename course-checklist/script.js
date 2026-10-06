// [name, icon text, icon background, tag (NEW / ADV / ""), icon text color]
const items = [
  ["AI Mindset Development", "AI", "linear-gradient(135deg,#4f7cff,#6a3de8)"],
  ["HTML5", "5", "#e44d26"],
  ["CSS3", "3", "#1572b6"],
  ["JavaScript(Basic)", "JS", "#f7df1e", "", "#222"],
  ["ES6 with Problem Solving", "ES6", "#f0a030"],
  ["TypeScript (Basic + OOP)", "TS", "#3178c6"],
  ["React(Basic)", "⚛", "#20232a"],
  ["Tailwind CSS", "≈", "#0f172a"],
  ["DOM vs BOM", "</>", "#2b6cb0"],
  ["Next JS", "N", "#000"],
  ["Hero UI", "H", "#111"],
  ["BetterAuth", "B", "#000"],
  ["NodeJS", "⬢", "#2f7d32"],
  ["ExpressJS", "ex", "#222"],
  ["MongoDB", "🍃", "#0b6b3a"],
  ["Mongoose", "M", "#c0392b"],
  ["Modular Pattern", "▦", "#e8742a",],
  ["API Integration", "API", "#e0245e"],
  ["ShadCN", "◐", "#000"],
  ["Payment Method(Stripe, SSLCommerz)", "S", "#635bff"],
  ["Role Based Access Control", "🔒", "#d33a3a"],
  ["AI Integration", "AI", "#2a7de1"],
  ["AI Assisted Coding", "🤖", "#3b82f6"],
  ["Introduction to Testing", "✔", "#2e9e5b"],
];

const STORAGE_KEY = "course-checklist-v1";
let state = {};
try {
  state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
} catch (e) {
  state = {};
}

const save = () => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
};

const listEl = document.getElementById("list");
const barEl = document.getElementById("bar");
const countEl = document.getElementById("count");

function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function render() {
  listEl.innerHTML = "";
  let done = 0;

  items.forEach(([name, icon, bg, tag, color], i) => {
    const checked = !!state[i];
    if (checked) done++;

    const row = makeEl("div", "row" + (checked ? " done" : ""));
    const box = makeEl("div", "chk", checked ? "✓" : "");
    const ic = makeEl("div", "ic", icon);
    ic.style.background = bg;
    ic.style.color = color || "#fff";
    const nm = makeEl("div", "name", name);

    row.append(box, ic, nm);
    if (tag) row.append(makeEl("span", "tag " + tag, tag));

    row.addEventListener("click", () => {
      state[i] = !state[i];
      save();
      render();
    });

    listEl.append(row);
  });

  barEl.style.width = (done / items.length) * 100 + "%";
  countEl.textContent = done + " / " + items.length + " complete";
}

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("Sob tick muche felbo?")) {
    state = {};
    save();
    render();
  }
});

render();
