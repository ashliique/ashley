const letterDialog = document.querySelector('#letter-dialog');
const closeLetterButton = document.querySelector('#close-letter');
let lastLetterOpener = null;

function openLetter(event) {
  lastLetterOpener = event.currentTarget;
  letterDialog.showModal();
}

document.querySelector('#open-letter').addEventListener('click', openLetter);
document.querySelector('#open-letter-again').addEventListener('click', openLetter);
closeLetterButton.addEventListener('click', () => letterDialog.close());
letterDialog.addEventListener('click', (event) => {
  if (event.target === letterDialog) letterDialog.close();
});
letterDialog.addEventListener('close', () => lastLetterOpener?.focus());

const notes = [
  'You make my favorite moments feel even brighter.',
  'I hope something lovely finds you today. You deserve that.',
  'I’m so lucky I get to love you.',
  'If I could, I’d send you a cup of tea (not chai because unhealthy) and the longest hug.',
  'You are my favorite hello, every single time.',
  'Even from far away, you make my days feel warmer.',
  'I can’t wait for all the little everyday moments we’ll share.',
  'I love the way a simple message from you can make my whole day.',
  'You make the world feel a little gentler to me.',
  'I’m cheering for you, even on the quiet days.',
  'I love hearing about the little things that happened in your day.',
  'Your happiness matters to me so much.',
  'If today is hard, you don’t have to carry it alone.',
  'I would choose another thousand conversations with you.',
  'I love that we can be silly together.',
  'Somehow, thinking of you feels like sunshine finding a window.',
  'I hope you know how much I look forward to your messages.',
  'I’m grateful for every little piece of your world you share with me.',
  'There is no perfect version of a day I need from you. I just love you.',
  'I wish I could hold your hand right now.',
  'You are such a lovely part of my life.',
  'I love making plans for all our little someday moments.',
  'You don’t have to earn my tenderness. It is already yours.',
  'The thought of seeing you makes my heart feel at home.',
  'I love you on bright days, rainy days, and everything between.',
  'I’m right here, and I’m not going anywhere.',
  'You make ordinary things feel like memories I want to keep.',
  'No matter the distance, you are so close to my heart.'
];

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

let noteDeck = shuffled(notes);
let previousNote = null;
document.querySelector('#pick-note').addEventListener('click', () => {
  if (noteDeck.length === 0) {
    noteDeck = shuffled(notes);
    if (noteDeck.at(-1) === previousNote) [noteDeck[0], noteDeck[noteDeck.length - 1]] = [noteDeck.at(-1), noteDeck[0]];
  }
  previousNote = noteDeck.pop();
  document.querySelector('#note-output').textContent = `“${previousNote}”`;
});

const reasons = [
  'Your laugh makes even an ordinary day feel like my favorite one.',
  'The way you care so deeply is one of my favorite things about you.',
  'Being myself with you feels like coming home.',
  'You make room for little joys, even in busy days.',
  'I love how easy it is to be silly with you.',
  'Your kindness stays with me long after we talk.',
  'You remember little things, and it makes me feel seen.',
  'I adore the stories you tell me about your day.',
  'You make me want to notice more beautiful things.',
  'I love the way we can talk about everything and nothing.',
  'You make quiet moments feel comfortable.',
  'Your heart is one of my favorite places to be.',
  'You bring warmth into my life just by being in it.',
  'I love imagining all the little adventures ahead of us.',
  'You make being together feel wonderfully easy.'
];
let reasonDeck = shuffled(reasons);
const reasonButtons = [...document.querySelectorAll('.reason-button')];

function dealReasons() {
  if (reasonDeck.length < 3) reasonDeck = shuffled(reasons);
  reasonButtons.forEach((button, index) => {
    button.dataset.reason = reasonDeck.pop();
    button.classList.remove('revealed');
    button.querySelector('.reason-text').textContent = 'tap to reveal';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', `Reveal the ${['first', 'second', 'third'][index]} reason`);
  });
}

reasonButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const revealed = button.classList.toggle('revealed');
    button.querySelector('.reason-text').textContent = revealed ? button.dataset.reason : 'tap to reveal';
    button.setAttribute('aria-pressed', String(revealed));
    button.setAttribute('aria-label', revealed ? 'Hide this reason' : `Reveal the ${['first', 'second', 'third'][index]} reason`);
  });
});
document.querySelector('#new-reasons').addEventListener('click', dealReasons);
dealReasons();

const hugButton = document.querySelector('#send-hug');
const hugOutput = document.querySelector('#hug-output');
const hugs = ['A big, cozy hug from me to you ♡', 'Another one. I have endless hugs for you ♡', 'Keeping you close in my heart ♡'];
let hugIndex = 0;
let surpriseTimer;
let rainTimer;

function showerHearts() {
  const rain = document.querySelector('#heart-rain');
  const surprise = document.querySelector('#hug-surprise');
  clearTimeout(surpriseTimer);
  clearTimeout(rainTimer);
  rain.replaceChildren();
  for (let i = 0; i < 48; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'falling-heart';
    heart.textContent = i % 5 === 0 ? '✦' : '♥';
    heart.style.setProperty('--left', `${Math.random() * 100}%`);
    heart.style.setProperty('--size', `${16 + Math.random() * 27}px`);
    heart.style.setProperty('--duration', `${3.2 + Math.random() * 2.2}s`);
    heart.style.setProperty('--delay', `${Math.random() * 1.5}s`);
    heart.style.setProperty('--heart-color', ['#d86683', '#f5a8b9', '#f1c66f', '#a5425a'][i % 4]);
    rain.append(heart);
  }
  hugOutput.textContent = 'Surprise! You have unlocked my endless supply of hugs. ♡';
  hugOutput.classList.add('during-surprise');
  surprise.classList.add('visible');
  surpriseTimer = setTimeout(() => {
    surprise.classList.remove('visible');
    hugOutput.textContent = 'My hugs are yours whenever you need them ♡';
    hugOutput.classList.remove('during-surprise');
  }, 5200);
  rainTimer = setTimeout(() => rain.replaceChildren(), 6500);
}

hugButton.addEventListener('click', () => {
  hugOutput.textContent = hugs[hugIndex % hugs.length];
  hugIndex += 1;
  hugButton.classList.remove('pop');
  void hugButton.offsetWidth;
  hugButton.classList.add('pop');
  if (hugIndex % 7 === 0) showerHearts();
});

const scrapbookPages = [
  {
    image: 'assets/photos/childhood-smile.jpg',
    alt: 'A childhood photo with a playful sideways smile',
    frame: 'landscape',
    title: 'Little mischief',
    caption: 'That sideways smile gets me every time. You look like you have a secret joke.'
  },
  {
    image: 'assets/photos/seaside-childhood.jpg',
    alt: 'A childhood photo by the sea in a green and pink outfit',
    frame: 'seaside',
    title: 'The seaside cutie',
    caption: 'I wish I could ask you about this day by the sea. That smile makes me want to hear the whole story. And sorry for cropping bro out.'
  },
  {
    image: 'assets/photos/silly-selfie.jpg',
    alt: 'A playful close-up selfie in purple light',
    frame: 'portrait',
    title: 'The silly one',
    caption: 'I can almost hear you laughing when I look at this. I adore this playful side of you.'
  },
  {
    image: 'assets/photos/heart-filter.jpg',
    alt: 'A selfie with glasses and little heart decorations',
    frame: 'portrait',
    title: 'Your kind of magic',
    caption: 'I love your make-up, and how you made even a quick selfie feel playful and unmistakably yours.'
  },
  {
    image: 'assets/photos/cozy-onesie.jpg',
    alt: 'Ashley taking a mirror photo in her Rilakkuma onesie',
    frame: 'portrait',
    title: 'My favorite one',
    caption: 'I love this photo because you look so playful and cozy in this onesie, and also for the other obvious reasons you know 😜.'
  },
  {
    image: 'assets/photos/peace-sign.jpg',
    alt: 'A selfie with glasses and a peace sign',
    frame: 'portrait',
    title: 'PEACE',
    caption: 'Look at my girl being all sassy and not giving a shit... but hey, peace!'
  },
  {
    image: 'assets/photos/golden-glasses.jpg',
    alt: 'A close-up selfie with glasses in warm light',
    frame: 'portrait',
    title: 'When I miss you',
    caption: 'I come back to this one when I miss you. I just want to peck on your puckered lips ♡'
  }
];

