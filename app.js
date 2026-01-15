/**
 * app.js — Fast & Health
 * Plain HTML/CSS/JS single-page app (GitHub Pages friendly)
 *
 * Covered:
 * ✅ Home: expandable educational articles (accordion)
 * ✅ Recipes: 30 cards, filters (diet/meat/search), inline expand “View Recipe”
 * ✅ Add to Weekly Plan: modal dialog (day + portions), overwrite rule
 * ✅ Weekly Planner: 7-day table (with small recipe image) + clear day/week
 * ✅ Shopping List: grouped by store sections, scaled by portions, check-off UI (not saved)
 * ✅ LocalStorage wiring:
 *    - Save/load weekly plan only
 *    - Strict validation, overwrite rules
 *    - Cross-tab sync
 * ✅ Step 6: PDF generation:
 *    - PDF #1: Weekly plan + selected recipes (with images), table links to recipe pages
 *    - PDF #2: Shopping list grouped by store sections with totals
 * ✅ Step 7: Share buttons (WhatsApp + Email)
 * ✅ Step 8: Contact form handling (no backend):
 *    - Works with Formspree-style email form service OR falls back gracefully
 *    - Client-side validation + char limit + loading state
 *    - Success + error UI (inline)
 *    - Anti-bot honeypot support if the HTML includes it
 *
 * Depends on: data.js (DAYS, HOME_ARTICLES, RECIPES)
 * Requires (already included in index.html):
 * - jsPDF UMD: window.jspdf.jsPDF
 * - jsPDF AutoTable plugin: doc.autoTable
 */

/* ===========================
   Storage + App State
   =========================== */

const STORAGE_KEY = "fastHealth_weeklyPlan_v1";

// Shopping check state is NOT persisted (kept only in-memory for current session)
const shoppingChecks = Object.create(null);

/**
 * Weekly plan shape (stored in LocalStorage):
 * {
 *   Monday:   { recipeId: "r1", portions: 2 } | null,
 *   Tuesday:  null,
 *   ...
 * }
 */
let weeklyPlan = loadPlan();

/* Fixed store sections (requested) */
const STORE_SECTIONS = [
  "Vegetables",
  "Fruits",
  "Meat/Fish",
  "Dairy",
  "Grains",
  "Pantry",
  "Spices/Condiments",
  "Bakery",
  "Frozen",
  "Other"
];

/* ===========================
   App Bootstrap
   =========================== */

(function init() {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  bindDevModal();
  bindContactCounter();

  renderHomeArticles();
  renderRecipes();

  renderPlannerTable();
  renderShoppingList();

  bindAddToPlanModal();
  bindCrossTabPlanSync();

  // Step 6
  bindPdfButtons();

  // Step 7
  bindShareButtons();

  // Step 8
  bindContactForm();
})();

/* ===========================
   Modal: Under development
   =========================== */

function bindDevModal() {
  const devModal = document.getElementById("devModal");
  const devModalText = document.getElementById("devModalText");
  const closeModalBtn = document.getElementById("closeModalBtn");

  function openDevModal(platformName) {
    if (devModalText) devModalText.textContent = `${platformName}: This page is under development.`;
    if (devModal && typeof devModal.showModal === "function") devModal.showModal();
    else alert(`${platformName}: This page is under development.`);
  }

  if (closeModalBtn && devModal) {
    closeModalBtn.addEventListener("click", () => devModal.close());
  }

  document.querySelectorAll("[data-social]").forEach((btn) => {
    btn.addEventListener("click", () => openDevModal(btn.dataset.social || "Social"));
  });
}

/* ===========================
   Contact message counter
   =========================== */

function bindContactCounter() {
  const messageEl = document.getElementById("message");
  const countEl = document.getElementById("messageCount");
  if (!messageEl || !countEl) return;

  const updateCount = () => {
    countEl.textContent = `${messageEl.value.length} / 1500`;
  };
  messageEl.addEventListener("input", updateCount);
  updateCount();
}

/* ===========================
   Step 8: Contact form (Formspree / email form service)
   =========================== */

/**
 * Expected HTML:
 * <form id="contactForm" action="https://formspree.io/f/XXXXXX" method="POST">
 *  <input id="name" name="name" required>
 *  <input id="email" name="email" required>
 *  <input id="phone" name="phone">
 *  <textarea id="message" name="message" maxlength="1500" required></textarea>
 *  <button id="contactSubmitBtn" type="submit">Send message</button>
 *  <!-- optional honeypot -->
 *  <input type="text" name="_gotcha" style="display:none">
 * </form>
 *
 * This JS:
 * - Uses fetch() for nicer UX (does not navigate away)
 * - If action is missing, shows a helpful error message
 * - If service blocks CORS, falls back to native submit
 */
function bindContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("contactSubmitBtn") || form.querySelector('button[type="submit"]');

  // Create (or reuse) a status element under the form
  let statusEl = document.getElementById("contactStatus");
  if (!statusEl) {
    statusEl = document.createElement("div");
    statusEl.id = "contactStatus";
    statusEl.setAttribute("aria-live", "polite");
    statusEl.style.marginTop = "10px";
    statusEl.style.fontSize = "14px";
    form.appendChild(statusEl);
  }

  const nameEl = document.getElementById("name") || form.querySelector('[name="name"]');
  const emailEl = document.getElementById("email") || form.querySelector('[name="email"]');
  const phoneEl = document.getElementById("phone") || form.querySelector('[name="phone"]');
  const messageEl = document.getElementById("message") || form.querySelector('[name="message"]');
  const gotchaEl = form.querySelector('[name="_gotcha"]'); // optional honeypot

  function setStatus(type, text) {
    // type: "success" | "error" | "info"
    statusEl.textContent = text;
    statusEl.style.padding = "10px 12px";
    statusEl.style.borderRadius = "12px";
    statusEl.style.border = "1px solid var(--border)";
    statusEl.style.background = "var(--card)";
    statusEl.style.color = "var(--text)";

    if (type === "success") {
      statusEl.style.borderColor = "rgba(46, 160, 67, .35)";
    }
    if (type === "error") {
      statusEl.style.borderColor = "rgba(220, 38, 38, .35)";
    }
  }

  function clearStatus() {
    statusEl.textContent = "";
    statusEl.style.padding = "0";
    statusEl.style.border = "none";
    statusEl.style.background = "transparent";
  }

  // Client-side validation
  function validate() {
    const name = String(nameEl?.value || "").trim();
    const email = String(emailEl?.value || "").trim();
    const phone = String(phoneEl?.value || "").trim();
    const msg = String(messageEl?.value || "").trim();

    if (!name) return { ok: false, message: "Please enter your name." };
    if (!email) return { ok: false, message: "Please enter your email." };
    if (!isValidEmail(email)) return { ok: false, message: "Please enter a valid email address." };
    if (!msg) return { ok: false, message: "Please write a message." };
    if (msg.length > 1500) return { ok: false, message: "Message is too long (max 1500 characters)." };

    // basic phone sanity (optional)
    if (phone && phone.length < 6) return { ok: false, message: "Phone number looks too short. You can also leave it empty." };

    // honeypot (if filled, silently pretend success)
    if (gotchaEl && String(gotchaEl.value || "").trim()) {
      return { ok: true, bot: true };
    }

    return { ok: true };
  }

  // Improve UX: clear status when user edits fields
  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", () => clearStatus());
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const v = validate();
    if (!v.ok) {
      setStatus("error", v.message);
      return;
    }

    // Honeypot triggered → act like success and reset quietly
    if (v.bot) {
      form.reset();
      bindContactCounter(); // refresh counter if present
      setStatus("success", "Thanks! Your message has been sent.");
      return;
    }

    const action = form.getAttribute("action");
    const method = (form.getAttribute("method") || "POST").toUpperCase();

    if (!action) {
      setStatus(
        "error",
        "Contact form is not configured yet. Please add your email form service URL to the form action attribute."
      );
      return;
    }

    const payload = new FormData(form);

    // Loading UI
    const oldText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }
    setStatus("info", "Sending your message…");

    try {
      // Most services (Formspree) accept JSON or FormData.
      // We’ll send FormData and ask for JSON response.
      const res = await fetch(action, {
        method,
        body: payload,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        form.reset();
        bindContactCounter(); // refresh counter
        setStatus("success", "Thanks! Your message has been sent. We’ll get back to you soon.");
        return;
      }

      // Try to parse error
      let errText = "Sorry — something went wrong while sending your message.";
      try {
        const data = await res.json();
        if (data?.errors?.length) {
          errText = data.errors.map((x) => x.message).join(" ");
        }
      } catch {
        // ignore
      }
      setStatus("error", errText);
    } catch (err) {
      // CORS issues can happen depending on provider settings.
      // Fallback to normal form submit (opens provider page).
      console.warn("Fetch failed; falling back to native submit.", err);

      setStatus("info", "Opening secure form submission…");
      setTimeout(() => {
        // Restore default submit behavior
        form.removeEventListener("submit", () => {});
        form.submit();
      }, 250);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = oldText || "Send message";
      }
    }
  });
}

