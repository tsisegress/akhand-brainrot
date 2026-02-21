const loadingMessages = [
  "Hacking NASA For Data...",
  "Consulting Ancient Mayan Calendar...",
  "Talking With Elon Musk...",
  "Contacting Einstein's Ghost...",
  "Downloading More RAM...",
  "Asking ChatGPT (it said idk)...",
  "Missed Call Received from Jaadu...",
  "Bypassing The Multiverse...",
  "Calling Your Future Self...",
  "Contacting Area 51 for Intel...",
  "Bribing The Sun For Answers...",
  "Reverse Engineering Your Brain...",
  "Pinging The Universe...",
  "Decrypting Your Aura...",
  "Consulting 47 AI Models...",
  "Waking Up Stephen Hawking...",
  "Reading Your Past Life Data...",
  "Syncing With The Matrix...",
];

const winLines = [
  "🧠 IQ: 1000+",
  "✨ Aura: ∞+",
  "👑 You are the GOAT",
  "🚀 Certified Galaxy Brain",
  "📈 Generational Wealth of Intelligence",
  "🏆 Top 0.0000001% of Humans",
];

const loseLines = [
  "💀 IQ: -847",
  "📉 Aura: -∞",
  "😭 Generational Aura Debt Unlocked",
  "🪦 Your Ancestors Are Disappointed",
  "🔴 Banned From Mensa. Forever.",
  "🧟 Brain Cell Count: 0",
];

let selectedDay = null;

function getTomorrow() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return days[d.getDay()];
}

function selectDay(btn, day) {
  document.querySelectorAll(".day-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedDay = day;
}

function spawnConfetti() {
  const colors = ["#ff4081", "#3949ab", "#43a047", "#ffca28", "#e91e63", "#00bcd4"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.classList.add("confetti-piece");
    el.style.left = Math.random() * 100 + "vw";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = 1.5 + Math.random() * 2 + "s";
    el.style.animationDelay = Math.random() * 1.2 + "s";
    el.style.width = 8 + Math.random() * 8 + "px";
    el.style.height = 8 + Math.random() * 8 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

async function cycleMessages(textEl, count, interval) {
  const shuffled = [...loadingMessages].sort(() => Math.random() - 0.5).slice(0, count);
  for (const msg of shuffled) {
    textEl.classList.add("fade");
    await sleep(250);
    textEl.textContent = msg;
    textEl.classList.remove("fade");
    await sleep(interval - 250);
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function predict() {
  if (!selectedDay) {
    document.querySelector(".card").classList.add("shake");
    setTimeout(() => document.querySelector(".card").classList.remove("shake"), 500);
    return;
  }

  const loader = document.getElementById("loaderArea");
  const result = document.getElementById("resultArea");
  const predictBtn = document.getElementById("predictBtn");
  const loadingText = document.getElementById("loadingText");

  result.classList.remove("visible");
  loader.classList.add("visible");
  predictBtn.disabled = true;

  const msgCount = 10;
  const totalTime = 15000;
  const interval = totalTime / msgCount;

  await cycleMessages(loadingText, msgCount, interval);

  loadingText.classList.add("fade");
  await sleep(300);
  loadingText.textContent = "Answer found. Obviously.";
  loadingText.classList.remove("fade");
  await sleep(700);

  loader.classList.remove("visible");

  const tomorrow = getTomorrow();
  const isCorrect = selectedDay === tomorrow;

  showResult(isCorrect, tomorrow);
  predictBtn.disabled = false;
}

function showResult(isCorrect, tomorrow) {
  const result = document.getElementById("resultArea");
  const emoji = document.getElementById("resultEmoji");
  const headline = document.getElementById("resultHeadline");
  const iqBadge = document.getElementById("resultIQ");
  const stats = document.getElementById("resultStats");

  document.body.classList.remove("win-mode", "lose-mode");

  if (isCorrect) {
    document.body.classList.add("win-mode");
    emoji.textContent = "🧠";
    headline.textContent = "YAY! YOU ACTUALLY GOT IT!";
    iqBadge.textContent = "IQ: 1000 • Aura: ∞+";

    const picks = shuffle([...winLines]).slice(0, 4);
    stats.innerHTML = picks.map(l => `<span>${l}</span>`).join("");

    spawnConfetti();
  } else {
    document.body.classList.add("lose-mode");
    emoji.textContent = "💀";
    headline.textContent = `Nah dude. It's ${tomorrow}.`;
    iqBadge.textContent = "IQ: -847 • Aura: -∞";

    const picks = shuffle([...loseLines]).slice(0, 4);
    stats.innerHTML = picks.map(l => `<span>${l}</span>`).join("");
  }

  result.classList.add("visible");
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function reset() {
  document.getElementById("resultArea").classList.remove("visible");
  document.querySelectorAll(".day-btn").forEach(b => b.classList.remove("selected"));
  document.body.classList.remove("win-mode", "lose-mode");
  selectedDay = null;
}