const scrapbookArea = document.querySelector('.scrapbook-area');
const scrapbookBook = document.querySelector('#scrapbook-book');
const bookContent = document.querySelector('#book-content');
const coverMarkup = bookContent.innerHTML;
const previousPage = document.querySelector('#previous-page');
const nextPage = document.querySelector('#next-page');
const pageIndicator = document.querySelector('#page-indicator');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let pageIndex = 0;
let turningPage = false;
let touchStart = null;

function updatePageControls() {
  previousPage.disabled = pageIndex === 0 || turningPage;
  nextPage.disabled = pageIndex === scrapbookPages.length || turningPage;
  previousPage.textContent = pageIndex === 1 ? '← Cover' : '← Previous';
  nextPage.textContent = pageIndex === 0 ? 'Open book →' : 'Next page →';
  pageIndicator.textContent = pageIndex === 0
    ? `Cover · ${scrapbookPages.length} pages inside`
    : `Page ${pageIndex} of ${scrapbookPages.length}`;
}

function renderPage(index) {
  pageIndex = index;
  scrapbookBook.classList.toggle('is-cover', pageIndex === 0);
  if (pageIndex === 0) {
    bookContent.innerHTML = coverMarkup;
  } else {
    const page = scrapbookPages[pageIndex - 1];
    bookContent.innerHTML = `
      <div class="book-spread">
        <div class="spread-photo-page">
          <div class="spread-photo-frame frame-${page.frame}"><img src="${page.image}" alt="${page.alt}" /></div>
        </div>
        <div class="spread-note-page">
          <span class="spread-ornament" aria-hidden="true">✦ &nbsp; ♡ &nbsp; ✦</span>
          <span class="spread-number">page ${String(pageIndex).padStart(2, '0')}</span>
          <h3>${page.title}</h3>
          <p>${page.caption}</p>
        </div>
      </div>`;
  }
  updatePageControls();
}

function turnTo(index) {
  if (turningPage || index < 0 || index > scrapbookPages.length || index === pageIndex) return;
  scrapbookBook.focus({ preventScroll: true });
  if (reducedMotion.matches) {
    renderPage(index);
    return;
  }

  turningPage = true;
  updatePageControls();
  bookContent.classList.add(index > pageIndex ? 'slide-next' : 'slide-previous');
  let finished = false;
  const finishTurn = () => {
    if (finished) return;
    finished = true;
    bookContent.classList.remove('slide-next', 'slide-previous');
    turningPage = false;
    updatePageControls();
  };
  window.setTimeout(() => renderPage(index), 260);
  bookContent.addEventListener('animationend', finishTurn, { once: true });
  window.setTimeout(finishTurn, 700);
}

nextPage.addEventListener('click', () => turnTo(pageIndex + 1));
previousPage.addEventListener('click', () => turnTo(pageIndex - 1));
bookContent.addEventListener('click', (event) => {
  if (event.target.closest('.cover-open')) turnTo(1);
});
scrapbookArea.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    turnTo(pageIndex + 1);
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    turnTo(pageIndex - 1);
  }
});
scrapbookBook.addEventListener('touchstart', (event) => {
  touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
}, { passive: true });
scrapbookBook.addEventListener('touchend', (event) => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) {
    turnTo(pageIndex + (dx < 0 ? 1 : -1));
  }
  touchStart = null;
}, { passive: true });

scrapbookPages.forEach((page) => { const photo = new Image(); photo.src = page.image; });
updatePageControls();