function isValidEmail(email) {
  // Simple email validation that works well enough for UX
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

/* ===========================
   Home Articles (accordion)
   =========================== */

function renderHomeArticles() {
  const wrap = document.getElementById("articlesGrid");
  if (!wrap || !Array.isArray(HOME_ARTICLES)) return;

  wrap.innerHTML = HOME_ARTICLES
    .map((a) => {
      const regionId = `article-body-${a.id}`;
      const btnId = `article-btn-${a.id}`;

      return `
      <article class="article card" data-article-id="${escapeHtml(a.id)}">
        <button class="article__head" id="${btnId}" type="button"
          aria-expanded="false" aria-controls="${regionId}">
          <div class="article__media">
            <img class="article__img" src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy">
          </div>

          <div class="article__meta">
            <h3 class="article__title">${escapeHtml(a.title)}</h3>
            <p class="article__hint muted">Tap to read • Practical, friendly, fast</p>
          </div>

          <span class="article__chev" aria-hidden="true">▾</span>
        </button>

        <div class="article__body" id="${regionId}" hidden>
          ${formatBodyToHtml(a.body)}

          <div class="article__cta">
            <a class="btn btn--small btn--primary" href="#recipes">Explore Recipes</a>
            <a class="btn btn--small btn--ghost" href="#planner">Plan the week</a>
          </div>
        </div>
      </article>
    `;
    })
    .join("");

  wrap.querySelectorAll(".article__head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".article");
      if (!card) return;

      const body = card.querySelector(".article__body");
      if (!body) return;

      const isOpen = btn.getAttribute("aria-expanded") === "true";

      wrap.querySelectorAll(".article").forEach((c) => {
        const b = c.querySelector(".article__body");
        const h = c.querySelector(".article__head");
        if (b) b.hidden = true;
        if (h) h.setAttribute("aria-expanded", "false");
        c.classList.remove("article--open");
      });

      if (!isOpen) {
        body.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        card.classList.add("article--open");
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/** Convert plain text with paragraphs into safe HTML (no raw HTML allowed). */
function formatBodyToHtml(text) {
  const raw = String(text || "");
  const paragraphs = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return paragraphs
    .map((p) => {
      const lines = p.split("\n").map((l) => l.trim()).filter(Boolean);
      const bulletLines = lines.filter((l) => l.startsWith("• "));

      if (bulletLines.length >= 2 && bulletLines.length === lines.length) {
        const items = bulletLines
          .map((l) => `<li>${escapeHtml(l.replace(/^•\s+/, ""))}</li>`)
          .join("");
        return `<ul class="article__list">${items}</ul>`;
      }

      return `<p>${escapeHtml(p).replaceAll("\n", "<br>")}</p>`;
    })
    .join("");
}

/* ===========================
   Recipes: render + filters + expand
   =========================== */

function renderRecipes() {
  const wrap = document.getElementById("recipesGrid");
  if (!wrap || !Array.isArray(RECIPES)) return;

  const dietEl = document.getElementById("dietFilter");
  const meatEl = document.getElementById("meatFilter");
  const searchEl = document.getElementById("searchInput");

  const apply = () => {
    const diet = (dietEl?.value || "all").toLowerCase();
    const meat = (meatEl?.value || "all").toLowerCase();
    const q = (searchEl?.value || "").trim().toLowerCase();

    const filtered = RECIPES.filter((r) => {
      const dietOk = diet === "all" ? true : r.diet === diet;
      const meatOk = meat === "all" ? true : (r.meatType || "") === meat;

      const qOk =
        !q ||
        String(r.title || "").toLowerCase().includes(q) ||
        (Array.isArray(r.ingredients) && r.ingredients.some((i) => String(i).toLowerCase().includes(q)));

      return dietOk && meatOk && qOk;
    });

    wrap.innerHTML = filtered.map(renderRecipeCard).join("");

    wrap.querySelectorAll("[data-action='toggle']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) toggleRecipeExpand(id);
      });
    });

    wrap.querySelectorAll("[data-action='add']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) openAddToPlanModal(id);
      });
    });
  };

  dietEl?.addEventListener("change", apply);
  meatEl?.addEventListener("change", apply);
  searchEl?.addEventListener("input", apply);

  apply();
}

function renderRecipeCard(r) {
  const dietLabel = r.diet === "vegetarian" ? "Vegetarian" : "Non-Vegetarian";
  const meatIcon = meatTypeIcon(r.meatType);

  return `
    <article class="recipe card" id="recipe-${escapeHtml(r.id)}">
      <div class="recipe__media">
        <img class="recipe__img" src="${escapeHtml(r.image)}" alt="${escapeHtml(r.title)}" loading="lazy">
        <span class="badge badge--left">${dietLabel}</span>
        ${r.meatType ? `<span class="badge badge--right">${meatIcon} ${escapeHtml(cap(r.meatType))}</span>` : ""}
      </div>

      <div class="recipe__body">
        <h3 class="recipe__title">${escapeHtml(r.title)}</h3>

        <div class="recipe__meta">
          <span class="chip">🔥 ${Number(r.caloriesPerPortion) || 0} kcal / portion</span>
          <span class="chip">⏱ ${Number(r.minutes) || 0} min</span>
        </div>

        <div class="recipe__actions">
          <button class="btn btn--ghost recipe__toggle" data-action="toggle" data-id="${escapeHtml(r.id)}" type="button">
            View Recipe
          </button>
          <button class="btn btn--primary" data-action="add" data-id="${escapeHtml(r.id)}" type="button">
            Add to Weekly Plan
          </button>
        </div>
      </div>

      <div class="recipe__expand" id="expand-${escapeHtml(r.id)}" hidden>
        <h4>Ingredients</h4>
        <ul>${(r.ingredients || []).map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
        <h4>Steps</h4>
        <ol>${(r.steps || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
      </div>
    </article>
  `;
}

function toggleRecipeExpand(recipeId) {
  const panel = document.getElementById(`expand-${recipeId}`);
  if (!panel) return;

  const shouldOpen = panel.hidden;
  document.querySelectorAll(".recipe__expand").forEach((p) => (p.hidden = true));
  panel.hidden = !shouldOpen;

  if (shouldOpen) {
    document.getElementById(`recipe-${recipeId}`)?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }
}

