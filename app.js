const skills = [
  "lumenluonti", "muuttoapu", "koiranhoito", "kahvila", "hyllytys", "siivous",
  "ruohonleikkuu", "kassa", "varasto", "tapahtuma-avustus", "keittiöapu", "asiakaspalvelu"
];

const names = [
  "Aino", "Miro", "Sara", "Elias", "Nelli", "Onni", "Jasmin", "Nooa", "Veera", "Arttu",
  "Lotta", "Joona", "Sanni", "Leo", "Emilia", "Oskari", "Tiina", "Janne", "Marja", "Petri"
];

const employers = [
  "Lumisankarit Espoo", "Leppävaaran Pihakaverit", "Nopea Muutto Espoo", "Kahvila Tapiola", "FreshMarket Espoo",
  "Siisti Koti Espoo", "TapahtumaTiimi Otaniemi", "Koiraklubi Matinkylä", "Varasto24 Espoo", "Senioriapu Espoo"
];

const espooAreas = ["Leppävaara", "Matinkylä", "Tapiola", "Otaniemi", "Espoonlahti", "Kivenlahti", "Niittykumpu"];

const modeCopy = {
  seeker: {
    hero: "Työnhakijan näkymä: löydä sinulle sopivat keikkatyöt Espoossa",
    primaryButton: "Päivitä suositukset",
    swipeTitle: "Sinulle ehdotettu keikka",
    profileTitle: "Sinun profiilisi",
    listTitle: "Sinulle sopivia keikkoja",
    matchesTitle: "Parhaat osumat sinulle",
    acceptedLabel: "Kiinnostavat",
    rejectedLabel: "Ohitetut",
    empty: "Ei enempää ehdotuksia juuri nyt.",
    emptyHint: "Päivitä suositukset nähdäksesi lisää.",
    pillSuffix: "ehdotusta"
  },
  hirer: {
    hero: "Työvoimaa hakevan näkymä: löydä sopivimmat tekijät keikoille Espoossa",
    primaryButton: "Päivitä hakijat",
    swipeTitle: "Sinulle ehdotettu tekijä",
    profileTitle: "Sinun työpaikkatarpeesi",
    listTitle: "Sinulle sopivia tekijöitä",
    matchesTitle: "Parhaat osumat sinulle",
    acceptedLabel: "Kiinnostavat tekijät",
    rejectedLabel: "Ohitetut tekijät",
    empty: "Ei enempää tekijäehdotuksia juuri nyt.",
    emptyHint: "Päivitä hakijat nähdäksesi lisää.",
    pillSuffix: "ehdokasta"
  }
};

