/**
 * app.js — Fast & Health (No React)
 * Single-page: Home / Recipes / Weekly Planner / Contacts
 *
 * Key changes requested:
 * ✅ Wider layout handled by CSS container max-width
 * ✅ Stronger section headings handled by CSS
 * ✅ Hero responsiveness: image object-fit & object-position + panel for text
 * ✅ Recipes: two equal buttons on same row
 * ✅ Add modal: Cancel closes; days show current planned recipe titles
 * ✅ Shopping list redesign: table-like columns (Item / Quantity / Checkbox)
 * ✅ Removed WhatsApp/Email share buttons + related code
 * ✅ Contacts: remove social card; bigger form; no note; show success UI (no backend)
 * ✅ Footer: social icons + labels open “Coming soon” modal
 * ✅ LocalStorage: weekly plan persists
 * ✅ Shopping list checkboxes: saved in LocalStorage by default (better UX)
 *
 * Libraries (loaded in index.html):
 * - jsPDF UMD: window.jspdf.jsPDF
 * - jsPDF AutoTable: doc.autoTable
 */

/* ===========================
   Storage keys
   =========================== */

const STORAGE_KEY_PLAN = "fastHealth_weeklyPlan_v1";
const STORAGE_KEY_SHOPCHECKS = "fastHealth_shopChecks_v1";

/* ===========================
   App state
   =========================== */

let weeklyPlan = loadPlan();
let shoppingChecks = loadShoppingChecks(); // saved by default (can be changed easily)

/* Fixed store sections */
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
   Boot
   =========================== */

(function init() {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  bindDevModal();
  bindContactCounter();
  bindContactForm();

  renderHomeArticles();
  renderRecipes();

  bindAddToPlanModal();

  renderPlannerTable();
  renderShoppingList();

  bindCrossTabPlanSync();
  bindPdfButtons();
})();

/* ===========================
   Under development modal (footer icons)
   =========================== */

function bindDevModal() {
  const modal = document.getElementById("devModal");
  const modalText = document.getElementById("devModalText");
  const closeBtn = document.getElementById("closeModalBtn");

  function open(platformName) {
    if (modalText) modalText.textContent = `${platformName}: This page is under development.`;
    if (modal && typeof modal.showModal === "function") modal.showModal();
    else alert(`${platformName}: This page is under development.`);
  }

  if (closeBtn && modal) closeBtn.addEventListener("click", () => modal.close());

  document.querySelectorAll("[data-social]").forEach((btn) => {
    btn.addEventListener("click", () => open(btn.dataset.social || "Social"));
  });
}

/* ===========================
   Home articles accordion
   =========================== */