function meatTypeIcon(meatType) {
  switch (meatType) {
    case "chicken":
      return "🍗";
    case "beef":
      return "🥩";
    case "fish":
      return "🐟";
    case "pork":
      return "🐖";
    case "lamb":
      return "🐑";
    default:
      return "🍽️";
  }
}

function cap(s) {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

/* ===========================
   Add-to-Plan Modal
   =========================== */

function bindAddToPlanModal() {
  const dayEl = document.getElementById("planDay");
  if (dayEl && Array.isArray(DAYS)) {
    dayEl.innerHTML = DAYS.map((d) => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join("");
  }

  const modal = document.getElementById("addToPlanModal");
  const cancelBtn = document.getElementById("cancelAddBtn");
  if (modal && cancelBtn) cancelBtn.addEventListener("click", () => modal.close());
}

function openAddToPlanModal(recipeId) {
  const modal = document.getElementById("addToPlanModal");
  const subtitle = document.getElementById("addToPlanSubtitle");
  const recipeIdEl = document.getElementById("addToPlanRecipeId");
  const dayEl = document.getElementById("planDay");
  const portionsEl = document.getElementById("planPortions");
  const form = document.getElementById("addToPlanForm");

  const recipe = getRecipeById(recipeId);
  if (!recipe || !modal || !subtitle || !recipeIdEl || !dayEl || !portionsEl || !form) return;

  subtitle.textContent = `Adding: ${recipe.title}`;
  recipeIdEl.value = recipeId;
  portionsEl.value = "1";

  if (dayEl.options.length === 0) {
    dayEl.innerHTML = DAYS.map((d) => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join("");
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const day = dayEl.value;
    const portions = Math.max(1, Math.floor(Number(portionsEl.value || 1)));

    setDayPlan(day, recipeId, portions);

    modal.close();
    renderPlannerTable();
    renderShoppingList();
  };

  modal.showModal();
}

/* ===========================
   Weekly Planner Table
   =========================== */

function renderPlannerTable() {
  const wrap = document.getElementById("plannerTableWrap");
  if (!wrap) return;

  const hasAny = DAYS.some((d) => !!weeklyPlan[d]);

  const rows = DAYS
    .map((day) => {
      const entry = weeklyPlan[day];

      if (!entry) {
        return `
          <tr>
            <td class="td">${escapeHtml(day)}</td>
            <td class="td muted">—</td>
            <td class="td muted">—</td>
            <td class="td"><button class="btn btn--ghost btn--small" data-clear="${escapeHtml(day)}" type="button" disabled>Clear</button></td>
          </tr>
        `;
      }

      const recipe = getRecipeById(entry.recipeId);
      const title = recipe ? recipe.title : "Unknown recipe";
      const img = recipe?.image
        ? `
          <img src="${escapeHtml(recipe.image)}" alt="" loading="lazy"
            style="width:48px;height:34px;object-fit:cover;border-radius:10px;border:1px solid var(--border);margin-right:10px;flex:0 0 auto;">
        `
        : "";

      return `
        <tr>
          <td class="td">${escapeHtml(day)}</td>
          <td class="td">
            <div style="display:flex;align-items:center;gap:0;">
              ${img}
              <a href="#recipes" class="linklike" style="text-decoration:underline;">
                ${escapeHtml(title)}
              </a>
            </div>
          </td>
          <td class="td">${escapeHtml(String(entry.portions))}</td>
          <td class="td"><button class="btn btn--ghost btn--small" data-clear="${escapeHtml(day)}" type="button">Clear</button></td>
        </tr>
      `;
    })
    .join("");

  wrap.innerHTML = `
    <div class="card__header" style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
      <div>
        <h3 style="margin:0 0 4px;">Your week</h3>
        <p class="muted" style="margin:0;">Saved locally. One recipe per day.</p>
      </div>
      <button id="clearWeekBtn" class="btn btn--ghost btn--small" type="button" ${hasAny ? "" : "disabled"}>Clear week</button>
    </div>

    <div style="overflow:auto;">
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th class="th">Day</th>
            <th class="th">Recipe</th>
            <th class="th">Portions</th>
            <th class="th">Action</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;

  wrap.querySelectorAll("[data-clear]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.getAttribute("data-clear");
      if (!day) return;
      clearDayPlan(day);
      renderPlannerTable();
      renderShoppingList();
    });
  });

  const clearWeekBtn = document.getElementById("clearWeekBtn");
  if (clearWeekBtn) {
    clearWeekBtn.addEventListener("click", () => {
      clearWeekPlan();
      renderPlannerTable();
      renderShoppingList();
    });
  }

  injectTableCellStylesOnce();
}

function injectTableCellStylesOnce() {
  if (document.getElementById("fh-table-style")) return;

  const style = document.createElement("style");
  style.id = "fh-table-style";
  style.textContent = `
    .th{
      text-align:left;
      padding:10px;
      border-bottom:1px solid var(--border);
      font-size:13px;
      font-weight:800;
      color: var(--text);
      white-space: nowrap;
    }
    .td{
      padding:10px;
      border-bottom:1px solid var(--border);
      vertical-align: top;
    }
  `;
  document.head.appendChild(style);
}

/* ===========================
   Shopping List (UI)
   =========================== */

function renderShoppingList() {
  const wrap = document.getElementById("shoppingListWrap");
  if (!wrap) return;

  const aggregated = buildShoppingListFromPlan(weeklyPlan);

  if (aggregated.totalItems === 0) {
    wrap.innerHTML = `
      <p class="muted" style="margin:0;">
        No recipes selected yet. Add recipes to your weekly plan to generate a shopping list.
      </p>
    `;
    return;
  }

  const sectionHtml = STORE_SECTIONS
    .filter((section) => aggregated.bySection[section] && aggregated.bySection[section].length > 0)
    .map((section) => {
      const items = aggregated.bySection[section];

      const itemsHtml = items
        .map((it) => {
          const key = itemKey(section, it.name, it.unit);
          const checked = !!shoppingChecks[key];

          return `
            <label style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
              <input type="checkbox" data-shopcheck="${escapeHtml(key)}" ${checked ? "checked" : ""} style="margin-top:3px;">
              <span style="display:flex;flex-direction:column;gap:2px;">
                <span style="${checked ? "text-decoration:line-through;opacity:0.6;" : ""}">
                  <strong>${escapeHtml(it.name)}</strong>
                  <span class="muted">• ${escapeHtml(formatQty(it.qty, it.unit))}</span>
                </span>
              </span>
            </label>
          `;
        })
        .join("");

      return `
        <div style="margin-top:12px;">
          <h4 style="margin:0 0 6px;">${escapeHtml(section)}</h4>
          <div>${itemsHtml}</div>
        </div>
      `;
    })
    .join("");

  wrap.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
      <p class="muted" style="margin:0;">
        ${aggregated.totalItems} item${aggregated.totalItems === 1 ? "" : "s"} • Scaled by portions
      </p>
      <button id="resetChecksBtn" class="btn btn--ghost btn--small" type="button">Reset checks</button>
    </div>
    ${sectionHtml}
  `;

  wrap.querySelectorAll("[data-shopcheck]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const k = cb.getAttribute("data-shopcheck");
      if (!k) return;
      shoppingChecks[k] = cb.checked;
      renderShoppingList();
    });
  });

  const resetBtn = document.getElementById("resetChecksBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      Object.keys(shoppingChecks).forEach((k) => delete shoppingChecks[k]);
      renderShoppingList();
    });
  }
}

