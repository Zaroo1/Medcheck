/* =========================
   TAB SWITCHING LOGIC
========================= */
function openTab(tabId, btn = null) {
  const tabs = document.querySelectorAll(".tab");
  const buttons = document.querySelectorAll(".tab-btn");

  // Hide all tabs
  tabs.forEach(tab => tab.classList.remove("active"));

  // Remove active class from all buttons
  buttons.forEach(button => button.classList.remove("active"));

  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Highlight clicked button (if applicable)
  if (btn) {
    btn.classList.add("active");
  }
}

/* =========================
   DRUG INTERACTION DATABASE
========================= */
const interactions = [
  // 🔴 MAJOR
  ["warfarin","metronidazole","major","Increased bleeding risk. Avoid combination or monitor INR closely."],
  ["warfarin","ciprofloxacin","major","Enhanced anticoagulant effect. Monitor INR."],
  ["warfarin","erythromycin","major","Increased bleeding risk."],
  ["warfarin","aspirin","major","High bleeding risk. Avoid unless supervised."],
  ["enalapril","spironolactone","major","Risk of hyperkalemia. Monitor potassium levels."],
  ["lisinopril","potassium chloride","major","Severe hyperkalemia risk."],
  ["sildenafil","nitrates","major","Severe hypotension. Contraindicated."],
  ["rifampicin","oral contraceptives","major","Reduced contraceptive efficacy."],
  ["carbamazepine","oral contraceptives","major","Contraceptive failure."],
  ["phenytoin","oral contraceptives","major","Reduced contraceptive effectiveness."],
  ["metformin","contrast media","major","Risk of lactic acidosis."],
  ["theophylline","ciprofloxacin","major","Increased theophylline toxicity."],
  ["digoxin","verapamil","major","Increased digoxin concentration."],
  ["digoxin","amiodarone","major","Risk of digoxin toxicity."],
  ["clarithromycin","simvastatin","major","Risk of rhabdomyolysis."],
  ["erythromycin","simvastatin","major","Severe muscle toxicity."],
  ["ketoconazole","simvastatin","major","Contraindicated combination."],
  ["linezolid","ssris","major","Risk of serotonin syndrome."],
  ["tramadol","ssris","major","Seizure and serotonin syndrome risk."],
  ["metronidazole","alcohol","major","Disulfiram-like reaction."],

  // 🟠 MODERATE
  ["ibuprofen","amlodipine","moderate","Reduced antihypertensive effect."],
  ["diclofenac","enalapril","moderate","Reduced blood pressure control."],
  ["nsaids","diuretics","moderate","Reduced diuretic effect."],
  ["metformin","cimetidine","moderate","Increased metformin levels."],
  ["ciprofloxacin","antacids","moderate","Reduced antibiotic absorption."],
  ["tetracycline","milk","moderate","Reduced absorption."],
  ["iron","tetracycline","moderate","Reduced antibiotic effectiveness."],
  ["iron","levothyroxine","moderate","Reduced thyroid hormone absorption."],
  ["omeprazole","clopidogrel","moderate","Reduced antiplatelet effect."],
  ["beta blockers","verapamil","moderate","Risk of bradycardia."],

  // 🟢 MINOR
  ["paracetamol","amoxicillin","minor","No clinically significant interaction."],
  ["vitamin c","iron","minor","Enhanced iron absorption."],
  ["ibuprofen","food","minor","Reduced gastric irritation."],
  ["cetirizine","paracetamol","minor","Safe combination."],
  ["antacids","iron","minor","Reduced iron absorption."]
];

/* =========================
   INTERACTION CHECK FUNCTION (2–6 DRUGS)
========================= */
function checkInteraction() {
  const result = document.getElementById("result");
  const drugs = [];

  // Collect entered drugs (ignore empty)
  for (let i = 1; i <= 6; i++) {
    const value = document.getElementById(`drug${i}`).value.toLowerCase().trim();
    if (value) drugs.push(value);
  }

  if (drugs.length < 2) {
    result.innerHTML = "⚠ Please enter at least two drugs.";
    result.style.background = "#ffeeba";
    return;
  }

  const foundInteractions = [];

  // Check all pairs
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      for (let inter of interactions) {
        if (
          (drugs[i].includes(inter[0]) && drugs[j].includes(inter[1])) ||
          (drugs[i].includes(inter[1]) && drugs[j].includes(inter[0]))
        ) {
          foundInteractions.push({
            pair: [drugs[i], drugs[j]],
            severity: inter[2],
            message: inter[3]
          });
        }
      }
    }
  }

  // Display results
  if (foundInteractions.length > 0) {
    let html = "";
    foundInteractions.forEach(inter => {
      let color =
        inter.severity === "major" ? "#f8d7da" :
        inter.severity === "moderate" ? "#fff3cd" :
        "#d4edda";

      html += `<div style="padding:12px; border-left:5px solid #003366; margin-bottom:10px; background:${color}">
        <strong>${inter.severity.toUpperCase()} INTERACTION:</strong>
        ${inter.pair.join(" + ")} → ${inter.message}
      </div>`;
    });
    result.innerHTML = html;
  } else {
    result.innerHTML = "🟢 No major interaction found. Use clinical judgment.";
    result.style.background = "#d4edda";
  }
}