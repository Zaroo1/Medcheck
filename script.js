/* =====================================================
   TAB SWITCHING (UI ONLY)
   Purpose: Switch between Checker / About / Team tabs
   ⚠ DO NOT MODIFY – unrelated to drug logic
===================================================== */
function openTab(tabId, btn) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  if (btn) btn.classList.add("active");
}

/* =====================================================
   DRUG–DRUG INTERACTIONS DATABASE
===================================================== */
/*
👉 HOW TO ADD A NEW DRUG INTERACTION (IMPORTANT):

FORMAT (DO NOT CHANGE):
["drugA","drugB","severity","message"]

RULES:
✔ drugA & drugB → lowercase only
✔ severity → "major", "moderate", or "minor"
✔ message → short clinical explanation
✔ One interaction per line

EXAMPLE:
["amlodipine","simvastatin","moderate","Increased statin levels."]

⚠ Do NOT change array structure
⚠ Do NOT remove commas
*/
const interactions = [

  ["warfarin","metronidazole","major","Increased bleeding risk."],
  ["warfarin","ciprofloxacin","major","Enhanced anticoagulant effect."],
  ["warfarin","aspirin","major","High bleeding risk."],
  ["enalapril","spironolactone","major","Severe hyperkalemia."],
  ["lisinopril","potassium","major","Life-threatening hyperkalemia."],
  ["sildenafil","nitrates","major","Severe hypotension."],
  ["rifampicin","oral contraceptives","major","Contraceptive failure."],
  ["carbamazepine","oral contraceptives","major","Reduced contraceptive efficacy."],
  ["phenytoin","oral contraceptives","major","Contraceptive failure."],
  ["ciprofloxacin","theophylline","major","Increased theophylline toxicity."],
  ["clarithromycin","simvastatin","major","Rhabdomyolysis risk."],
  ["erythromycin","simvastatin","major","Severe muscle toxicity."],
  ["ciprofloxacin","milk","moderate","Reduced absorption."],
  ["tetracycline","milk","moderate","Reduced absorption."],
  ["iron","levothyroxine","moderate","Reduced hormone absorption."],
  ["ibuprofen","enalapril","moderate","Reduced BP control."],
  ["diclofenac","warfarin","moderate","Increased bleeding risk."],
  ["paracetamol","amoxicillin","minor","Safe combination."],
  ["vitamin c","iron","minor","Improves iron absorption."]
];

/* =====================================================
   DRUG SAFETY DATABASE
===================================================== */
/*
👉 HOW TO ADD A NEW DRUG (VERY IMPORTANT):

STEP 1: Copy ONE full object below
STEP 2: Paste it in the correct category
STEP 3: Change ONLY the values
STEP 4: KEEP structure EXACTLY the same

⚠ RULES:
✔ name MUST be lowercase
✔ One drug = one object
✔ Do NOT delete keys
✔ Arrays must stay arrays []

TEMPLATE EXAMPLE:

{
  name: "amlodipine",
  class: "Calcium Channel Blocker",
  foodAvoid: [],
  avoidWith: ["simvastatin"],
  conditionsAvoid: [],
  populationsAvoid: [],
  notes: "May cause ankle edema."
}
*/
const drugDatabase = [

  /* ANALGESICS */
  {
    name: "paracetamol",
    class: "Analgesic / Antipyretic",
    foodAvoid: [],
    avoidWith: ["alcohol"],
    conditionsAvoid: ["liver disease", "chronic alcoholism"],
    populationsAvoid: [],
    notes: "Safe at recommended doses; overdose causes liver toxicity."
  },

  {
    name: "amoxicillin",
    class: "Antibiotic (Penicillin)",
    foodAvoid: [],
    avoidWith: ["allopurinol"],
    conditionsAvoid: ["renal impairment"],
    populationsAvoid: ["pregnancy"],
    notes: "Allergic reactions possible."
  },

  /* ANTIMALARIALS */
  {
    name: "artemether-lumefantrine",
    class: "Antimalarial (ACT)",
    foodAvoid: [],
    avoidWith: ["rifampicin", "carbamazepine"],
    conditionsAvoid: ["severe liver disease"],
    populationsAvoid: ["first trimester pregnancy"],
    notes: "Enzyme inducers reduce effectiveness."
  },

  {
    name: "artesunate",
    class: "Antimalarial",
    foodAvoid: [],
    avoidWith: [],
    conditionsAvoid: [],
    populationsAvoid: [],
    notes: "Drug of choice for severe malaria."
  },

  /* ANTIBIOTICS */
  {
    name: "ciprofloxacin",
    class: "Fluoroquinolone",
    foodAvoid: ["milk", "eggs", "iron", "antacids"],
    avoidWith: ["theophylline"],
    conditionsAvoid: ["tendon disorders"],
    populationsAvoid: ["children", "pregnancy"],
    notes: "Chelation reduces absorption."
  },

  {
    name: "tetracycline",
    class: "Antibiotic",
    foodAvoid: ["milk"],
    avoidWith: [],
    conditionsAvoid: [],
    populationsAvoid: ["children", "pregnancy"],
    notes: "Tooth discoloration risk."
  },

  {
    name: "metronidazole",
    class: "Antibiotic",
    foodAvoid: ["alcohol"],
    avoidWith: ["warfarin"],
    conditionsAvoid: [],
    populationsAvoid: [],
    notes: "Disulfiram-like reaction with alcohol."
  },

  /* CARDIOVASCULAR */
  {
    name: "warfarin",
    class: "Anticoagulant",
    foodAvoid: ["alcohol"],
    avoidWith: ["aspirin", "metronidazole"],
    conditionsAvoid: ["bleeding disorders"],
    populationsAvoid: ["pregnancy"],
    notes: "Monitor INR closely."
  },

  {
    name: "enalapril",
    class: "ACE inhibitor",
    foodAvoid: [],
    avoidWith: ["spironolactone"],
    conditionsAvoid: ["renal artery stenosis"],
    populationsAvoid: ["pregnancy"],
    notes: "Risk of hyperkalemia."
  },

  {
    name: "spironolactone",
    class: "Potassium-sparing diuretic",
    foodAvoid: ["potassium supplements"],
    avoidWith: ["enalapril"],
    conditionsAvoid: ["renal impairment"],
    populationsAvoid: [],
    notes: "Risk of severe hyperkalemia."
  }
];