/* ===========================
   Shopping List (Aggregation)
   =========================== */

function buildShoppingListFromPlan(plan) {
  const byKey = Object.create(null);

  for (const day of DAYS) {
    const entry = plan?.[day];
    if (!entry) continue;

    const recipe = getRecipeById(entry.recipeId);
    if (!recipe || !Array.isArray(recipe.shopping)) continue;

    const portions = Math.max(1, Math.floor(Number(entry.portions || 1)));

    for (const item of recipe.shopping) {
      const section = normalizeSection(item.section);
      const name = String(item.name || "").trim() || "Item";
      const unit = String(item.unit || "").trim() || "unit";
      const qtyEach = Number(item.qty || 0);

      const qty = (Number.isFinite(qtyEach) && qtyEach > 0 ? qtyEach : 1) * portions;
      const key = itemKey(section, name, unit);

      if (!byKey[key]) byKey[key] = { section, name, unit, qty };
      else byKey[key].qty += qty;
    }
  }

  const bySection = Object.create(null);
  Object.values(byKey).forEach((it) => {
    if (!bySection[it.section]) bySection[it.section] = [];
    bySection[it.section].push(it);
  });

  for (const section of Object.keys(bySection)) {
    bySection[section].sort((a, b) => a.name.localeCompare(b.name));
  }

  return { bySection, totalItems: Object.keys(byKey).length };
}

function normalizeSection(section) {
  const s = String(section || "").trim();
  return STORE_SECTIONS.includes(s) ? s : "Other";
}

function itemKey(section, name, unit) {
  const s = String(section || "Other").toLowerCase();
  const n = String(name || "").trim().toLowerCase();
  const u = String(unit || "").trim().toLowerCase();
  return `${s}__${n}__${u}`;
}

/* ===========================
   Step 6: PDF generation
   =========================== */

function bindPdfButtons() {
  const planBtn = document.getElementById("downloadPlanPdfBtn");
  const shopBtn = document.getElementById("downloadShopPdfBtn");

  if (planBtn) {
    planBtn.addEventListener("click", async () => {
      try {
        planBtn.disabled = true;
        planBtn.textContent = "Generating PDF…";
        await generatePlanAndRecipesPdf();
      } catch (e) {
        console.error(e);
        alert("Sorry — could not generate the PDF. Check console for details.");
      } finally {
        planBtn.disabled = false;
        planBtn.textContent = "Download PDF: Plan + Recipes";
      }
    });
  }

  if (shopBtn) {
    shopBtn.addEventListener("click", async () => {
      try {
        shopBtn.disabled = true;
        shopBtn.textContent = "Generating PDF…";
        await generateShoppingListPdf();
      } catch (e) {
        console.error(e);
        alert("Sorry — could not generate the PDF. Check console for details.");
      } finally {
        shopBtn.disabled = false;
        shopBtn.textContent = "Download PDF: Shopping List";
      }
    });
  }
}

