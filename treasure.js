(() => {
  const body = document.querySelector('#treasure-body');
  const status = document.querySelector('#treasure-status');
  if (!body || !status) return;

  const symbols = [
    { id: 'heart', glyph: '♥', name: 'heart', color: '#b95974' },
    { id: 'moon', glyph: '☾', name: 'moon', color: '#79618a' },
    { id: 'star', glyph: '✦', name: 'star', color: '#ac7533' },
    { id: 'flower', glyph: '✿', name: 'flower', color: '#b65369' },
    { id: 'music', glyph: '♫', name: 'music note', color: '#527d75' }
  ];
  const objects = [
    { id: 'ticket', icon: '🎟️', name: 'a folded ticket', inspect: 'Read the tiny print', secret: 'film', notes: [
      'The corners are bent. Someone was using it as a bookmark instead of watching the film.',
      'Two seats, one film. Sounds straightforward. With us, apparently it is not.',
      'A ticket with “finish the movie this time” written on the back. Ambitious.',
      'The film has a running time. Our interruptions do not.'
    ] },
    { id: 'notebook', icon: '📒', name: 'my notebook', inspect: 'Check the doodle', secret: 'cartoon', notes: [
      'It started as a to-do list. Your name has somehow ended up in the margin.',
      'A page of very important thoughts. Half of them are just things I want to tell you.',
      'My handwriting is terrible here. In my defense, I was distracted.',
      'There is a doodle under the corner of the page. It looks suspiciously familiar.'
    ] },
    { id: 'clock', icon: '⏰', name: 'a small clock', inspect: 'Check the alarm', secret: 'numbers', notes: [
      'I set an alarm for bedtime. You and I have historically ignored this concept.',
      'The clock is judging our ability to say goodnight.',
      'Someone has snoozed this. Repeatedly. I blame the conversation.',
      'The time is completely ordinary. The alarm label is less ordinary.'
    ] },
    { id: 'mug', icon: '☕', name: 'a warm mug', notes: [
      'I would tell you to be careful, then immediately burn my own tongue.',
      'A heart in the foam. I was trying to be subtle. I failed.',
      'I picked the mug with the least sensible handle. Naturally, it is now my favorite.',
      'There is enough for two. You get the nice mug; I get the chipped one.',
      'chai. your comfort drink, my worst nightmare. somehow we are still making this relationship work.'
    ] },
    { id: 'bear', icon: '🧸', name: 'a sleepy bear', inspect: 'Look behind its ear', secret: 'bear', notes: [
      'The bear looks very pleased with itself. It has been keeping a secret.',
      'A tiny bear with an extremely serious job: looking after something for you.',
      'Someone put the bear in charge. It has made no useful decisions.',
      'A sleepy little face. I trust it with your note, though perhaps I should not.'
    ] },
    { id: 'headphones', icon: '🎧', name: 'headphones', inspect: 'Check the queued song', secret: 'music', notes: [
      'One ear for you, one for me. We will absolutely disagree about the next song.',
      'I put these down to answer you and forgot what I was listening to.',
      'The playlist was meant to help me focus. Then you messaged.',
      'These have heard some ridiculously long calls. They deserve a day off.'
    ] },
    { id: 'plant', icon: '🌱', name: 'the little plant', notes: [
      'This plant has heard me mention you so often that it probably knows your name.',
      'I checked under the pot. Excellent detective work, mildly questionable gardening.',
      'I tried to hide something here without making a mess. You can judge my success.',
      'The plant is innocent. The note tucked under it is my fault.'
    ] },
    { id: 'sock', icon: '🧦', name: 'a stray sock', notes: [
      'A sock, in a place where a sock has no business being. I have no explanation.',
      'I am delighted that you checked the sock. Very thorough of you.',
      'Its partner has vanished. Clearly another long-distance relationship.',
      'Before you ask: clean. I do have some standards.'
    ] },
    { id: 'phone', icon: '📱', name: 'an unlocked phone', inspect: 'Read the unsent message', secret: 'drafts', notes: [
      'A notification from you. Naturally I stopped everything.', 'three deleted drafts. i was apparently having a whole conversation by myself.',
      'I was going to put the phone down. Then your name appeared.', 'the message is still sitting there. i was trying to word it normally.'
    ] },
    { id: 'controller', icon: '🎮', name: 'my controller', inspect: 'Read the player tag', secret: 'gamer', notes: [
      'I paused the game for you. Extremely sensible priorities.', 'Someone has put a sticker over my very cool gamer tag.',
      'Player two gets the good controller. That would be you.', 'The controller is charged. My ability to impress you is less certain.'
    ] },
    { id: 'dictionary', icon: '📚', name: 'a pocket dictionary', inspect: 'Read the pencilled word', secret: 'lesson', notes: [
      'I appear to have been an irresponsible language teacher.', 'One word has been underlined. I know whose fault that is.',
      'There are many useful words in here. We chose a different one.', 'An educational resource. Allegedly.'
    ] },
    { id: 'duck', icon: '🦆', name: 'a rubber duck', inspect: 'Look underneath', secret: 'uncle', notes: [
      'The duck knows too much about me.', 'I trusted this duck with one story. Mistake.',
      'A perfectly innocent duck. Its label is slander.', 'Someone has given it a job title. I disagree with the title.'
    ] },
    { id: 'memo', icon: '🎙️', name: 'a scribbled voice memo', inspect: 'What was I saying?', secret: 'voice', notes: [
      'You would know this was mine without seeing the name.', 'I wrote down something I keep saying to you.',
      'A few words. You can probably hear them already.', 'My attempts to sound normal around you, documented.'
    ] },
    { id: 'ribbon', icon: '🎀', name: 'a crooked little bow', inspect: 'Untie the bow', secret: 'ribbon', notes: [
      'i tied this three times. it got worse each time.', 'the gift is fine. the bow has been through something.',
      'I was trying to tie a bow. It has developed a personality.', 'please do not compare this to how neatly you would do it.'
    ] },
    { id: 'popcorn', icon: '🍿', name: 'a popcorn bowl', inspect: 'Check the folded napkin', secret: 'film', notes: [
      'The film is still paused. Of course it is.', 'I saved the last handful. Please appreciate my self-control.',
      'Something is hidden under the bowl. Good thing you checked.', 'I would move this out of the way so you could sit closer.'
    ] },
    { id: 'cushion', icon: '🛋️', name: 'a soft cushion', notes: [
      'This one is yours. I decided that immediately.', 'I was going to sit here. Now I am saving it for you.',
      'There is a suspicious crease under the corner.', 'Your side of the sofa, according to me.'
    ] },
    { id: 'star', icon: '🌟', name: 'a paper star', notes: [
      'I folded this badly and kept it anyway.', 'A very ambitious attempt at being romantic with stationery.',
      'The point is wonky. The intention is excellent.', 'I was thinking of you when I made it. That is my defence.'
    ] },
    { id: 'lemon', icon: '🍋', name: 'a tiny lemon', notes: [
      'No idea why this is here. I like that you checked.', 'A lemon with a small heart on its sticker.',
      'This was meant for a drink. It has joined the investigation.', 'An extremely unqualified clue keeper.'
    ] },
    { id: 'key', icon: '🗝️', name: 'a little key', notes: [
      'It opens absolutely nothing here. I just liked it.', 'I put a ribbon on it. That made it romantic in my head.',
      'You tried the sensible approach. I admire that.', 'The actual lock is much sillier than this key.'
    ] }
  ];
  const huntThemes = [
    { id: 'desk', title: 'on my very untidy desk', objects: ['notebook','clock','mug','dictionary','memo','phone','star','key'] },
    { id: 'film', title: 'after movie night', objects: ['ticket','popcorn','cushion','phone','bear','sock','notebook','mug'] },
    { id: 'music', title: 'by the little speakers', objects: ['headphones','ribbon','memo','notebook','star','phone','mug','clock'] },
    { id: 'garden', title: 'out on the balcony', objects: ['plant','lemon','mug','star','bear','notebook','key','cushion'] },
    { id: 'games', title: 'around the controller', objects: ['controller','phone','dictionary','duck','headphones','sock','notebook','clock'] },
    { id: 'pockets', title: 'things I left in my pockets', objects: ['key','ticket','dictionary','duck','memo','ribbon','star','phone'] }
  ];
  const secrets = {
    film: [
          "i thought we were watching Project Hail Mary together. you were doing a completely different research project 😭",
          "the astronaut was having a crisis. meanwhile you quietly opened THAT tab. multitasking ig.",
          "i paused the movie for you. very generous of me considering what you were busy watching 😭",
          "Project Hail Mary. one plot on the screen, another in your browser. i was not prepared."
    ],
    cartoon: [
          "wait, i kept a drawing in here too.",
          "okay this page is worth opening.",
          "there’s a familiar face in here. well… sort of.",
          "i was saving this bit for you."
    ],
    numbers: [
          "alarm: 6:07. do not start. i know you’ve already started.",
          "67 snoozes?? even the clock is encouraging you. unbelievable.",
          "you changed the alarm name to six seven. i came here to check the TIME 😭",
          "6… 7. i hate that i can hear you laughing through a clock."
    ],
    voice: [
          "oh come on. yes, in that voice. you know the one.",
          "too much. i miss you too much. go on, do your impression of me.",
          "i said oh come on once and you looked so happy i forgot what i was complaining about.",
          "you like how i say too much. now i’m self conscious saying it. look what you’ve done 😭"
    ],
    lesson: [
          "benchod. first word in the lesson. i really should not be teaching people.",
          "you said benchod so proudly. that was not supposed to be my greatest contribution 😭",
          "okay repeat after me… actually no. you’ve clearly got this one.",
          "page one: benchod. page two is blank. very thorough teaching from me."
    ],
    gamer: [
          "slayed potato. i spent time picking that. you read it and went aloo. all that effort 😭",
          "player one: slayed potato. you: okay aloo. let me have this.",
          "i win one match and you’re still calling me aloo. no respect for the profession.",
          "someone put an aloo sticker over my gamer tag. i have a very strong suspect."
    ],
    drafts: [
          "draft: i miss you. deleted. draft: i miss you too much. deleted. sent: hi. incredible work from me.",
          "i typed wyd like i had something else to do. i was waiting for you to reply.",
          "the message says nothing much. the deleted version says come talk to me please.",
          "i spent five minutes choosing a normal opening. you sent hi first. thank god."
    ],
    uncle: [
          "nephew needs a diaper change. everyone suddenly finds something else to do. you, from across the room: uncle toilet, your time has come. please 😭",
          "family group chat: who can help with the baby? you’ve already tagged uncle toilet. i helped ONCE and now i’m on call.",
          "me explaining how useful i was with my nephew. you: so… uncle toilet. i should have kept the whole story to myself.",
          "someone says diaper. you slowly turn to look at me. don’t even say it. i know."
    ],
    music: [
          "a playlist called focus. i added one song and then spent twenty minutes texting you. very focused.",
          "i was singing when you called. i answered like nothing happened. you absolutely heard it.",
          "the headphones are tangled. i have decided this is tomorrow’s problem.",
          "i saved a song to show you, forgot the title, and now i’m trying to hum it. this is going badly."
    ],
    ribbon: [
          "i watched a tutorial for this bow. mine looks like it watched a different tutorial.",
          "pull that end. no the other— okay both. we’re doing both apparently.",
          "if you open this neatly i’ll be impressed. i gave up and used too much tape.",
          "the bow is wonky but it stayed tied. i’m counting that as a win."
    ],
    bear: [
      'That Rilakkuma photo. Yes, I kept it here too. I am allowed to have favorites.',
      'I was trying to write something clever about your onesie. Then I looked at the photo and just smiled.',
      'The bear is hiding a photo of a much cuter bear. You know the one.',
      'Exhibit A in the case of “why Ash is smiling at his phone again”.'
    ]
  };
  const doodles = [
    { file: 'shin-heart.svg', alt: 'A rough Shin Chan doodle with a sideways cheek, cropped black hair and giant eyebrows' },
    { file: 'shin-wave.svg', alt: 'Shin Chan waving, drawn unevenly with his broad cheeks and thick eyebrows' },
    { file: 'us.svg', alt: 'Two messy stick figures holding hands under a big heart' },
    { file: 'sleepy-bunny.svg', alt: 'A lopsided sleepy bunny tucked into a heart-covered blanket' },
    { file: 'secret-heart.svg', alt: 'A crooked heart with Ash plus Ashley written inside' },
    { file: 'ashley-flower-cat.jpg', photo: true, alt: 'Ashley’s orange cat holding a purple flower', lines: ['you drew a cat bringing flowers. i can barely draw the flower. you’re making me look bad 😭','this cat turned up with flowers. i turned up with a website. both trying our best.','okay this is your drawing but i’m borrowing the cat. he’s bringing that flower from me.'] },
    { file: 'ashley-notebook-cat.jpg', photo: true, alt: 'Ashley’s wide-eyed pen cat on lined paper', lines: ['your cat looks like he opened the front camera by accident. i love him 😭','this one has definitely heard something he wasn’t supposed to hear. look at that face.','i was going to act normal about this drawing. but look at him. i kept it.'] }
  ];
  const openings = [
    'There you are. I knew you would find this.',
    'You found it. I was hoping you would be nosy.',
    'Hi, you. This was the part I wanted you to get to.',
    'I have been waiting at the end of this ridiculous hunt for you.',
    'Okay, detective. You earned this one.',
    'I put this somewhere silly because I wanted to make you smile first.',
    'You made it. Come sit beside me for a second, in your head at least.',
    'I should probably have just handed this to you. But then I would have missed this bit.'
  ];
  const middles = [
    'If you were beside me, I would lose my place mid-sentence because I was looking at you.',
    'I like that you can be completely ridiculous with me. Please keep doing that.',
    'I want to hear the version of a story you tell when you think it is too boring to mention.',
    'You know that grin I get when you message? I would like you to see it in person.',
    'I keep imagining reaching for your hand without having to imagine the rest.',
    'Sometimes I want to call with absolutely no news. The entire reason is you.',
    'I would happily spend a whole afternoon being distracted by you.',
    'I want you close enough to steal a kiss and then pretend I was doing something else.',
    'You would catch me smiling at you for no useful reason. Often.',
    'The next time you tell me something absurd, please know I am enjoying it even if I act offended.',
    'I like your company so much that my impressive plans keep turning into “stay a bit longer”.',
    'If we had the same sofa, I suspect the empty half of it would go completely unused.'
  ];
  const endings = [
    'Anyway. I miss you too much.',
    'You can keep this. The kiss that comes with it is also yours.',
    'I wish I could see your face when you read this.',
    'Come bother me when you are done here. I am hoping you will.',
    'I would like a very long hug from you. That is my entire closing statement.',
    'I love you, baby. Even when your jokes are a crime.',
    'Now imagine me squeezing your hand once. That is how I would finish saying this.',
    'I was trying to play it cool. As you can see, that went badly.'
  ];
  const teases = [
    'Something rustled. I am refusing to comment.',
    'Careful, detective. My wrapping skills are already questionable.',
    'You are absolutely the person who would shake a surprise first.',
    'No breakable things. Unless you count my attempt to look mysterious.',
    'That was unnecessarily cute of you.',
    'I can hear you asking what is inside. Keep looking.',
    'I would be watching you do this with the stupidest grin.',
    'The ribbon survived. A small victory for me.'
  ];

  const storeKey = 'ashley-hidden-note-v3';
  let bags = {};
  try { bags = JSON.parse(localStorage.getItem(storeKey) || '{}') || {}; } catch { /* Works without storage too. */ }
  if (typeof bags !== 'object' || Array.isArray(bags)) bags = {};
  function save() { try { localStorage.setItem(storeKey, JSON.stringify(bags)); } catch { /* Keep playing this visit. */ } }
  function randomInt(n) {
    if (window.crypto?.getRandomValues) {
      const value = new Uint32Array(1);
      const limit = Math.floor(4294967296 / n) * n;
      do { window.crypto.getRandomValues(value); } while (value[0] >= limit);
      return value[0] % n;
    }
    return Math.floor(Math.random() * n);
  }
  function mix(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function fresh(key, items) {
    const previous = bags[key]?.last;
    let deck = bags[key]?.deck;
    if (!Array.isArray(deck) || deck.some(i => !Number.isInteger(i) || i < 0 || i >= items.length)) deck = [];
    if (!deck.length) {
      deck = mix(items.map((_, i) => i));
      if (deck.at(-1) === previous && deck.length > 1) [deck[0], deck[deck.length - 1]] = [deck.at(-1), deck[0]];
    }
    const index = deck.pop();
    bags[key] = { deck, last: index };
    save();
    return items[index];
  }
  function node(tag, className, text) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  }
  function button(className, text, action) {
    const result = node('button', className, text);
    result.type = 'button';
    result.addEventListener('click', action);
    return result;
  }
  function badge(symbol, empty = false) {
    const result = node('span', `hunt-symbol${empty ? ' is-missing' : ''}`, empty ? '?' : symbol.glyph);
    result.style.setProperty('--symbol-color', symbol.color);
    result.setAttribute('aria-label', empty ? 'A clue to find' : symbol.name);
    return result;
  }
  function drawDoodle(host, drawing = round.doodle) {
    host.replaceChildren();
    const figure = node('figure', 'hunt-doodle');
    const pic = node('img');
    pic.src = 'assets/doodles/' + drawing.file + '?v=ashley-doodles-5';
    pic.alt = drawing.alt;
    pic.width = 360; pic.height = 300;
    if (drawing.photo) figure.classList.add('is-photo-square');
    figure.append(pic);
    if (drawing.lines) host.append(node('p', 'hunt-doodle-quip', round.doodleQuip ||= fresh('drawing-' + drawing.file, drawing.lines)));
    host.append(figure);
  }
  function egg(text, art = '♡') {
    const surprise = node('aside', 'hunt-egg');
    surprise.setAttribute('role', 'status');
    surprise.append(node('span', 'hunt-egg-art', art), node('p', '', text));
    return surprise;
  }

  let round;
  let lastTile = null;
  function focusStage() {
    const heading = body.querySelector('.hunt-step') || body.querySelector('.hunt-note-address');
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ block: 'start' });
  }
  function startRound() {
    body.querySelector('audio')?.pause();stopKisses();
    const theme = fresh('hunt-themes', huntThemes);
    const chosen = mix(theme.objects).slice(0, 6).map(id => objects.find(item => item.id === id));
    const code = mix(symbols).slice(0, 3);
    const cluePlaces = mix(chosen.map((_, i) => i)).slice(0, 3);
    const signature = chosen.map(x => x.id).join('-') + code.map(x => x.id).join('-') + cluePlaces.join('-');
    if (signature === bags.lastLayout) { startRound(); return; }
    bags.lastLayout = signature;
    save();
    round = { theme, doodle: fresh('round-doodles', doodles), tiles: chosen.map((item, i) => ({ ...item, clue: cluePlaces.includes(i) ? code[cluePlaces.indexOf(i)] : null })), code, found: new Set(), opened: new Set(), entered: 0, shakes: 0, musicTaps: 0 };
    lastTile = null;
    status.textContent = 'I left three little clues. Have a look around.';
    renderHunt();
    focusStage();
  }
  function step(label, number) {
    const row = node('div', 'hunt-step');
    row.append(node('span', '', `${number} / 3`), node('strong', '', label));
    return row;
  }
  function renderHunt() {
    body.replaceChildren(step('Look around', 1));
    body.append(node('p', 'hunt-location', round.theme.title));
    const shelf = node('div', 'hunt-clues');
    const slots = node('div', 'hunt-symbols');
    round.code.forEach(symbol => slots.append(badge(symbol, !round.found.has(symbol.id))));
    shelf.append(slots, node('span', '', `${round.found.size} of 3 found`));
    body.append(shelf);
    const board = node('div', `hunt-desk hunt-setting-${round.theme.id}`);
    board.setAttribute('aria-label', 'Places to look for Ash’s note');
    round.tiles.forEach((tile, i) => {
      const pick = button(`hunt-object${round.opened.has(i) ? ' is-looked' : ''}`, '', () => {
        if (!tile.note) tile.note = fresh(`object-${tile.id}`, tile.notes);
        tile.taps = (tile.taps || 0) + 1;
        if (tile.id === 'sock' && tile.taps === 3) tile.hiddenEgg = { art: '🧦 👀', text: 'you checked the sock three times. oh come on. the feet fetish allegations are looking very strong right now 😭' };
        if (tile.id === 'plant' && tile.taps === 3) tile.hiddenEgg = { art: '🌱 → 🌷', text: 'Oh. You kept checking on it. It grew you a flower. I’d do the same if I could.' };
        if (tile.id === 'controller' && tile.taps === 3) tile.hiddenEgg = { art: '🥔 🏆', text: 'Achievement unlocked: one very slayed aloo. Oh come on. Let me have ONE cool thing.' };
        if (tile.id === 'duck' && tile.taps === 3) tile.hiddenEgg = { art: '🦆 📟', text: 'pager goes off. diaper emergency. you hand me the duck like it’s my employee badge. uncle toilet is apparently on shift 😭' };
        if (tile.id === 'phone' && tile.taps === 3) tile.hiddenEgg = { art: '⌨ ♡', text: 'typing… stopped typing… typing… yeah. i was overthinking saying hi to my own girlfriend.' };
        round.opened.add(i);
        if (tile.clue) round.found.add(tile.clue.id);
        lastTile = i;
        renderHunt();
        status.textContent = tile.clue ? `You found the ${tile.clue.name}. ${round.found.size} of three clues found.` : 'No clue there. But I did leave you something.';
        body.querySelector('.hunt-discovery-title')?.focus({ preventScroll: true });
      });
      pick.style.setProperty('--object-tilt', `${[-4, 3, -2, 4, -3, 2][i]}deg`);
      pick.append(node('span', 'hunt-object-icon', tile.icon), node('span', 'hunt-object-name', tile.name));
      pick.setAttribute('aria-label', `Look at ${tile.name}${round.opened.has(i) ? ', already checked' : ''}`);
      if (round.opened.has(i)) pick.append(node('span', 'hunt-check', '♡'));
      board.append(pick);
    });
    body.append(board);
    if (lastTile !== null) {
      const tile = round.tiles[lastTile];
      const discovery = node('div', 'hunt-discovery');
      const title = node('h4', 'hunt-discovery-title', tile.name);
      title.tabIndex = -1;
      discovery.append(title, node('p', '', tile.note));
      if (tile.clue) {
        const clue = node('div', 'hunt-found');
        clue.append(badge(tile.clue), node('span', '', 'Oh. This was tucked inside.'));
        discovery.append(clue);
      }
      if (tile.secret) {
        const extra = node('div', 'hunt-extra');
        extra.hidden = true;
        const inspect = button('hunt-inspect', tile.inspect + ' ↗', () => {
          if (!tile.secretNote) tile.secretNote = fresh(`secret-${tile.secret}`, secrets[tile.secret]);
          extra.replaceChildren();
          if (tile.secret !== 'cartoon' || !round.doodle.lines) extra.append(node('p', '', tile.secretNote));
          if (tile.secret === 'bear') {
            const photo = node('img', 'hunt-photo');
            photo.src = 'assets/photos/cozy-onesie.jpg';
            photo.alt = 'Ashley in her Rilakkuma onesie';
            extra.append(photo);
          }
          if (tile.secret === 'cartoon') {
            const drawing = node('div');
            drawDoodle(drawing);
            extra.append(drawing);
          }

          extra.hidden = !extra.hidden;
          inspect.setAttribute('aria-expanded', String(!extra.hidden));
          status.textContent = '';
        });
        inspect.setAttribute('aria-expanded', 'false');
        discovery.append(inspect, extra);
      }
      if (tile.hiddenEgg) discovery.append(egg(tile.hiddenEgg.text, tile.hiddenEgg.art));
      body.append(discovery);
    }
    if (round.found.size === 3) body.append(button('hunt-primary', 'Try the little lock ♡', () => {
      renderLock();
      status.textContent = 'Three clues, three taps. Follow the row.';
      focusStage();
    }));
  }
  function renderLock() {
    body.replaceChildren(step('My unnecessarily fancy lock', 2));
    body.append(node('p', 'hunt-instruction', 'The clues go in this order. Tap them in.'));
    const code = node('div', 'hunt-lock-code');
    round.code.forEach((symbol, i) => {
      const token = badge(symbol);
      if (i < round.entered) token.classList.add('is-entered');
      code.append(token);
    });
    body.append(code);
    const keys = node('div', 'hunt-lock-keys');
    if (!round.keyOrder) round.keyOrder = mix(symbols);
    round.keyOrder.forEach(symbol => {
      const key = button('hunt-lock-key', symbol.glyph, () => {
        round.musicTaps = symbol.id === 'music' ? round.musicTaps + 1 : 0;
        if (round.musicTaps === 3) {
          round.entered = 0;
          renderLock();
          body.append(egg('it’s a lock. you’ve somehow turned it into a piano. i love how your brain works 😭', '♫ ♪ ♫'));
          status.textContent = '';
          body.querySelector('[aria-label="Press the music note"]')?.focus({ preventScroll: true });
          return;
        }
        if (round.code[round.entered].id === symbol.id) {
          round.entered++;
          if (round.entered === round.code.length) {
            status.textContent = 'It opened. I knew I could trust you with my ridiculous hiding places.';
            renderParcel();
            focusStage();
          } else {
            status.textContent = 'That one clicked into place.';
            renderLock();
            body.querySelector(`[aria-label="Press the ${symbol.name}"]`)?.focus({ preventScroll: true });
          }
        } else {
          round.entered = 0;
          renderLock();
          status.textContent = `My terrible lock. Start with the ${round.code[0].name}, then follow the little row.`;
          body.querySelector(`[aria-label="Press the ${symbol.name}"]`)?.focus({ preventScroll: true });
        }
      });
      key.style.setProperty('--symbol-color', symbol.color);
      key.setAttribute('aria-label', `Press the ${symbol.name}`);
      keys.append(key);
    });
    body.append(keys, button('hunt-back', '← Look around a bit more', () => { round.entered = 0; renderHunt(); }));
  }
  let kissTimer;
  let kissLayer;
  let playingLove;
  function stopKisses() {
    clearInterval(kissTimer);kissTimer=undefined;
    kissLayer?.remove();kissLayer=undefined;
    playingLove=undefined;
  }
  function startKisses(audio) {
    clearInterval(kissTimer);kissLayer?.remove();playingLove=audio;
    kissLayer=node('div','love-kiss-screen');kissLayer.setAttribute('aria-hidden','true');document.body.append(kissLayer);
    const gentle=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function sendKiss() {
      if(!kissLayer||audio.paused||audio.ended)return;
      const mark=node('span','love-floating-kiss',randomInt(3)===0?'♡':'💋');
      mark.style.setProperty('--kiss-x',`${5+randomInt(90)}%`);
      mark.style.setProperty('--kiss-y',`${10+randomInt(70)}%`);
      mark.style.setProperty('--kiss-tilt',`${randomInt(36)-18}deg`);
      mark.style.setProperty('--kiss-size',`${24+randomInt(18)}px`);
      kissLayer.append(mark);setTimeout(()=>mark.remove(),gentle?1600:2800);
    }
    for(let i=0;i<(gentle?4:9);i++)sendKiss();
    kissTimer=setInterval(sendKiss,gentle?650:170);
  }
  function stopLove(){playingLove?.pause();stopKisses();}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopLove();});
  window.addEventListener('pagehide',stopLove);
  function renderParcel() {
    body.replaceChildren(step('Found you', 3));
    body.append(node('p', 'hunt-instruction', 'I wrapped it myself. You can probably tell.'));
    const parcel = button('hunt-parcel', '', revealNote);
    parcel.setAttribute('aria-label', 'Open the heart seal on your parcel');
    parcel.append(node('span', 'hunt-ribbon', ''), node('span', 'hunt-seal', '♥'), node('span', 'hunt-parcel-label', 'for you ♡'));
    body.append(parcel);
    const rustle = node('p', 'hunt-rustle', 'Go on. Open it.');
    rustle.setAttribute('aria-live', 'polite');
    body.append(rustle);
    const actions = node('div', 'hunt-parcel-actions');
    actions.append(button('hunt-inspect', 'Shake it first', () => {
      round.shakes++;
      parcel.classList.remove('is-shaking');
      void parcel.offsetWidth;
      parcel.classList.add('is-shaking');
      const words = round.shakes === 6 ? 'Six shakes. Six. Be normal about this.' : round.shakes === 7 ? 'Seven. You did that on purpose, didn’t you? I hate that I know why you are laughing.' : fresh('parcel-teases', teases);
      rustle.textContent = words;
      status.textContent = '';
      if (round.shakes === 7) parcel.querySelector('.hunt-seal').textContent = '67';
      if (round.shakes === 11) {
        rustle.textContent = 'okay. this bit is for you ♡';
        parcel.append(node('span', 'hunt-love-sound', '♡'));
        const audio = node('audio'); audio.src = 'assets/audio/i-love-you.mp3';
        audio.volume = .75; audio.hidden = true; actions.append(audio);
        audio.addEventListener('playing', () => startKisses(audio));
        ['ended','pause','error'].forEach(event => audio.addEventListener(event, stopKisses));
        function playLove() {
          stopKisses(); audio.currentTime = 0;
          audio.play().then(()=>{if(!audio.paused&&!kissLayer)startKisses(audio);}).catch(() => { rustle.textContent = 'i love you ♡ tap hear it again to play.'; });
        }
        playLove();
        actions.append(button('hunt-inspect', 'Hear it again ♡', playLove));
      }
    }), button('hunt-inspect', 'Okay, open it ♡', revealNote));
    body.append(actions);
  }
  function revealNote() {
    body.querySelector('audio')?.pause(); stopKisses();
    const datedLetter = window.AshleyDailyLetter;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const personalLines = datedLetter?.date === today && Array.isArray(datedLetter.paragraphs)
      ? datedLetter.paragraphs.map(line => String(line).trim()).filter(Boolean)
      : [];
    if (personalLines.length) round.note = personalLines;
    else if (!round.note) round.note = [fresh('note-openings', openings), fresh('note-middles', middles), fresh('note-endings', endings)];
    body.replaceChildren();
    const paper = node('div', 'hunt-love-note');
    paper.append(node('span', 'hunt-note-star', '✦'), node('p', 'hunt-note-address', '😘'));
    round.note.forEach(line => paper.append(node('p', '', line)));
    body.append(paper);
    const secret = node('div', 'hunt-final-secret');
    secret.hidden = true;
    const secretButton = button('hunt-inspect', 'There is something on the back…', () => {
      if (!round.lastSecret) {
        const category = fresh('final-categories', Object.keys(secrets));
        round.lastCategory = category;
        round.lastSecret = fresh(`secret-${category}`, secrets[category]);
      }
      secret.replaceChildren();
      if (round.lastCategory !== 'cartoon' || !round.doodle.lines) secret.append(node('p', '', round.lastSecret));
      if (round.lastCategory === 'cartoon') {
        const drawing = node('div');
        drawDoodle(drawing);
        secret.append(drawing);
      }

      secret.hidden = !secret.hidden;
      secretButton.setAttribute('aria-expanded', String(!secret.hidden));
      status.textContent = '';
    });
    secretButton.setAttribute('aria-expanded', 'false');
    body.append(secretButton, secret, button('hunt-primary', 'Hide another one for me ↺', startRound));
    status.textContent = 'You found my note. The hiding places will be different next time.';
    focusStage();
  }
  const start = node('div', 'hunt-start');
  const sketch = node('div', 'hunt-start-sketch');
  sketch.setAttribute('aria-hidden', 'true');
  sketch.append(node('span', '', '✉'), node('span', '', '✦'), node('span', '', '♡'));
  start.append(sketch, button('hunt-primary', 'Let me find it ♡', startRound));
  body.append(start);
  const sticker = document.querySelector('.treasure-sticker');
  let stickerTaps = 0;
  sticker?.addEventListener('click', () => {
    stickerTaps++;
    sticker.classList.remove('is-peeling');
    void sticker.offsetWidth;
    sticker.classList.add('is-peeling');
    if (stickerTaps % 5 === 0) {
      body.querySelector('.hunt-sticker-secret')?.remove();
      const surprise = egg(fresh('sticker-secrets', [
        'you really poked the decoration five times 😭 okay fine. i love you.',
        'Okay, you got me. Even the decoration is trying to tell you I love you.',
        'I hid one here too. I had a feeling you would poke everything. You did.'
      ]));
      surprise.classList.add('hunt-sticker-secret');
      body.prepend(surprise);
    }
  });
})();
