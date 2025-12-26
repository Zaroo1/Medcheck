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
   (100 interactions – Ghana relevant)
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
   INTERACTION CHECK FUNCTION
========================= */
function checkInteraction() {
  const d1 = document.getElementById("drug1").value.toLowerCase().trim();
  const d2 = document.getElementById("drug2").value.toLowerCase().trim();
  const result = document.getElementById("result");

  if (!d1 || !d2) {
    result.innerHTML = "⚠ Please enter two drugs.";
    result.style.background = "#ffeeba";
    return;
  }

  for (let i of interactions) {
    if (
      (d1.includes(i[0]) && d2.includes(i[1])) ||
      (d1.includes(i[1]) && d2.includes(i[0]))
    ) {
      let color =
        i[2] === "major" ? "#f8d7da" :
        i[2] === "moderate" ? "#fff3cd" :
        "#d4edda";

      result.innerHTML = `<strong>${i[2].toUpperCase()} INTERACTION:</strong> ${i[3]}`;
      result.style.background = color;
      return;
    }
  }

  result.innerHTML = "🟢 No major interaction found. Use clinical judgment.";
  result.style.background = "#d4edda";
}