async function generatePlanAndRecipesPdf() {
  const jsPDF = window.jspdf?.jsPDF;
  if (!jsPDF) throw new Error("jsPDF not found. Ensure jspdf.umd.min.js is loaded.");

  const planRows = DAYS.map((day) => {
    const entry = weeklyPlan[day];
    if (!entry) return { day, recipeId: null, recipeTitle: "—", portions: "—" };
    const recipe = getRecipeById(entry.recipeId);
    return {
      day,
      recipeId: entry.recipeId,
      recipeTitle: recipe ? recipe.title : "Unknown recipe",
      portions: String(entry.portions)
    };
  });

  const selectedRecipeIds = Array.from(new Set(planRows.filter((r) => !!r.recipeId).map((r) => r.recipeId)));

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Fast & Health — Weekly Plan", margin, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 72);
  doc.setTextColor(0);

  const recipeCellLinks = [];
  const tableBody = planRows.map((r) => [r.day, r.recipeTitle, r.portions]);

  if (typeof doc.autoTable !== "function") {
    throw new Error("jsPDF AutoTable not found. Ensure jspdf-autotable is loaded.");
  }

  doc.autoTable({
    startY: 92,
    head: [["Day", "Recipe", "Portions"]],
    body: tableBody,
    styles: { font: "helvetica", fontSize: 10, cellPadding: 6, lineColor: [220, 220, 220], lineWidth: 0.7 },
    headStyles: { fillColor: [242, 140, 40], textColor: 255, fontStyle: "bold" },
    columnStyles: { 0: { cellWidth: 120 }, 1: { cellWidth: pageW - margin * 2 - 120 - 90 }, 2: { cellWidth: 90 } },
    didDrawCell: (data) => {
      if (data.section === "body" && data.column.index === 1) {
        const row = planRows[data.row.index];
        if (!row?.recipeId) return;
        recipeCellLinks.push({ recipeId: row.recipeId, x: data.cell.x, y: data.cell.y, w: data.cell.width, h: data.cell.height });
      }
    }
  });

  let cursorY = (doc.lastAutoTable?.finalY || 110) + 18;

  if (pageH - cursorY < 40) {
    doc.addPage();
    cursorY = margin;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Selected Recipes", margin, cursorY);
  cursorY += 16;

  const imgCache = new Map();
  const recipeStartPage = Object.create(null);

  for (const recipeId of selectedRecipeIds) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) continue;

    const minBlockHeight = 260;
    if (pageH - cursorY < minBlockHeight) {
      doc.addPage();
      cursorY = margin;
    }

    recipeStartPage[recipeId] = doc.internal.getNumberOfPages();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(recipe.title, margin, cursorY);
    cursorY += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(
      `Calories: ${recipe.caloriesPerPortion} kcal/portion   •   Time: ${recipe.minutes} min   •   ${recipe.diet === "vegetarian" ? "Vegetarian" : "Non-Vegetarian"}${recipe.meatType ? ` (${cap(recipe.meatType)})` : ""}`,
      margin,
      cursorY + 12
    );
    doc.setTextColor(0);
    cursorY += 26;

    const imgBoxW = 220;
    const imgBoxH = 150;

    let imageAdded = false;
    try {
      const dataUrl = await getImageDataUrl(recipe.image, imgCache);
      if (dataUrl) {
        doc.addImage(dataUrl, "JPEG", margin, cursorY, imgBoxW, imgBoxH, undefined, "FAST");
        imageAdded = true;
      }
    } catch {
      imageAdded = false;
    }

    const textX = margin + (imageAdded ? imgBoxW + 14 : 0);
    const textW = pageW - margin - textX;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Ingredients", textX, cursorY + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    let textY = cursorY + 28;
    const ingredientsLines = (recipe.ingredients || []).map((i) => `• ${i}`);
    const ingredientsWrapped = wrapLines(doc, ingredientsLines.join("\n"), textW);
    const ingHeight = ingredientsWrapped.length * 12 + 6;

    if (pageH - cursorY < Math.max(imgBoxH, ingHeight) + 110) {
      doc.addPage();
      cursorY = margin;
      recipeStartPage[recipeId] = doc.internal.getNumberOfPages();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(recipe.title, margin, cursorY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(90);
      doc.text(`Calories: ${recipe.caloriesPerPortion} kcal/portion   •   Time: ${recipe.minutes} min`, margin, cursorY + 14);
      doc.setTextColor(0);
      cursorY += 30;

      imageAdded = false;
      try {
        const dataUrl = await getImageDataUrl(recipe.image, imgCache);
        if (dataUrl) {
          doc.addImage(dataUrl, "JPEG", margin, cursorY, imgBoxW, imgBoxH, undefined, "FAST");
          imageAdded = true;
        }
      } catch {
        imageAdded = false;
      }
    }

    const textX2 = margin + (imageAdded ? imgBoxW + 14 : 0);
    const textW2 = pageW - margin - textX2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Ingredients", textX2, cursorY + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    textY = cursorY + 28;
    const ingredientsWrapped2 = wrapLines(doc, ingredientsLines.join("\n"), textW2);
    ingredientsWrapped2.forEach((line) => {
      doc.text(line, textX2, textY);
      textY += 12;
    });

    const blockBottomY = cursorY + (imageAdded ? imgBoxH : 0);
    let stepsY = Math.max(blockBottomY, textY) + 18;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Steps", margin, stepsY);
    stepsY += 16;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const stepsLines = (recipe.steps || []).map((s, idx) => `${idx + 1}. ${s}`);
    const stepsWrapped = wrapLines(doc, stepsLines.join("\n"), pageW - margin * 2);

    for (const line of stepsWrapped) {
      if (stepsY > pageH - margin) {
        doc.addPage();
        stepsY = margin;
      }
      doc.text(line, margin, stepsY);
      stepsY += 12;
    }

    const afterY = stepsY + 8;
    if (afterY < pageH - margin) {
      doc.setDrawColor(220);
      doc.line(margin, afterY, pageW - margin, afterY);
    }
    cursorY = afterY + 16;
  }

  if (recipeCellLinks.length > 0) {
    doc.setPage(1);
    for (const link of recipeCellLinks) {
      const targetPage = recipeStartPage[link.recipeId];
      if (!targetPage) continue;
      doc.link(link.x, link.y, link.w, link.h, { pageNumber: targetPage });
    }
  }

  doc.save(`fast-health_weekly-plan_${dateStamp()}.pdf`);
}