function renderHomeArticles() {
  const wrap = document.getElementById("articlesGrid");
  if (!wrap || !Array.isArray(HOME_ARTICLES)) return;

  wrap.innerHTML = HOME_ARTICLES.map((a) => {
    return `
      <article class="article card">
        <div class="article__row">
          <div class="article__media">
            <img class="article__img" src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy">
          </div>

          <div class="article__content">
            <h3 class="article__title">${escapeHtml(a.title)}</h3>
            <div class="article__body">
              ${formatBodyToHtml(a.body)}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}


/** Convert plain text (with paragraphs and bullets) into safe HTML. */
function formatBodyToHtml(text) {
  const raw = String(text || "");
  const paragraphs = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return paragraphs.map((p) => {
    const lines = p.split("\n").map((l) => l.trim()).filter(Boolean);
    const bullets = lines.filter((l) => l.startsWith("• "));

    if (bullets.length >= 2 && bullets.length === lines.length) {
      const items = bullets.map((l) => `<li>${escapeHtml(l.replace(/^•\s+/, ""))}</li>`).join("");
      return `<ul class="article__list">${items}</ul>`;
    }

    return `<p>${escapeHtml(p).replaceAll("\n", "<br>")}</p>`;
  }).join("");
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
  const meatIcon = r.meatType ? `${meatTypeIcon(r.meatType)} ${cap(r.meatType)}` : "";

  return `
    <article class="recipe card" id="recipe-${escapeHtml(r.id)}">
      <div class="recipe__media">
        <img class="recipe__img" src="${escapeHtml(r.image)}" alt="${escapeHtml(r.title)}" loading="lazy">
        <span class="badge badge--left">${dietLabel}</span>
        ${r.meatType ? `<span class="badge badge--right">${escapeHtml(meatIcon)}</span>` : ""}
      </div>

      <div class="recipe__body">
        <h3 class="recipe__title">${escapeHtml(r.title)}</h3>

        <div class="recipe__meta">
          <span class="chip">🔥 ${Number(r.caloriesPerPortion) || 0} kcal / portion</span>
          <span class="chip">⏱ ${Number(r.minutes) || 0} min</span>
        </div>

        <!-- Buttons: same row, same size (CSS flex:1) -->
        <div class="recipe__actions">
          <button class="btn btn--ghost" data-action="toggle" data-id="${escapeHtml(r.id)}" type="button">
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

  // Close others
  document.querySelectorAll(".recipe__expand").forEach((p) => (p.hidden = true));
  panel.hidden = !shouldOpen;

  if (shouldOpen) {
    document.getElementById(`recipe-${recipeId}`)?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }
}

function meatTypeIcon(meatType) {
  switch (meatType) {
    case "chicken": return "🍗";
    case "beef": return "🥩";
    case "fish": return "🐟";
    case "pork": return "🐖";
    case "lamb": return "🐑";
    default: return "🍽️";
  }
}

function cap(s) {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

/* ===========================
   Add-to-Plan Modal
   =========================== */

function bindAddToPlanModal() {
  const modal = document.getElementById("addToPlanModal");
  const cancelBtn = document.getElementById("cancelAddBtn");
  const form = document.getElementById("addToPlanForm");

  if (!modal || !cancelBtn || !form) return;

  // Cancel must close modal
  cancelBtn.addEventListener("click", () => modal.close());

  // Defensive: if someone presses ESC, close cleanly
  modal.addEventListener("cancel", (e) => {
    e.preventDefault();
    modal.close();
  });
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

  // Default portions = 1
  portionsEl.value = "1";

  // Populate day options with current planned recipe titles (simple, only 7)
  dayEl.innerHTML = DAYS.map((day) => {
    const entry = weeklyPlan[day];
    if (!entry) return `<option value="${escapeHtml(day)}">${escapeHtml(day)} — (empty)</option>`;

    const plannedRecipe = getRecipeById(entry.recipeId);
    const plannedTitle = plannedRecipe ? plannedRecipe.title : "Unknown recipe";
    return `<option value="${escapeHtml(day)}">${escapeHtml(day)} — ${escapeHtml(plannedTitle)}</option>`;
  }).join("");

  // Save handler
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
   Weekly Planner table
   =========================== */

function renderPlannerTable() {
  const wrap = document.getElementById("plannerTableWrap");
  if (!wrap) return;

  const hasAny = DAYS.some((d) => !!weeklyPlan[d]);

  const rows = DAYS.map((day) => {
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
      ? `<img class="recipe-mini__img" src="${escapeHtml(recipe.image)}" alt="" loading="lazy">`
      : "";

    return `
      <tr>
        <td class="td">${escapeHtml(day)}</td>
        <td class="td">
          <div class="recipe-mini">
            ${img}
            <span class="recipe-mini__title">${escapeHtml(title)}</span>
          </div>
        </td>
        <td class="td">${escapeHtml(String(entry.portions))}</td>
        <td class="td">
          <button class="btn btn--ghost btn--small" data-clear="${escapeHtml(day)}" type="button">Clear</button>
        </td>
      </tr>
    `;
  }).join("");

  wrap.innerHTML = `
    <div class="planner-head">
      <div>
        <h3 style="margin:0 0 4px;font-weight:950;">Your week</h3>
        <p class="muted" style="margin:0;">Saved locally. One recipe per day.</p>
      </div>
      <button id="clearWeekBtn" class="btn btn--ghost btn--small" type="button" ${hasAny ? "" : "disabled"}>Clear week</button>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th class="th">Day</th>
            <th class="th">Recipe</th>
            <th class="th">Portions</th>
            <th class="th">Action</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
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
}

/* ===========================
   Shopping list (table per section)
   =========================== */

function renderShoppingList() {
  const wrap = document.getElementById("shoppingListWrap");
  if (!wrap) return;

  const aggregated = buildShoppingListFromPlan(weeklyPlan);

  if (aggregated.totalItems === 0) {
    wrap.classList.remove("shop");
    wrap.innerHTML = `<p class="muted" style="margin:0;">No recipes selected yet. Add recipes to your weekly plan to generate a shopping list.</p>`;
    return;
  }

  // Build ONE table body with section labels inside the scroll area
  const bodyRows = [];
  for (const section of STORE_SECTIONS) {
    const items = aggregated.bySection[section];
    if (!items || items.length === 0) continue;

    bodyRows.push(`
      <tr>
        <td class="shop-section-label" colspan="3">${escapeHtml(section)}</td>
      </tr>
    `);

    for (const it of items) {
      const key = itemKey(section, it.name, it.unit);
      const checked = !!shoppingChecks[key];

      bodyRows.push(`
        <tr class="${checked ? "shop-item--done" : ""}">
          <td>${escapeHtml(it.name)}</td>
          <td>${escapeHtml(formatQty(it.qty, it.unit))}</td>
          <td>
            <input class="shop-check" type="checkbox" data-shopcheck="${escapeHtml(key)}" ${checked ? "checked" : ""}>
          </td>
        </tr>
      `);
    }
  }

  wrap.classList.add("shop");
  wrap.innerHTML = `
    <div class="shop__top">
      <p class="muted" style="margin:0;">
        ${aggregated.totalItems} item${aggregated.totalItems === 1 ? "" : "s"} • Scaled by portions
      </p>
      <button id="resetChecksBtn" class="btn btn--ghost btn--small" type="button">Reset checks</button>
    </div>

    <div class="shop__scroll">
      <table class="shop-table">
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QUANTITY</th>
            <th>BOUGHT</th>
          </tr>
        </thead>
        <tbody>
          ${bodyRows.join("")}
        </tbody>
      </table>
    </div>
  `;

  // Bind checkbox toggles
  wrap.querySelectorAll("[data-shopcheck]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const k = cb.getAttribute("data-shopcheck");
      if (!k) return;
      shoppingChecks[k] = cb.checked;
      saveShoppingChecks();
      const row = cb.closest("tr");
      if (row) row.classList.toggle("shop-item--done", cb.checked);
    });
  });

  // Reset checks
  const resetBtn = document.getElementById("resetChecksBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      shoppingChecks = Object.create(null);
      saveShoppingChecks();
      renderShoppingList();
    });
  }
}

/* ===========================
   Shopping list aggregation
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
   PDFs (Step 6)
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
    return { day, recipeId: entry.recipeId, recipeTitle: recipe ? recipe.title : "Unknown recipe", portions: String(entry.portions) };
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

  if (typeof doc.autoTable !== "function") throw new Error("jsPDF AutoTable not found. Ensure jspdf-autotable is loaded.");

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
      `Calories: ${recipe.caloriesPerPortion} kcal/portion   •   Time: ${recipe.minutes} min   •   ${
        recipe.diet === "vegetarian" ? "Vegetarian" : "Non-Vegetarian"
      }${recipe.meatType ? ` (${cap(recipe.meatType)})` : ""}`,
      margin,
      cursorY + 12
    );
    doc.setTextColor(0);
    cursorY += 26;

    // Recipe image + ingredients beside it if space
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

    ingredientsWrapped.forEach((line) => {
      doc.text(line, textX, textY);
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

  // Add clickable links from weekly table cells to recipe pages
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
      // Hide separator blank rows
      if (data.section === "body" && Array.isArray(data.row.raw)) {
        const raw = data.row.raw;
        if (raw[0] === "" && raw[1] === "") {
          data.cell.styles.fillColor = [255, 255, 255];
          data.cell.styles.lineWidth = 0;
          data.cell.text = "";
        }
      }
    }
  });

  doc.save(`fast-health_shopping-list_${dateStamp()}.pdf`);
}

/* ===========================
   Contact form (no backend)
   =========================== */

function bindContactCounter() {
  const messageEl = document.getElementById("message");
  const countEl = document.getElementById("messageCount");
  if (!messageEl || !countEl) return;

  const update = () => (countEl.textContent = `${messageEl.value.length} / 1500`);
  messageEl.addEventListener("input", update);
  update();
}

function bindContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");
  if (!form || !status || !submitBtn) return;

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const messageEl = document.getElementById("message");

  function setStatus(type, text) {
    status.classList.remove("is-success", "is-error");
    status.textContent = text;
    if (type === "success") status.classList.add("is-success");
    if (type === "error") status.classList.add("is-error");
  }

  function clearStatus() {
    status.classList.remove("is-success", "is-error");
    status.textContent = "";
  }

  form.querySelectorAll("input, textarea").forEach((el) => el.addEventListener("input", clearStatus));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = String(nameEl?.value || "").trim();
    const email = String(emailEl?.value || "").trim();
    const msg = String(messageEl?.value || "").trim();

    if (!name) return setStatus("error", "Please enter your name.");
    if (!email) return setStatus("error", "Please enter your email.");
    if (!isValidEmail(email)) return setStatus("error", "Please enter a valid email address.");
    if (!msg) return setStatus("error", "Please write a message.");

    // Simulated success (no backend)
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    setTimeout(() => {
      form.reset();
      bindContactCounter();
      setStatus("success", "Thanks! Your message was sent.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }, 350);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

/* ===========================
   LocalStorage: weekly plan
   =========================== */

function defaultPlan() {
  const plan = {};
  DAYS.forEach((d) => (plan[d] = null));
  return plan;
}

function loadPlan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PLAN);
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
    localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(weeklyPlan));
  } catch {
    // ignore
  }
}

function setDayPlan(day, recipeId, portions) {
  if (!DAYS.includes(day)) return;
  const recipe = getRecipeById(recipeId);
  if (!recipe) return;

  weeklyPlan[day] = { recipeId: recipe.id, portions: Math.max(1, Math.floor(Number(portions || 1))) };
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

function bindCrossTabPlanSync() {
  window.addEventListener("storage", (e) => {
    if (e.key !== STORAGE_KEY_PLAN) return;
    weeklyPlan = loadPlan();
    renderPlannerTable();
    renderShoppingList();
  });
}

/* ===========================
   LocalStorage: shopping checks (saved by default)
   =========================== */

function loadShoppingChecks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SHOPCHECKS);
    if (!raw) return Object.create(null);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return Object.create(null);
    return parsed;
  } catch {
    return Object.create(null);
  }
}

function saveShoppingChecks() {
  try {
    localStorage.setItem(STORAGE_KEY_SHOPCHECKS, JSON.stringify(shoppingChecks));
  } catch {
    // ignore
  }
}

/* ===========================
   Helpers
   =========================== */

function getRecipeById(id) {
  return RECIPES.find((r) => r.id === id) || null;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dateStamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/* ===========================
   Quantity formatting (grocery-friendly)
   =========================== */

function formatQty(qty, unit) {
  const u = String(unit || "unit").trim();
  const num = Number(qty || 0);
  if (!Number.isFinite(num) || num <= 0) return `1 ${u}`;

  const pretty = prettyNumber(num);

  const pluralizable = new Set(["piece", "pieces", "slice", "slices", "can", "cans", "cup", "cups", "handful", "handfuls", "tbsp", "pinch"]);
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
    case "pieces": return "piece";
    case "slices": return "slice";
    case "cans": return "can";
    case "cups": return "cup";
    case "handfuls": return "handful";
    default: return u;
  }
}

function pluralUnit(u) {
  switch (u) {
    case "piece": return "pieces";
    case "slice": return "slices";
    case "can": return "cans";
    case "cup": return "cups";
    case "handful": return "handfuls";
    default: return u;
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
   PDF image helpers
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
