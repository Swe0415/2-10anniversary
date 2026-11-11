// Ma Ma's anniversary website — relationship began on 12 January 2024.
const START_DATE = new Date(2024, 0, 12, 0, 0, 0);

const welcome = document.getElementById("welcome");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("backgroundMusic");

document.getElementById("openGift").addEventListener("click", async () => {
  mainContent.classList.add("show");
  mainContent.setAttribute("aria-hidden", "false");
  welcome.classList.add("hide");
  welcome.addEventListener("transitionend", (event) => {
    if (event.propertyName === "opacity") welcome.style.display = "none";
  }, { once: true });
  try { await music.play(); }
  catch (error) { console.info("Add music/love.mp3 to enable background music."); }
  startDecorations();
});

function calendarDuration(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months--;
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) { years--; months += 12; }
  return { years, months, days };
}
function updateCounter() {
  const now = new Date();
  const duration = calendarDuration(START_DATE, now);
  const elapsed = Math.max(0, now - START_DATE);
  const totalSeconds = Math.floor(elapsed / 1000);
  document.getElementById("years").textContent = duration.years;
  document.getElementById("months").textContent = duration.months;
  document.getElementById("days").textContent = duration.days;
  document.getElementById("hours").textContent = String(Math.floor(totalSeconds / 3600) % 24).padStart(2, "0");
  document.getElementById("minutes").textContent = String(Math.floor(totalSeconds / 60) % 60).padStart(2, "0");
  document.getElementById("seconds").textContent = String(totalSeconds % 60).padStart(2, "0");
}
updateCounter();
setInterval(updateCounter, 1000);

const photos = [
  { src:"photo1.jpg", caption:"A little moment to keep forever. ♡" },
  { src:"photo2.jpg", caption:"Some memories make my heart smile. 🌷" },
  { src:"photo3.jpg", caption:"The little things mean the most. 💗" },
  { src:"photo4.jpg", caption:"A beautiful memory, just for us. ✨" }
];
let currentPhoto = 0;
const memoryImage = document.getElementById("memoryImage");
const photoCaption = document.getElementById("photoCaption");
const photoNumber = document.getElementById("photoNumber");
const dots = document.getElementById("dots");

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  memoryImage.dataset.index = currentPhoto;
  memoryImage.src = photos[currentPhoto].src;
  memoryImage.alt = `Our memory ${currentPhoto + 1}`;
  photoCaption.textContent = photos[currentPhoto].caption;
  photoNumber.textContent = `${String(currentPhoto + 1).padStart(2,"0")} / ${String(photos.length).padStart(2,"0")}`;
  [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === currentPhoto));
}
photos.forEach((photo, index) => {
  const dot = document.createElement("button");
  dot.type = "button"; dot.className = "dot";
  dot.setAttribute("aria-label", `Show memory ${index + 1}`);
  dot.addEventListener("click", () => { showPhoto(index); restartSlideshow(); });
  dots.appendChild(dot);
});
showPhoto(0);
document.getElementById("prevBtn").addEventListener("click", () => { showPhoto(currentPhoto - 1); restartSlideshow(); });
document.getElementById("nextBtn").addEventListener("click", () => { showPhoto(currentPhoto + 1); restartSlideshow(); });
let slideTimer;
function restartSlideshow() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showPhoto(currentPhoto + 1), 4500);
}
restartSlideshow();

memoryImage.addEventListener("error", () => {
  const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700"><rect width="100%" height="100%" fill="#fff0f5"/><text x="50%" y="46%" text-anchor="middle" fill="#c87996" font-size="74">♡</text><text x="50%" y="56%" text-anchor="middle" fill="#9b7784" font-family="Arial" font-size="22">Add your photo here</text></svg>`;
  memoryImage.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(placeholder);
});

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
envelope.addEventListener("click", () => {
  const opening = letter.hidden;
  letter.hidden = !opening;
  envelope.setAttribute("aria-expanded", String(opening));
  envelope.querySelector("small").textContent = opening ? "Tap to close your letter" : "Open this little note";
  if (opening) letter.scrollIntoView({ behavior:"smooth", block:"center" });
});

const finalBtn = document.getElementById("finalBtn");
const finalMessage = document.getElementById("finalMessage");
finalBtn.addEventListener("click", () => {
  finalMessage.hidden = false;
  finalBtn.textContent = "A little love, always ♡";
  burstHearts(20);
  finalMessage.scrollIntoView({ behavior:"smooth", block:"center" });
});

let decorationsStarted = false;
function startDecorations() {
  if (decorationsStarted) return;
  decorationsStarted = true;
  setInterval(createSparkle, 850);
  setInterval(createFloatingHeart, 1800);
}
function createSparkle() {
  const el = document.createElement("span");
  el.className = "sparkle"; el.textContent = ["✦","✧","⋆"][Math.floor(Math.random()*3)];
  el.style.left = `${Math.random()*100}vw`; el.style.top = "-20px";
  el.style.fontSize = `${10+Math.random()*12}px`;
  document.getElementById("sparkle-layer").appendChild(el);
  setTimeout(() => el.remove(), 5200);
}
function createFloatingHeart() {
  const el = document.createElement("span");
  el.className = "floating-heart"; el.textContent = ["♡","💗","💕"][Math.floor(Math.random()*3)];
  el.style.left = `${Math.random()*100}vw`; el.style.bottom = "-30px";
  el.style.fontSize = `${14+Math.random()*14}px`;
  document.getElementById("heart-layer").appendChild(el);
  setTimeout(() => el.remove(), 6200);
}
function burstHearts(count) { for (let i=0;i<count;i++) setTimeout(createFloatingHeart, i*100); }


// Return to the anniversary home section from the closing panel.
document.querySelector(".back-to-start").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("home").scrollIntoView({ behavior: "smooth", block: "start" });
});