async function generateShoppingListPdf() {
  const jsPDF = window.jspdf?.jsPDF;
  if (!jsPDF) throw new Error("jsPDF not found. Ensure jspdf.umd.min.js is loaded.");

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 40;

  const aggregated = buildShoppingListFromPlan(weeklyPlan);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Fast & Health — Shopping List", margin, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 72);
  doc.setTextColor(0);

  if (aggregated.totalItems === 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("No items yet. Add recipes to the weekly plan first.", margin, 110);
    doc.save(`fast-health_shopping-list_${dateStamp()}.pdf`);
    return;
  }

  const rows = [];
  for (const section of STORE_SECTIONS) {
    const items = aggregated.bySection[section];
    if (!items || items.length === 0) continue;

    rows.push([{ content: section, colSpan: 2, styles: { fillColor: [251, 247, 241], textColor: 0, fontStyle: "bold" } }]);
    for (const it of items) rows.push([it.name, formatQty(it.qty, it.unit)]);
    rows.push(["", ""]);
  }

  if (typeof doc.autoTable !== "function") throw new Error("jsPDF AutoTable not found. Ensure jspdf-autotable is loaded.");

  doc.autoTable({
    startY: 92,
    head: [["Item", "Quantity"]],
    body: rows,
    styles: { font: "helvetica", fontSize: 10, cellPadding: 6, lineColor: [220, 220, 220], lineWidth: 0.7, valign: "top" },
    headStyles: { fillColor: [242, 140, 40], textColor: 255, fontStyle: "bold" },
    columnStyles: { 0: { cellWidth: pageW - margin * 2 - 160 }, 1: { cellWidth: 160 } },
    didParseCell: (data) => {
      if (data.section === "body" && data.row.raw && Array.isArray(data.row.raw)) {
        const raw = data.row.raw;
        if (raw[0] === "" && raw[1] === "") {
          data.cell.styles.fillColor = [255, 255, 255];
          data.cell.styles.lineWidth = 0;
          data.cell.text = "";
        }
      }
    }
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90);
  doc.text("Tip: Quantities are scaled by portions from your weekly plan.", margin, doc.lastAutoTable.finalY + 18);
  doc.setTextColor(0);

  doc.save(`fast-health_shopping-list_${dateStamp()}.pdf`);
}

/* ===========================
   Step 7: Share (WhatsApp + Email)
   =========================== */

function bindShareButtons() {
  const waBtn = document.getElementById("shareWhatsAppBtn");
  const emBtn = document.getElementById("shareEmailBtn");

  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const msg = buildShareMessage();
      const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  if (emBtn) {
    emBtn.addEventListener("click", () => {
      const subject = "Fast & Health — Weekly Breakfast Plan (PDFs attached)";
      const body = buildShareMessage();
      const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
}

function buildShareMessage() {
  const siteUrl = getSiteUrl();
  const summary = buildPlanSummaryText();

  return [
    "Fast & Health — my weekly breakfast plan 🍳",
    "",
    "I downloaded the PDFs from the site (weekly plan + recipes, plus shopping list).",
    "Please see them attached here.",
    "",
    summary,
    "",
    `Site: ${siteUrl}`
  ].join("\n");
}

function getSiteUrl() {
  const base = `${location.origin}${location.pathname}`;
  return base.replace(/index\.html$/i, "");
}

function buildPlanSummaryText() {
  const hasAny = DAYS.some((d) => !!weeklyPlan[d]);
  if (!hasAny) return "Plan summary: (No recipes selected yet.)";

  const lines = ["Plan summary:"];
  for (const day of DAYS) {
    const entry = weeklyPlan[day];
    if (!entry) lines.push(`- ${day}: —`);
    else {
      const recipe = getRecipeById(entry.recipeId);
      const title = recipe ? recipe.title : "Unknown recipe";
      lines.push(`- ${day}: ${title} (${entry.portions} portion${entry.portions === 1 ? "" : "s"})`);
    }
  }
  return lines.join("\n");
}

/* ===========================
   Image helpers for PDF
   =========================== */

async function getImageDataUrl(url, cache) {
  if (!url) return null;
  const key = String(url);
  if (cache.has(key)) return cache.get(key);

  const res = await fetch(key);
  if (!res.ok) return null;

  const blob = await res.blob();
  const dataUrl = await blobToDataURL(blob);
  cache.set(key, dataUrl);
  return dataUrl;
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function wrapLines(doc, text, maxWidth) {
  const parts = String(text || "").split("\n");
  const out = [];
  for (const p of parts) {
    if (!p.trim()) {
      out.push("");
      continue;
    }
    const lines = doc.splitTextToSize(p, maxWidth);
    out.push(...lines);
  }
  return out;
}

function dateStamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/* ===========================
   Step 5: LocalStorage wiring
   =========================== */

function defaultPlan() {
  const plan = {};
  DAYS.forEach((d) => (plan[d] = null));
  return plan;
}

function loadPlan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPlan();

    const parsed = JSON.parse(raw);
    const plan = defaultPlan();

    DAYS.forEach((day) => {
      const v = parsed?.[day];
      if (!v || typeof v !== "object") return;

      const recipeId = String(v.recipeId || "").trim();
      const portions = Math.max(1, Math.floor(Number(v.portions || 1)));

      if (recipeId && getRecipeById(recipeId)) plan[day] = { recipeId, portions };
      else plan[day] = null;
    });

    return plan;
  } catch {
    return defaultPlan();
  }
}

function savePlan() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeklyPlan));
  } catch {
    // ignore
  }
}

