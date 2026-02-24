const skills = [
  "lumenluonti", "muuttoapu", "koiranhoito", "kahvila", "hyllytys", "siivous",
  "ruohonleikkuu", "kassa", "varasto", "tapahtuma-avustus", "keittiöapu", "asiakaspalvelu"
];

const names = [
  "Aino", "Miro", "Sara", "Elias", "Nelli", "Onni", "Jasmin", "Nooa", "Veera", "Arttu",
  "Lotta", "Joona", "Sanni", "Leo", "Emilia", "Oskari"
];

const employers = [
  "Lumisankarit Espoo", "Leppävaaran Pihakaverit", "Nopea Muutto Espoo", "Kahvila Tapiola", "FreshMarket Espoo",
  "Siisti Koti Espoo", "TapahtumaTiimi Otaniemi", "Koiraklubi Matinkylä", "Varasto24 Espoo", "Senioriapu Espoo"
];

const espooAreas = ["Leppävaara", "Matinkylä", "Tapiola", "Otaniemi", "Espoonlahti", "Kivenlahti", "Niittykumpu"];

let currentJobs = [];
let swipeIndex = 0;
let accepted = 0;
let rejected = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sample(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function generateSeekers(count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: `s${i + 1}`,
    name: names[randomInt(0, names.length - 1)],
    age: randomInt(18, 27),
    city: "Espoo",
    area: sample(espooAreas, 1)[0],
    availability: sample(["arkiaamut", "arki-illat", "viikonloppu", "lyhyt varoitusaika"], 2),
    skills: sample(skills, randomInt(2, 4))
  }));
}

function generateJobs(count = 8) {
  return Array.from({ length: count }, (_, i) => ({
    id: `j${i + 1}`,
    city: "Espoo",
    employer: employers[randomInt(0, employers.length - 1)],
    title: sample([
      "Lumenluontikeikka", "Muuttoapu iltapäiväksi", "Koiranulkoilutus", "Hyllyttäjä viikonlopuksi",
      "Kahvilatyöntekijä", "Tapahtuma-avustaja", "Pikasiivous", "Varastokeikka"
    ], 1)[0],
    pay: randomInt(11, 18),
    required: sample(skills, randomInt(1, 3)),
    shift: sample(["aamu", "ilta", "viikonloppu"], 1)[0],
    area: sample(espooAreas, 1)[0]
  }));
}

function score(seeker, job) {
  const skillOverlap = seeker.skills.filter((s) => job.required.includes(s)).length;
  const location = seeker.area === job.area ? 2 : 0;
  const time = seeker.availability.some((a) => a.includes(job.shift) || (job.shift === "viikonloppu" && a === "viikonloppu")) ? 2 : 0;
  return skillOverlap * 3 + location + time;
}

function match(seekers, jobs, topN) {
  const all = [];
  seekers.forEach((s) => {
    jobs.forEach((j) => {
      const sScore = score(s, j);
      if (sScore > 0) {
        all.push({ seeker: s, job: j, score: sScore });
      }
    });
  });
  return all.sort((a, b) => b.score - a.score).slice(0, topN);
}

function renderCard(el, html) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = html;
  el.appendChild(div);
}

function initApp() {
  const seekersEl = document.querySelector("#seekers");
  const employersEl = document.querySelector("#employers");
  const matchesEl = document.querySelector("#matches");
  const btn = document.querySelector("#generateDataBtn");
  const matchCountEl = document.querySelector("#matchCount");
  const swipeCardEl = document.querySelector("#swipeCard");
  const swipeStatsEl = document.querySelector("#swipeStats");
  const acceptBtn = document.querySelector("#acceptBtn");
  const rejectBtn = document.querySelector("#rejectBtn");

  if (!seekersEl || !employersEl || !matchesEl || !btn || !matchCountEl || !swipeCardEl || !swipeStatsEl || !acceptBtn || !rejectBtn) {
    console.error("KeikkaMatch: kaikkia tarvittavia DOM-elementtejä ei löytynyt.");
    return;
  }

  function renderSwipeCard() {
    const job = currentJobs[swipeIndex];
    if (!job) {
      swipeCardEl.innerHTML = "<strong>Ei enempää keikkoja juuri nyt.</strong><div class='small'>Generoi uusi datasetti nähdäksesi lisää.</div>";
    } else {
      swipeCardEl.innerHTML = `
        <div class="pill">${swipeIndex + 1}/${currentJobs.length}</div>
        <strong>${job.title}</strong>
        <div class="small">${job.employer} · ${job.city}, ${job.area}</div>
        <div class="small">${job.pay} €/h · vuoro: ${job.shift}</div>
        <div class="tags">${job.required.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
      `;
    }
    swipeStatsEl.textContent = `Tykkäykset: ${accepted} · Ohitukset: ${rejected}`;
  }

  function swipe(direction) {
    if (!currentJobs[swipeIndex]) return;
    if (direction === "accept") accepted += 1;
    if (direction === "reject") rejected += 1;
    swipeIndex += 1;
    renderSwipeCard();
  }

  function render() {
    const seekers = generateSeekers();
    const jobs = generateJobs();
    const matches = match(seekers, jobs, Number(matchCountEl.value));

    currentJobs = jobs;
    swipeIndex = 0;
    accepted = 0;
    rejected = 0;

    seekersEl.innerHTML = "";
    employersEl.innerHTML = "";
    matchesEl.innerHTML = "";

    seekers.forEach((s) => {
      renderCard(seekersEl, `
        <strong>${s.name}, ${s.age}</strong>
        <div class="small">${s.city}, ${s.area} · Saatavuus: ${s.availability.join(", ")}</div>
        <div class="tags">${s.skills.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
      `);
    });

    jobs.forEach((j) => {
      renderCard(employersEl, `
        <strong>${j.title}</strong>
        <div class="small">${j.employer} · ${j.city}, ${j.area} · ${j.pay} €/h · vuoro: ${j.shift}</div>
        <div class="tags">${j.required.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
      `);
    });

    matches.forEach((m) => {
      renderCard(matchesEl, `
        <div><strong>${m.seeker.name}</strong> ↔ <strong>${m.job.employer}</strong></div>
        <div class="small">${m.job.title} (${m.job.city}, ${m.job.area})</div>
        <div class="score">Match score: ${m.score}</div>
      `);
    });

    renderSwipeCard();
  }

  btn.addEventListener("click", render);
  matchCountEl.addEventListener("change", render);
  acceptBtn.addEventListener("click", () => swipe("accept"));
  rejectBtn.addEventListener("click", () => swipe("reject"));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") swipe("accept");
    if (e.key === "ArrowLeft") swipe("reject");
  });

  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