/* =====================================================
   AI-ASSISTED DRUG NAME SUGGESTIONS
===================================================== */
/*
🤖 PURPOSE:
- Handles misspellings
- Handles partial drug names
- Uses internal database only
- Does NOT change clinical logic
*/
function suggestDrugs(input) {
  const suggestions = [];

  drugDatabase.forEach(db => {
    if (
      db.name.includes(input) ||
      input.includes(db.name) ||
      levenshteinDistance(input, db.name) <= 2
    ) {
      suggestions.push(db.name);
    }
  });

  return suggestions;
}

/* SPELL-SIMILARITY HELPER
   ⚠ DO NOT MODIFY */
function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return matrix[a.length][b.length];
}

/* =====================================================
   MAIN INTERACTION CHECK FUNCTION
   ⚠ CORE LOGIC – DO NOT MODIFY
===================================================== */
function checkInteraction() {

  /* COLLECT USER INPUT */
  const drugs = [];
  for (let i = 1; i <= 6; i++) {
    const d = document.getElementById(`drug${i}`).value.toLowerCase().trim();
    if (d) drugs.push(d);
  }

  const result = document.getElementById("result");

  if (!drugs.length) {
    result.innerHTML = "⚠ Please enter at least one drug.";
    return;
  }

  let output = "";
  let notFoundDrugs = [];

  /* DRUG–DRUG INTERACTION CHECK */
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      interactions.forEach(int => {
        if (
          (drugs[i].includes(int[0]) && drugs[j].includes(int[1])) ||
          (drugs[i].includes(int[1]) && drugs[j].includes(int[0]))
        ) {
          output += `
            <div class="${int[2]}">
              <b>${int[2].toUpperCase()} INTERACTION:</b>
              ${drugs[i]} + ${drugs[j]} → ${int[3]}
            </div>`;
        }
      });
    }
  }

  /* DRUG SAFETY WARNINGS */
  drugs.forEach(d => {
    let found = false;

    drugDatabase.forEach(db => {
      if (d.includes(db.name)) {
        found = true;
        output += `
          <div class="major">
            <b>⚠ SAFETY WARNING – ${db.name.toUpperCase()}</b><br>
            <b>Class:</b> ${db.class}<br>
            ${db.foodAvoid.length ? `<b>Avoid foods:</b> ${db.foodAvoid.join(", ")}<br>` : ""}
            ${db.conditionsAvoid.length ? `<b>Avoid in:</b> ${db.conditionsAvoid.join(", ")}<br>` : ""}
            ${db.populationsAvoid.length ? `<b>Avoid for:</b> ${db.populationsAvoid.join(", ")}<br>` : ""}
            <b>Notes:</b> ${db.notes}
          </div>`;
      }
    });

    if (!found) notFoundDrugs.push(d);
  });

  /* AI + GOOGLE AI EXTERNAL SUPPORT FOR UNKNOWN DRUGS */
  notFoundDrugs.forEach(nd => {

    const suggestions = suggestDrugs(nd);

    // Google AI (Gemini-powered) interaction search
    const googleQuery = encodeURIComponent(`drug interaction ${nd}`);
    const googleLink = `https://www.google.com/search?q=${googleQuery}`;

    output += `
      <div class="external-help">
        ⚠ <b>${nd.toUpperCase()}</b> not found in MedCheck GH.<br>

        ${
          suggestions.length
            ? `🤖 <b>AI suggestion:</b> Did you mean → 
               <i>${suggestions.join(", ")}</i><br>`
            : ""
        }

        🔍 <a href="${googleLink}" target="_blank">
          Check <b>${nd}</b> interactions using Google AI
        </a>
      </div>
    `;
  });

  result.innerHTML = output || "🟢 No clinically significant risks detected.";
}