function setDayPlan(day, recipeId, portions) {
  if (!DAYS.includes(day)) return;
  const recipe = getRecipeById(recipeId);
  if (!recipe) return;

  const cleanPortions = Math.max(1, Math.floor(Number(portions || 1)));

  weeklyPlan[day] = { recipeId: recipe.id, portions: cleanPortions }; // overwrite
  savePlan();
}

function clearDayPlan(day) {
  if (!DAYS.includes(day)) return;
  weeklyPlan[day] = null;
  savePlan();
}

function clearWeekPlan() {
  weeklyPlan = defaultPlan();
  savePlan();
}

function getRecipeById(id) {
  return RECIPES.find((r) => r.id === id) || null;
}

function bindCrossTabPlanSync() {
  window.addEventListener("storage", (e) => {
    if (e.key !== STORAGE_KEY) return;
    weeklyPlan = loadPlan();
    renderPlannerTable();
    renderShoppingList();
  });
}

/* ===========================
   Quantity formatting (grocery-friendly)
   =========================== */

function formatQty(qty, unit) {
  const u = String(unit || "unit").trim();
  const num = Number(qty || 0);
  if (!Number.isFinite(num) || num <= 0) return `1 ${u}`;

  const pretty = prettyNumber(num);

  const pluralizable = new Set(["piece", "pieces", "slice", "slices", "can", "cans", "cup", "cups", "handful", "handfuls"]);
  const lower = u.toLowerCase();

  if (pluralizable.has(lower)) {
    const base = singularUnit(lower);
    const outUnit = isEffectivelyOne(num) ? base : pluralUnit(base);
    return `${pretty} ${outUnit}`;
  }

  return `${pretty} ${u}`;
}

function isEffectivelyOne(n) {
  return Math.abs(n - 1) < 1e-9;
}

function singularUnit(u) {
  switch (u) {
    case "pieces":
      return "piece";
    case "slices":
      return "slice";
    case "cans":
      return "can";
    case "cups":
      return "cup";
    case "handfuls":
      return "handful";
    default:
      return u;
  }
}

function pluralUnit(u) {
  switch (u) {
    case "piece":
      return "pieces";
    case "slice":
      return "slices";
    case "can":
      return "cans";
    case "cup":
      return "cups";
    case "handful":
      return "handfuls";
    default:
      return u;
  }
}

function prettyNumber(n) {
  const whole = Math.floor(n);
  const frac = n - whole;

  const f = fractionString(frac);
  if (f) return whole === 0 ? f : `${whole} ${f}`;

  return (Math.round(n * 100) / 100).toFixed(2).replace(/\.?0+$/, "");
}

function fractionString(frac) {
  const options = [
    { v: 0.25, s: "1/4" },
    { v: 0.33, s: "1/3" },
    { v: 0.5, s: "1/2" },
    { v: 0.66, s: "2/3" },
    { v: 0.75, s: "3/4" }
  ];
  for (const o of options) {
    if (Math.abs(frac - o.v) < 0.06) return o.s;
  }
  return "";
}

/* ===========================
   Utilities
   =========================== */

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