let currentCards = [];
let swipeIndex = 0;
let accepted = 0;
let rejected = 0;
let currentMode = "seeker";

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
    age: randomInt(15, 25),
    city: "Espoo",
    area: sample(espooAreas, 1)[0],
    availability: sample(["arkiaamut", "arki-illat", "viikonloppu", "lyhyellä varoitusajalla"], 2),
    skills: sample(skills, randomInt(2, 5))
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
    pay: randomInt(11, 20),
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
  const heroTextEl = document.querySelector("#heroText");
  const swipeTitleEl = document.querySelector("#swipeTitle");
  const profileTitleEl = document.querySelector("#profileTitle");
  const listTitleEl = document.querySelector("#listTitle");
  const matchesTitleEl = document.querySelector("#matchesTitle");
  const seekerModeBtn = document.querySelector("#seekerModeBtn");
  const hirerModeBtn = document.querySelector("#hirerModeBtn");

  if (!seekersEl || !employersEl || !matchesEl || !btn || !matchCountEl || !swipeCardEl || !swipeStatsEl || !acceptBtn || !rejectBtn || !heroTextEl || !swipeTitleEl || !profileTitleEl || !listTitleEl || !matchesTitleEl || !seekerModeBtn || !hirerModeBtn) {
    console.error("KeikkaMatch: kaikkia tarvittavia DOM-elementtejä ei löytynyt.");
    return;
  }

  function updateModeTexts() {
    const copy = modeCopy[currentMode];
    heroTextEl.textContent = copy.hero;
    btn.textContent = copy.primaryButton;
    swipeTitleEl.textContent = copy.swipeTitle;
    profileTitleEl.textContent = copy.profileTitle;
    listTitleEl.textContent = copy.listTitle;
    matchesTitleEl.textContent = copy.matchesTitle;
    seekerModeBtn.classList.toggle("active", currentMode === "seeker");
    hirerModeBtn.classList.toggle("active", currentMode === "hirer");
  }

  function renderSwipeCard() {
    const copy = modeCopy[currentMode];
    const card = currentCards[swipeIndex];
    if (!card) {
      swipeCardEl.innerHTML = `<strong>${copy.empty}</strong><div class='small'>${copy.emptyHint}</div>`;
    } else if (currentMode === "seeker") {
      swipeCardEl.innerHTML = `
        <div class="pill">${swipeIndex + 1}/${currentCards.length} ${copy.pillSuffix}</div>
        <strong>${card.title}</strong>
        <div class="small">${card.employer} · ${card.city}, ${card.area}</div>
        <div class="small">${card.pay} €/h · vuoro: ${card.shift}</div>
        <div class="tags">${card.required.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
      `;
    } else {
      swipeCardEl.innerHTML = `
        <div class="pill">${swipeIndex + 1}/${currentCards.length} ${copy.pillSuffix}</div>
        <strong>${card.name}, ${card.age}</strong>
        <div class="small">${card.city}, ${card.area} · Saatavuus: ${card.availability.join(", ")}</div>
        <div class="tags">${card.skills.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
      `;
    }
    swipeStatsEl.textContent = `${copy.acceptedLabel}: ${accepted} · ${copy.rejectedLabel}: ${rejected}`;
  }

  function swipe(direction) {
    if (!currentCards[swipeIndex]) return;
    if (direction === "accept") accepted += 1;
    if (direction === "reject") rejected += 1;
    swipeIndex += 1;
    renderSwipeCard();
  }

  function renderSeekerView() {
    const seekers = generateSeekers();
    const jobs = generateJobs();
    const currentUser = seekers[0];
    const topMatches = match([currentUser], jobs, Number(matchCountEl.value));

    currentCards = jobs.sort((a, b) => score(currentUser, b) - score(currentUser, a));

    renderCard(seekersEl, `
      <strong>${currentUser.name}, ${currentUser.age}</strong>
      <div class="small">${currentUser.city}, ${currentUser.area} · Saatavuus: ${currentUser.availability.join(", ")}</div>
      <div class="tags">${currentUser.skills.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
    `);

    currentCards.slice(0, 6).forEach((job) => {
      const matchScore = score(currentUser, job);
      renderCard(employersEl, `
        <strong>${job.title}</strong>
        <div class="small">${job.employer} · ${job.city}, ${job.area} · ${job.pay} €/h · vuoro: ${job.shift}</div>
        <div class="tags">${job.required.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
        <div class="score">Sopivuuspisteet sinulle: ${matchScore}</div>
      `);
    });

    topMatches.forEach((m) => {
      renderCard(matchesEl, `
        <div><strong>${m.job.title}</strong> · <strong>${m.job.employer}</strong></div>
        <div class="small">${m.job.city}, ${m.job.area} · ${m.job.pay} €/h</div>
        <div class="score">Top-osuma sinulle: ${m.score}</div>
      `);
    });
  }

  function renderHirerView() {
    const jobs = generateJobs();
    const seekers = generateSeekers(12);
    const currentJob = jobs[0];
    const rankedCandidates = seekers
      .map((seeker) => ({ seeker, fit: score(seeker, currentJob) }))
      .sort((a, b) => b.fit - a.fit);

    currentCards = rankedCandidates.map((x) => x.seeker);

    renderCard(seekersEl, `
      <strong>${currentJob.title}</strong>
      <div class="small">${currentJob.employer} · ${currentJob.city}, ${currentJob.area}</div>
      <div class="small">Tarjous: ${currentJob.pay} €/h · vuoro: ${currentJob.shift}</div>
      <div class="tags">${currentJob.required.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
    `);

    rankedCandidates.slice(0, 6).forEach(({ seeker, fit }) => {
      renderCard(employersEl, `
        <strong>${seeker.name}, ${seeker.age}</strong>
        <div class="small">${seeker.city}, ${seeker.area} · Saatavuus: ${seeker.availability.join(", ")}</div>
        <div class="tags">${seeker.skills.map((x) => `<span class="tag">${x}</span>`).join("")}</div>
        <div class="score">Sopivuuspisteet tähän keikkaan: ${fit}</div>
      `);
    });

    rankedCandidates.slice(0, Number(matchCountEl.value)).forEach(({ seeker, fit }) => {
      renderCard(matchesEl, `
        <div><strong>${seeker.name}, ${seeker.age}</strong></div>
        <div class="small">${seeker.city}, ${seeker.area}</div>
        <div class="score">Top-ehdokas tälle keikalle: ${fit}</div>
      `);
    });
  }

  function render() {
    swipeIndex = 0;
    accepted = 0;
    rejected = 0;

    seekersEl.innerHTML = "";
    employersEl.innerHTML = "";
    matchesEl.innerHTML = "";

    updateModeTexts();

    if (currentMode === "seeker") {
      renderSeekerView();
    } else {
      renderHirerView();
    }

    renderSwipeCard();
  }

  btn.addEventListener("click", render);
  matchCountEl.addEventListener("change", render);
  acceptBtn.addEventListener("click", () => swipe("accept"));
  rejectBtn.addEventListener("click", () => swipe("reject"));

  seekerModeBtn.addEventListener("click", () => {
    currentMode = "seeker";
    render();
  });

  hirerModeBtn.addEventListener("click", () => {
    currentMode = "hirer";
    render();
  });

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
