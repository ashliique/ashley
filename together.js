(() => {
  const card = document.querySelector('#together-card');
  if (!card) return;
  const scene = card.querySelector('#together-scene');
  const whisper = card.querySelector('#together-whisper');
  const actions = card.querySelector('#together-actions');
  const themes = [
    { id: 'rain', sky: '#abc8d3', room: '#f5e4d9', label: 'rain against the window', detail: '<path d="M102 48l-4 10m24-27l-5 11m35-5l-4 10m27 8l-5 11m26-31l-5 10m-65 25l-4 10" stroke="#6d9daa" stroke-width="2" stroke-linecap="round"/>', line: 'rainy day. good excuse to stay here with me.' },
    { id: 'stars', sky: '#6d637f', room: '#eee1ea', label: 'everyone else is asleep', detail: '<path d="M169 30a17 17 0 1 0 19 26 19 19 0 0 1-19-26" fill="#fff3ce"/><g fill="#fff3ce"><circle cx="109" cy="34" r="2"/><circle cx="140" cy="65" r="2"/><circle cx="207" cy="47" r="1.5"/><path d="M128 26l2 4 4 1-4 2-1 4-2-4-4-1 4-2z"/></g>', line: 'One more minute. I’m very bad at goodnight with you.' },
    { id: 'sun', sky: '#f4d7ac', room: '#fff0d8', label: 'absolutely no plans', detail: '<circle cx="183" cy="46" r="16" fill="#ffeeb1"/><path d="M98 70q22-15 42-2t68-7" fill="none" stroke="#efba91" stroke-width="4"/>', line: 'I had plans. Then you sat down. This is better.' },
    { id: 'breeze', sky: '#c6d8c7', room: '#eaf0e2', label: 'the window is open a little', detail: '<path d="M111 41q29-12 47 0m-42 13q35-11 69-2" fill="none" stroke="#f9f4db" stroke-width="3" stroke-linecap="round"/><path d="M194 31q14 1 7 13-13-2-7-13m-83 35q14 1 7 13-13-2-7-13" fill="#90b39a"/>', line: 'Your hair keeps tickling me. I’m not moving though.' }
  ];
  const windowScenes = [
    {id:'fireworks',label:'Fireworks write I love you across the window',art:'<g class="window-fireworks"><g stroke="#ffe2a7" stroke-width="2" stroke-linecap="round"><path d="M112 42l-12-9m12 9-2-15m2 15 12-10m-12 10 14 4m-14-4-13 8M190 38l-11-8m11 8 1-15m-1 15 12-9m-12 9 14 6m-14-6-12 10"/></g><text x="153" y="73" text-anchor="middle" font-family="Georgia" font-size="12" font-weight="700" fill="#493441" stroke="#fff4dc" stroke-width="2" paint-order="stroke">I ♡ YOU</text></g>'},
    {id:'meteors',label:'A tiny meteor shower crosses the window',art:'<g class="window-meteors" stroke="#fff1c9" stroke-linecap="round"><path d="M105 35l25 15m9-23l30 19m13-7l25 15" stroke-width="3"/><path d="M104 35l-8-5m43-3l-9-6m52 18l-9-5" stroke-width="1.5"/></g>'},
    {id:'wish',label:'A shooting star passes by—make a wish',art:'<g class="window-wish"><path d="M105 72Q145 31 198 35" fill="none" stroke="#fff0b9" stroke-width="3" stroke-linecap="round"/><path d="M199 25l4 8 9 2-8 5-1 9-6-7-9 3 4-9-6-6 9 1z" fill="#fff0b9"/><text x="137" y="77" font-family="Georgia" font-style="italic" font-size="10" font-weight="700" fill="#493441" stroke="#fff4dc" stroke-width="2" paint-order="stroke">make a wish</text></g>'},
    {id:'aurora',label:'Pink and green lights dance outside',art:'<g class="window-aurora" fill="none" stroke-linecap="round"><path d="M99 40q35-22 62 1t53-4" stroke="#d9afd4" stroke-width="8" opacity=".65"/><path d="M96 55q35-19 60 2t57-7" stroke="#b7d5bd" stroke-width="7" opacity=".65"/></g>'},
    {id:'lanterns',label:'Little heart lanterns float past the window',art:'<g class="window-lanterns" fill="#ffe6b1" stroke="#d8a996" stroke-width="1"><path d="M112 60q-13-9-8-17 6-6 8 2 4-8 10-2 5 8-10 17z"/><path d="M160 39q-13-9-8-17 6-6 8 2 4-8 10-2 5 8-10 17z"/><path d="M199 68q-13-9-8-17 6-6 8 2 4-8 10-2 5 8-10 17z"/></g>'},
    {id:'moon',label:'The moon and a sleepy cloud drift by',art:'<g class="window-moon"><path d="M176 26a19 19 0 1 0 18 28 19 19 0 0 1-18-28" fill="#fff0c6"/><path d="M107 67q5-18 21-9 8-15 22-2 17-4 20 11z" fill="#f7edf0"/><path d="M128 62q3 3 6 0m8 0q3 3 6 0" fill="none" stroke="#8d7480" stroke-width="1.5"/></g>'}
  ];
  const arrivals = [
    'There. That’s where I wanted you.', 'Yep. I’m smiling like an idiot now.',
    'I was going to say something clever. Hi, Ashley.', 'You can lean on me. I’m staying.',
    'I moved over. You’re still somehow sitting on me. Perfect.', 'Your hand, please. I missed that.',
    'I’m going to be so annoying about keeping you close.', 'Now I don’t feel like getting up at all.'
  ];
  let memory = {};
  try { const saved = JSON.parse(localStorage.getItem('ashley-sofa-v1') || '{}'); if (saved && typeof saved === 'object' && !Array.isArray(saved)) memory = saved; } catch {}
  const save = () => { try { localStorage.setItem('ashley-sofa-v1', JSON.stringify(memory)); } catch {} };
  function fresh(key, values) {
    let deck = memory[key]?.deck;
    const last = memory[key]?.last;
    if (memory[key]?.size !== values.length || !Array.isArray(deck) || deck.some(i => !Number.isInteger(i) || i < 0 || i >= values.length)) deck = [];
    if (!deck.length) {
      deck = values.map((_, i) => i);
      for (let i = deck.length - 1; i > 0; i--) {
        const bytes = new Uint32Array(1);
        const j = window.crypto?.getRandomValues ? (window.crypto.getRandomValues(bytes), bytes[0] % (i + 1)) : Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      if (deck.at(-1) === last) [deck[0], deck[deck.length - 1]] = [deck.at(-1), deck[0]];
    }
    const index = deck.pop(); memory[key] = { deck, last: index, size: values.length }; save(); return values[index];
  }
  let visit;
  let day = '';
  const huntObjects = [
    {id:'clock', mark:'◷', name:'clock'}, {id:'picture', mark:'▧', name:'picture'},
    {id:'window', mark:'☁', name:'window'}, {id:'lamp', mark:'✦', name:'lamp'},
    {id:'plant', mark:'❀', name:'plant'}, {id:'drawer', mark:'≋', name:'drawer'},
    {id:'cushion', mark:'♡', name:'cushion'}, {id:'cup', mark:'☕', name:'cup'}
  ];
  function bear(x, y, isAshley, expression = 'happy') {
    const fur = isAshley ? '#edd2af' : '#c9a486';
    const face = expression === 'muted'
      ? '<path d="M-17-5l9 5m8 0l9-5" fill="none" stroke="#68505a" stroke-width="2.7" stroke-linecap="round"/><ellipse cx="0" cy="6" rx="4" ry="3" fill="#68505a"/><path d="M0 9v4m-7 4q7-7 14 0" fill="none" stroke="#68505a" stroke-width="1.8" stroke-linecap="round"/>'
      : '<path d="M-16-3q4-5 8 0m16 0q4-5 8 0" fill="none" stroke="#68505a" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="0" cy="6" rx="4" ry="3" fill="#68505a"/><path d="M0 9v4m-5-1q5 6 10 0" fill="none" stroke="#68505a" stroke-width="1.7" stroke-linecap="round"/>';
    return `<g transform="translate(${x} ${y})" class="${isAshley ? 'sofa-baby' : 'sofa-ash'}"><ellipse cx="0" cy="36" rx="29" ry="32" fill="${fur}"/><circle cx="-23" cy="-22" r="12" fill="${fur}"/><circle cx="22" cy="-23" r="12" fill="${fur}"/><circle cx="-23" cy="-22" r="6" fill="#edb1ac"/><circle cx="22" cy="-23" r="6" fill="#edb1ac"/><path d="M-32-3Q-32-29 0-30T32-2Q36 28 0 29T-32-3" fill="${fur}" stroke="#b28b77" stroke-width="1.5"/><ellipse cx="0" cy="10" rx="17" ry="12" fill="#fff0d4"/>${face}<ellipse cx="-23" cy="9" rx="6" ry="3.5" fill="#e5a0a4"/><ellipse cx="23" cy="9" rx="6" ry="3.5" fill="#e5a0a4"/><ellipse cx="-19" cy="57" rx="13" ry="9" fill="${fur}"/><ellipse cx="18" cy="57" rx="13" ry="9" fill="${fur}"/>${isAshley ? '<path d="M10-28l-8-8v14l8-6 10-8v14z" fill="#bc6f83"/>' : '<path d="M-18 28q17 9 36 0" fill="none" stroke="#91a4a0" stroke-width="11"/>'}</g>`;
  }
  function ensureDailyHunt() {
    const today = card.querySelector('#together-date').dateTime;
    const valid = memory.dailyHunt?.day === today && Array.isArray(memory.dailyHunt.sequence) &&
      memory.dailyHunt.sequence.length === 3 && new Set(memory.dailyHunt.sequence).size === 3 &&
      memory.dailyHunt.sequence.every(id => huntObjects.some(item => item.id === id));
    if (!valid) {
      const pool = huntObjects.map(item => item.id);
      for (let i=pool.length-1;i>0;i--) {
        const bytes=new Uint32Array(1);
        const j=window.crypto?.getRandomValues?(window.crypto.getRandomValues(bytes),bytes[0]%(i+1)):Math.floor(Math.random()*(i+1));
        [pool[i],pool[j]]=[pool[j],pool[i]];
      }
      memory.dailyHunt = {day: today, sequence: pool.slice(0,3), progress: 0, complete: false}; save();
    }
    return memory.dailyHunt;
  }
  function huntPatchArt() {
    const hunt=ensureDailyHunt();
    return hunt.sequence.map((id,i)=>{
      const item=huntObjects.find(entry=>entry.id===id);
      const done=hunt.complete||i<hunt.progress;
      return `<g class="room-rug-clue${done?' is-found':''}" transform="translate(${170+i*35} 332)"><circle r="14" fill="${done?'#d29bab':'#f8eadc'}" stroke="#c79ca4" stroke-width="1.5" stroke-dasharray="2 3"/><text y="5" text-anchor="middle" font-family="Georgia" font-size="16" fill="${done?'#fff9ed':'#9e6c7d'}">${item.mark}</text></g>`;
    }).join('');
  }
  function daysBetween(from,to) {
    const parse=value=>{const [year,month,date]=value.split('-').map(Number);return Date.UTC(year,month-1,date);};
    return Math.max(0,Math.floor((parse(to)-parse(from))/86400000));
  }
  function plantHealth() {
    const today=card.querySelector('#together-date').dateTime;
    if(!memory.plantCare?.started){memory.plantCare={started:today,lastWatered:''};save();}
    const gap=daysBetween(memory.plantCare.lastWatered||memory.plantCare.started,today);
    return gap>=3?'wilted':gap===2?'thirsty':'happy';
  }
  function plantArt(health,watered) {
    if(health==='wilted')return '<g class="room-plant is-wilted"><path d="M347 136q-2-23-18-28m18 12q16-18 25-4" fill="none" stroke="#9b866d" stroke-width="3"/><path d="M329 108q-9 12 5 18 8-12-5-18m43 8q8 14-6 18-8-11 6-18" fill="#af9b77"/><path d="M330 132h35l-5 25h-25z" fill="#d5ad9c" stroke="#bc9187" stroke-width="2"/><path d="M339 147q8-7 16 0" fill="none" stroke="#936f7d" stroke-width="2"/></g>';
    const thirsty=health==='thirsty';
    return `<g class="room-plant${thirsty?' is-thirsty':''}"><path d="M347 136v-35m0 22q-27-3-23-27 25 0 23 27m0-14q24 0 22-23-24-1-22 23" fill="${thirsty?'#b7a584':'#9bb59a'}" stroke="#819e87" stroke-width="2"/><path d="M330 132h35l-5 25h-25z" fill="#dfb8a5" stroke="#c99e8f" stroke-width="2"/><path d="M336 142h23" stroke="#f3d4c2" stroke-width="2"/>${watered?'<path class="plant-water-drop" d="M319 104q-8 11 0 12 8-1 0-12" fill="#95bac9"/>':''}</g>`;
  }
  function draw() {
    const { theme } = visit;
    const health=plantHealth();
    const windowView=visit.windowScene?.art||theme.detail;
    scene.dataset.weather = theme.id;
    scene.dataset.plantHealth = health;
    scene.dataset.windowScene = visit.windowScene?.id||theme.id;
    scene.classList.toggle('is-together', visit.seated);
    scene.classList.toggle('is-dim', Boolean(visit.lamp));
    scene.classList.toggle('is-snuggled',Boolean(visit.snuggled));
    scene.classList.toggle('is-cushion-lifted',Boolean(visit.cushion));
    scene.classList.toggle('is-blanketed',Boolean(visit.blanket));
    const dailyHunt=ensureDailyHunt();
    scene.classList.toggle('is-hunt-wrong',Boolean(visit.huntWrong));
    scene.innerHTML = `<div class="sofa-canvas"><svg class="sofa-art" viewBox="0 0 400 430" aria-hidden="true"><defs><clipPath id="sofa-cat-clip"><rect x="320" y="11" width="50" height="44" rx="3"/></clipPath></defs>
      <rect class="room-wall" width="400" height="430" rx="17" fill="${theme.room}"/>
      <path d="M0 270h400v160H0z" fill="#d8bdb2" opacity=".37"/>
      <path d="M12 282h376M12 369h376" stroke="#ad8a7a" opacity=".14"/>
      <ellipse cx="204" cy="332" rx="99" ry="45" fill="#eed5c8" stroke="#d7b7b2" stroke-width="2"/>
      <ellipse cx="204" cy="332" rx="86" ry="35" fill="none" stroke="#f9efe0" stroke-width="2" stroke-dasharray="3 7"/>
      <g class="room-rug-hunt">${huntPatchArt()}</g>
      <g class="room-yarn" transform="translate(112 345)"><circle r="14" fill="#d9a8bc" stroke="#bd829e" stroke-width="2"/><path d="M-10-5q12 9 20 0M-12 3q12 9 23 0M-8 9q8-6 16 0m13 7q18 1 22 12" fill="none" stroke="#fff0e8" stroke-width="2" stroke-linecap="round"/></g>
      <g class="room-bunny-plush" transform="translate(290 342)"><path d="M-10-10q-9-27 2-29 9 2 8 27m9 1q4-28 14-24 9 6-3 30" fill="#f4ddd1" stroke="#c9a69c" stroke-width="2"/><ellipse cx="5" cy="7" rx="23" ry="20" fill="#f4ddd1" stroke="#c9a69c" stroke-width="2"/><circle cx="-3" cy="3" r="2" fill="#80636f"/><circle cx="13" cy="3" r="2" fill="#80636f"/><path d="M5 8q3 4 6 0" fill="none" stroke="#80636f" stroke-width="1.5"/></g>
      ${visit.blanket?'<g class="room-blanket-basket" transform="translate(90 383)"><path d="M-23-7h46l-4 24h-38z" fill="#c99c86" stroke="#a97d70" stroke-width="2"/><path d="M-16-8q16-17 32 0" fill="none" stroke="#a97d70" stroke-width="3"/><path d="M0 1q-5-5-8-1-3 5 8 11 11-6 8-11-3-4-8 1z" fill="#f7d9d0"/></g>':'<g class="room-folded-blanket" transform="translate(90 383)"><rect x="-27" y="-15" width="54" height="28" rx="7" fill="#d9a9bd" stroke="#b97f98" stroke-width="2"/><path d="M-21-5h42M-21 5h42" stroke="#f8e8df" stroke-width="2" stroke-dasharray="6 4"/><path d="M0-7q-5-5-8-1-3 5 8 11 11-6 8-11-3-4-8 1z" fill="#fff0df"/></g>'}
      <g transform="translate(40 35)">
        <rect x="87" y="15" width="133" height="87" rx="30" fill="${theme.sky}" stroke="#fff9ed" stroke-width="9"/>${windowView}<path d="M153 19v80M91 60h124" stroke="#fff9ed" stroke-width="5"/>
        <path d="M26 139q2-16 22-16h222q20 0 21 20l-7 78H34z" fill="#d3939e" stroke="#b87589" stroke-width="2"/>
        <path d="M39 195q0-15 22-15h203q17 0 17 17v29H39z" fill="#e8b0b5"/>
        <path d="M23 172q-7-9-5-20 3-14 17-10 15 4 14 20l-2 65H25zm274 0q7-9 5-20-3-14-17-10-15 4-14 20l2 65h22z" fill="#c37e91"/>
        <path d="M40 229v10m238-10v10" stroke="#93706c" stroke-width="6" stroke-linecap="round"/>
        ${bear(visit.seated ? (visit.snuggled ? 132 : 128) : 108,150,false,visit.cushion?'muted':'happy')}
        ${visit.seated ? bear(visit.snuggled ? 179 : 183,154,true) : '<g stroke="#fff4da" fill="#f6cfcc" stroke-width="2"><rect x="177" y="153" width="52" height="46" rx="11" transform="rotate(8 203 176)"/><path d="M199 170q-8-9-12-2-5 8 12 18 19-12 13-19-6-5-13 3z" fill="#d77c90" stroke="none"/></g>'}
        ${visit.seated ? '<path d="M145 180q12 13 27 0" fill="none" stroke="#c7a388" stroke-width="10" stroke-linecap="round"/>' : ''}
        ${visit.blanket&&visit.seated?'<g class="room-bear-blanket"><path d="M88 179q64-22 136 0l4 47q-67 18-143-1z" fill="#d9a9bd" stroke="#b97f98" stroke-width="2"/><path d="M91 195q66-17 134 0M92 212q64-13 134 0" fill="none" stroke="#f7e6df" stroke-width="2" stroke-dasharray="7 6"/><path d="M119 199q-7-6-11-1-3 6 11 14 14-8 11-14-5-5-11 1zm70 4q-7-6-11-1-3 6 11 14 14-8 11-14-5-5-11 1z" fill="#fff0df" opacity=".9"/><path d="M86 222q72 20 142 1" fill="none" stroke="#9e7088" stroke-width="2"/></g>':''}
        <g class="room-cushion"><rect x="260" y="165" width="40" height="35" rx="9" fill="#f3d3b7" transform="rotate(-9 280 183)"/><path d="M277 177q-6-6-8-1-2 5 8 11 11-7 9-11-4-5-9 1z" fill="#ca8192"/></g>
        ${visit.cushion?'<g class="room-remote" transform="translate(307 178) rotate(8)"><rect x="-20" y="-30" width="40" height="60" rx="9" fill="#8d7b92" stroke="#6d5d74" stroke-width="2"/><circle cy="-20" r="4" fill="#e8a6ba"/><rect x="-15" y="-11" width="30" height="14" rx="3" fill="#fff0d6"/><text x="0" y="0" text-anchor="middle" font-size="7.5" font-family="Arial" font-weight="700" fill="#654c5c">MUTE</text><text x="0" y="19" text-anchor="middle" font-size="10" font-family="Arial" font-weight="700" fill="#fff0d6">ASH</text></g><g class="room-oh-come-on"><path d="M108 128q30-17 58 0l-6 20h-46z" fill="#fff8e8" stroke="#c7a493"/><text x="137" y="142" text-anchor="middle" font-size="9" font-family="Georgia" font-style="italic" fill="#8d6170">oh come on</text></g>':''}
        ${visit.remoteReply?`<g class="room-remote-reply"><path d="M91 126q48-20 93 0l-7 22h-78z" fill="#fff8e8" stroke="#c7a493"/><text x="137" y="141" text-anchor="middle" font-size="8.5" font-family="Georgia" font-style="italic" fill="#8d6170">${visit.remoteReply}</text></g>`:''}
        ${visit.seated ? '<text x="115" y="112" font-family="Georgia" font-size="12" fill="#8e5269" text-anchor="middle">me</text><text x="191" y="115" font-family="Georgia" font-style="italic" font-size="12" fill="#8e5269" text-anchor="middle">you ♡</text>' : '<text x="202" y="217" font-family="Georgia" font-style="italic" font-size="13" fill="#875267" text-anchor="middle">your spot ♡</text>'}
      </g>
      <circle cx="65" cy="31" r="23" fill="#fff5e1" stroke="#b89994" stroke-width="4"/><g class="room-clock-hands"><path d="M65 31V17" fill="none" stroke="#8f6176" stroke-width="3" stroke-linecap="round" transform="rotate(${visit.clock67?180:-18} 65 31)"/><path d="M65 31V13" fill="none" stroke="#b07187" stroke-width="2" stroke-linecap="round" transform="rotate(${visit.clock67?210:78} 65 31)"/></g>
      <rect x="314" y="5" width="62" height="56" rx="5" fill="#fff5e4" stroke="#c7a48e" stroke-width="3"/><image href="assets/doodles/${visit.cat.file}" x="320" y="11" width="50" height="44" preserveAspectRatio="xMidYMid slice" clip-path="url(#sofa-cat-clip)"/><path d="M331 4h27" stroke="#e9cba9" stroke-width="7" opacity=".8"/>
      <circle class="room-lamp-glow" cx="65" cy="100" r="62" fill="#ffde93" opacity="0"/><path d="M65 100v63m-20 0h40" stroke="#ad8d76" stroke-width="4" stroke-linecap="round"/><path d="M46 102h38L74 71H55z" fill="#e7c07f" stroke="#bf9c74" stroke-width="2"/>
      ${plantArt(health,visit.water)}
      <g class="room-drawer"><path d="M17 190h57v10H17z" fill="#bd9786"/><rect x="21" y="200" width="49" height="46" rx="4" fill="#e6c8ac" stroke="#bc9b89" stroke-width="2"/><path d="M22 225h47m-43 23v18m38-18v18" stroke="#bc9b89" stroke-width="3"/><circle cx="45" cy="211" r="3" fill="#ae8593"/><circle cx="45" cy="235" r="3" fill="#ae8593"/></g>
      <g class="room-fridge"><rect x="18" y="280" width="57" height="76" rx="9" fill="#bdd0c1" stroke="#91aa9e" stroke-width="2"/><path d="M18 307h57m-9-15v8m0 15v16" stroke="#829b90" stroke-width="3" stroke-linecap="round"/><path d="M28 318h25v21H28z" fill="#fff1cf" transform="rotate(-7 40 328)"/><path d="M39 320q-5-6-8-1-3 5 8 11 10-6 8-11-4-5-8 1z" fill="#cf92a7"/><circle cx="40" cy="318" r="3" fill="#b48799"/></g>
      <g class="room-cup-table"><ellipse cx="339" cy="318" rx="35" ry="10" fill="#dbb8a2" stroke="#b69585" stroke-width="2"/><path d="M339 325v32m-16 0h32" stroke="#b69585" stroke-width="4" stroke-linecap="round"/>
        <path d="M354 286q18-1 12 15l-13 5" fill="none" stroke="#789575" stroke-width="5"/><path d="M321 279h35l-3 30q-15 9-29-1z" fill="#bdcb90" stroke="#8eaa83" stroke-width="2"/><ellipse cx="338" cy="279" rx="18" ry="5" fill="#e0d8ba" stroke="#8eaa83" stroke-width="2"/>
        <path d="M328 292q10-6 18 0l1 7h-20z" fill="#eabacc"/><path d="M329 291q9-9 16 0" fill="#70566e"/><path d="M331 294h4m5 0h4" stroke="#715769" stroke-width="2"/><path d="M330 300h15v6h-15z" fill="#cb85a7"/>
        <path class="room-cup-steam" d="M331 267q-5-9 0-16m12 16q-5-9 0-16" fill="none" stroke="#fff4dd" stroke-width="3" stroke-linecap="round"/>
      </g>
      ${visit.water ? '<g class="room-heart-bloom" fill="#d49bb8"><path d="M344 109q-16-12-10-18 5-4 10 2 5-6 10-2 6 6-10 18z"/><path d="M326 127q-12-10-7-14 4-4 7 1 4-5 8-1 5 4-8 14z"/></g>' : ''}
      ${visit.clock67 ? '<g fill="#cf96aa"><text x="65" y="8" font-size="10" text-anchor="middle">♡</text></g>' : ''}
      <text x="158" y="401" text-anchor="middle" font-family="Georgia" font-size="13" font-style="italic" fill="#986579">${dailyHunt.complete?'found it ♡':'follow the rug ♡'}</text>
      <circle cx="346" cy="396" r="24" fill="#fff4da" stroke="#d1ad99" stroke-width="2" stroke-dasharray="3 3"/><text x="346" y="406" text-anchor="middle" font-size="29" fill="#a76c86">↻</text>
    </svg></div>`;
    const canvas = scene.querySelector('.sofa-canvas');
    canvas.setAttribute('role','group');canvas.setAttribute('aria-label','Our little room. Tap the objects to explore.');
    const huntStatus=document.createElement('span');huntStatus.className='room-hunt-status';
    huntStatus.textContent=dailyHunt.complete?'Today’s rug trail is complete.':`Today’s rug trail: ${dailyHunt.sequence.map(id=>huntObjects.find(item=>item.id===id).name).join(', ')}. ${dailyHunt.progress} of 3 found.`;
    canvas.append(huntStatus);
    if(visit.windowScene){const skyStatus=document.createElement('span');skyStatus.className='room-hunt-status';skyStatus.setAttribute('aria-live','polite');skyStatus.textContent=visit.windowScene.label;canvas.append(skyStatus);}
    function hotspot(id,label,x,y,w,h,action) {
      const b=document.createElement('button'); b.type='button'; b.className='room-hotspot'; b.dataset.object=id;
      b.setAttribute('aria-label',label); b.style.cssText=`left:${x/4}%;top:${y/4.3}%;width:${w/4}%;height:${h/4.3}%;`;
      if(id==='lamp') b.setAttribute('aria-pressed',String(Boolean(visit.lamp)));
      if(visit.checked.has(id)) b.classList.add('is-explored');
      if(dailyHunt.complete&&dailyHunt.sequence.includes(id)) b.classList.add('has-sticker');
      const tip=document.createElement('span'); tip.className='room-tip'; tip.textContent=label; b.append(tip);
      b.addEventListener('click',()=>tapObject(id,action)); canvas.append(b);
    }
    hotspot('clock','Nudge the little clock',65,31,64,64,()=>roomDetail('clock'));
    hotspot('picture','Tap the little picture',345,32,64,64,()=>roomDetail('picture'));
    hotspot('window','Look out of the window',194,91,132,86,()=>roomDetail('window'));
    hotspot('lamp','Switch the lamp',65,121,66,96,()=>roomDetail('lamp'));
    hotspot('plant',health==='wilted'?'Water the wilted little plant':health==='thirsty'?'Water the thirsty little plant':'Water our little plant',347,130,66,92,()=>roomDetail('plant'));
    hotspot('drawer','Open the little drawer',45,222,64,74,()=>roomDetail('drawer'));
    hotspot('hand','Hold Ash’s hand',165,219,64,74,()=>roomDetail('hand'));
    if(!visit.seated) hotspot('seat','Sit beside Ash',243,220,64,74,sit);
    hotspot('cushion',visit.cushion?'Press the MUTE ASH remote again':'Lift the little cushion',320,217,64,68,()=>roomDetail('cushion'));
    hotspot('fridge','Look at your sticker fridge',45,325,68,82,showFridge);
    hotspot('cup','Peek at your Shin Chan cup',339,291,70,76,()=>roomDetail('cup'));
    hotspot('blanket',visit.blanket?'Fold the blanket back':'Tuck us under the blanket',90,383,72,58,()=>roomDetail('blanket'));
    hotspot('another-room','Wander into another room',346,396,68,66,()=>newScene());
    actions.replaceChildren();
    scene.classList.toggle('is-drawer-open',Boolean(visit.drawer));
  }
  function tapObject(id,action) {
    updateDay(); visit.checked.add(id);
    if(id!=='another-room')checkDailyHunt(id);
    action();
    if(id==='another-room')return;
    const target=scene.querySelector(`[data-object="${id}"]`);
    target?.classList.add('is-explored');
    target?.focus({preventScroll:true});
  }
  function checkDailyHunt(id) {
    if(!huntObjects.some(item=>item.id===id))return;
    const hunt=ensureDailyHunt();
    if(hunt.complete)return;
    if(id===hunt.sequence[hunt.progress]){
      hunt.progress+=1;
      if(hunt.progress===3){hunt.complete=true;save();draw();setTimeout(()=>revealKeepsake(),650);return;}
      save();draw();
    } else {
      hunt.progress=id===hunt.sequence[0]?1:0;visit.huntWrong=true;save();draw();
      setTimeout(()=>{visit.huntWrong=false;scene.classList.remove('is-hunt-wrong');},550);
    }
  }
  function closePopup() {
    const popup=document.querySelector('.sofa-popup');
    if(!popup)return;
    if(popup.open)popup.close();popup.remove();
  }
  function openPopup(content,label) {
    closePopup();
    const popup=document.createElement('dialog');popup.className='sofa-popup';popup.setAttribute('aria-label',label);
    const close=makeButton('×',closePopup);close.className='sofa-popup-close';close.setAttribute('aria-label','Close');
    popup.append(close,content);document.body.append(popup);
    popup.addEventListener('click',event=>{if(event.target===popup)closePopup();});popup.addEventListener('close',()=>popup.remove(),{once:true});
    popup.showModal();close.focus({preventScroll:true});return content;
  }
  function roomBurst(x,y,marks=['♡','✦']) {
    const burst=document.createElement('div');burst.className='sofa-room-burst';burst.setAttribute('aria-hidden','true');
    burst.style.left=`${x/4}%`;burst.style.top=`${y/4.3}%`;
    for(let i=0;i<9;i++){
      const m=document.createElement('span');m.textContent=marks[i%marks.length];
      const angle=(i/9)*Math.PI*2;m.style.setProperty('--dx',`${Math.cos(angle)*(36+Math.random()*26)}px`);m.style.setProperty('--dy',`${Math.sin(angle)*32-35}px`);m.style.setProperty('--delay',`${i*.035}s`);burst.append(m);
    }
    scene.querySelector('.sofa-canvas').append(burst);setTimeout(()=>burst.remove(),1500);
  }
  function photoReveal(id,src,alt,wide=false) {
    const p=panel('');p.classList.add('sofa-visual-reveal');p.setAttribute('aria-label',alt);
    const frame=document.createElement('figure');frame.className='sofa-reveal-frame'+(wide?' is-wide':'');
    const img=document.createElement('img');img.src=src;img.alt=alt;img.className='sofa-reveal-photo';frame.append(img);p.append(frame);
    const accents=document.createElement('div');accents.className='sofa-reveal-accents';accents.setAttribute('aria-hidden','true');accents.textContent=wide?'♫ ♡ ♪':'✦ ♡ ✦';p.append(accents);
    return openPopup(p,alt);
  }
  function showLetterDrawer() {
    const archive=window.AshleyHuntLetters;
    const letters=archive?.entries()||[];
    const p=panel('in the little drawer ♡');p.classList.add('sofa-letter-drawer');
    const tabs=document.createElement('div');tabs.className='drawer-tabs';
    const view=document.createElement('div');view.className='drawer-view';
    const lettersTab=makeButton(`Letters · ${letters.length}`,showLetters);
    const drawingTab=makeButton('Your Miku drawing',showDrawing);
    tabs.append(lettersTab,drawingTab);p.append(tabs,view);

    function select(tab) {
      for(const button of [lettersTab,drawingTab])button.setAttribute('aria-pressed',String(button===tab));
      view.replaceChildren();
    }
    function showLetters() {
      select(lettersTab);
      if(!letters.length){
        const empty=document.createElement('p');empty.className='drawer-empty';
        empty.textContent='The first letter will be here when you find it ♡';view.append(empty);return;
      }
      const list=document.createElement('div');list.className='drawer-letter-list';
      letters.forEach(letter=>{
        const item=makeButton('',()=>showSavedLetter(letter));item.classList.add('drawer-letter-choice');
        const date=document.createElement('time');date.dateTime=letter.date;date.textContent=archive.dateLabel(letter.date);
        const preview=document.createElement('span');preview.textContent=`${letter.emoji} ${letter.paragraphs[0]}`.trim();
        item.append(date,preview);list.append(item);
      });view.append(list);
    }
    function showSavedLetter(letter) {
      select(lettersTab);
      const back=makeButton('← All letters',showLetters);back.classList.add('drawer-back');view.append(back);
      const paper=document.createElement('article');paper.className='drawer-saved-letter';
      const corner=document.createElement('span');corner.className='drawer-letter-corner';corner.textContent=letter.corner;
      const emoji=document.createElement('span');emoji.className='drawer-letter-emoji';emoji.textContent=letter.emoji;
      const date=document.createElement('time');date.dateTime=letter.date;date.textContent=archive.dateLabel(letter.date);
      paper.append(corner,emoji,date);
      letter.paragraphs.forEach(line=>{const paragraph=document.createElement('p');paragraph.textContent=line;paper.append(paragraph);});
      view.append(paper);
    }
    function showDrawing() {
      select(drawingTab);
      const frame=document.createElement('figure');frame.className='sofa-reveal-frame is-wide';
      const img=document.createElement('img');img.src='assets/doodles/ashley-miku.jpg';
      img.alt='Ashley’s drawing of Miku and two expressive green characters';img.className='sofa-reveal-photo';
      frame.append(img);view.append(frame);
    }
    if(letters.length)showLetters();else showDrawing();
    openPopup(p,'Letters and Ashley’s Miku drawing');
  }
  function roomDetail(id) {
    whisper.textContent='';
    if(id==='hand'){
      if(!visit.seated)sit();visit.snuggled=true;draw();whisper.textContent='';roomBurst(201,196,['♡','♥']);return;
    }
    if(id==='blanket'){
      if(!visit.seated)visit.seated=true;
      visit.blanket=!visit.blanket;
      if(visit.blanket)visit.snuggled=true;
      draw();whisper.textContent=visit.blanket?'okay. now neither of us is getting up.':'fine. but you are still staying here.';
      roomBurst(158,220,visit.blanket?['♡','✦']:['✦']);return;
    }
    if(id==='lamp'){
      visit.lamp=!visit.lamp;draw();roomBurst(65,93,['✦','♡']);return;
    }
    if(id==='window'){
      visit.theme=fresh('window-weather',themes.filter(t=>t.id!==visit.theme.id));visit.windowScene=fresh('window-scenes',windowScenes);draw();roomBurst(194,91,['✧','✦']);return;
    }
    if(id==='clock'){
      visit.clock67=true;draw();roomBurst(65,31,['✦','♡']);return;
    }
    if(id==='plant'){
      const today=card.querySelector('#together-date').dateTime;memory.plantCare={started:memory.plantCare?.started||today,lastWatered:today};save();visit.water=true;draw();roomBurst(346,115,['❀','♡']);return;
    }
    if(id==='picture'){
      roomBurst(345,32,['✿','♡']);photoReveal(id,'assets/doodles/'+visit.cat.file,visit.cat.alt);return;
    }
    if(id==='drawer'){
      visit.drawer=true;draw();roomBurst(45,219,['♫','♡']);showLetterDrawer();return;
    }
    if(id==='cup'){
      roomBurst(339,287,['♡','✦']);const p=photoReveal(id,'assets/personal/shin-chan-cup.jpg','The Shin Chan cup Ashley recently bought');
      if(!p.querySelector('figcaption')){const caption=document.createElement('figcaption');caption.textContent='you knew what you were doing 😭 ♡';p.querySelector('figure').append(caption);}return;
    }
    if(id==='cushion'){
      if(!visit.cushion){
        visit.cushion=true;visit.remoteReply='';draw();roomBurst(320,211,['♡','✦']);return;
      }
      visit.cushion=false;
      const reply=fresh('remote-replies',['fine. i’m back.','okay. unmuted. happy now?','you lasted three seconds 😭','missed me already?']);
      visit.remoteReply=reply;draw();roomBurst(137,163,['✦','♡']);
      setTimeout(()=>{if(visit.remoteReply===reply){visit.remoteReply='';draw();}},4200);return;
    }
  }
  function makeButton(text, action) { const b = document.createElement('button'); b.type = 'button'; b.className = 'together-button'; b.textContent = text; b.addEventListener('click', action); return b; }
  function sit() {
    visit.seated = true; draw(); whisper.textContent = fresh('arrivals', arrivals);
    scene.querySelector('[data-object="hand"]')?.focus({ preventScroll: true });
  }
  function panel(title) {
    const p = document.createElement('div'); p.className = 'sofa-little-plan';
    if(title){const h = document.createElement('h4'); h.textContent = title; p.append(h);}return p;
  }
  function say(p, words) {
    let line = p.querySelector('.sofa-plan-line');
    if (!line) { line = document.createElement('p'); line.className = 'sofa-plan-line'; line.setAttribute('aria-live', 'polite'); p.append(line); }
    line.textContent = words;
  }
  function stickerPicture(gift, className = 'sofa-sticker-picture') {
    const img = document.createElement('img'); img.src = gift.file; img.alt = gift.alt;
    img.className = className; img.width = 160; img.height = 160; return img;
  }
  function revealKeepsake() {
    const album = window.AshleyStickerAlbum;
    const today = card.querySelector('#together-date').dateTime;
    const existing = album.entries().find(entry => entry.day === today);
    const p = panel(existing ? 'today’s sticker ♡' : 'something under here…');
    p.classList.add('sofa-keepsake');
    function show(gift, animate) {
      p.replaceChildren();
      const h = document.createElement('h4'); h.textContent = 'today’s sticker ♡'; p.append(h);
      const picture = stickerPicture(gift); if (animate) picture.classList.add('is-unfolding'); p.append(picture);
      const count = document.createElement('small'); count.textContent = `${album.entries().length} / 365 · ${gift.date}`; p.append(count);
    }
    if (existing) show(existing, false);
    else if (album.entries().length === 365) {
      p.querySelector('h4').textContent = 'all 365 ♡';
      p.append(makeButton('See them on the fridge', showFridge));
    } else {
      const packet = makeButton('♡', () => {
        // Resolve the local date at the moment of opening, including across midnight.
        const now = new Date();
        const todayKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
        const todayLabel = new Intl.DateTimeFormat(undefined, {month:'short', day:'numeric'}).format(now);
        const gift = album.open(todayKey, todayLabel);
        if (gift) { show(gift, !existing); packet.disabled = true; }
      });
      packet.classList.add('sofa-sticker-packet'); packet.setAttribute('aria-label', 'Unfold today’s sticker');
      const label = document.createElement('small'); label.textContent = 'unfold ♡'; p.append(packet, label);
    }
    openPopup(p,existing?'Today’s sticker':'A folded sticker packet');
  }
  function showFridge() {
    const gifts = window.AshleyStickerAlbum.entries();
    const p = panel(`your stickers · ${gifts.length} / 365`); p.classList.add('sofa-fridge');
    if (!gifts.length) say(p, 'the rug has today’s three clues ♡');
    else {
      const grid = document.createElement('div'); grid.className = 'sofa-fridge-grid';
      const preview = document.createElement('div'); preview.className = 'sofa-sticker-preview'; preview.hidden = true;
      [...gifts].reverse().forEach(gift => {
        const b = makeButton('', () => {
          preview.replaceChildren(stickerPicture(gift)); preview.hidden = false;
          const date = document.createElement('small'); date.textContent = gift.date; preview.append(date);
        });
        b.setAttribute('aria-label', `${gift.date}: ${gift.alt}`);
        const img = stickerPicture(gift, 'sofa-fridge-sticker'); img.loading = 'lazy'; b.append(img); grid.append(b);
      });
      p.append(grid, preview);
    }
    openPopup(p,'Ashley’s sticker collection');
  }
  function newScene(initial = false) {
    let theme;
    if(initial && memory.today?.day===day)theme=themes.find(t=>t.id===memory.today.theme);
    if(!theme){theme=fresh('themes',themes);if(initial){memory.today={day,theme:theme.id};save();}}
    const cat=fresh('room-cat-art',[
      {file:'ashley-flower-cat.jpg',alt:'Ashley’s cat holding a purple flower'},
      {file:'ashley-notebook-cat.jpg',alt:'Ashley’s wide-eyed notebook cat'}
    ]);
    visit={theme,cat,seated:false,blanket:false,remoteReply:'',checked:new Set()};
    ensureDailyHunt();card.querySelector('.sofa-extras')?.remove();closePopup();draw();
    whisper.textContent=theme.line;
  }
  function updateDay() {
    const now = new Date(); const next = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    if (next === day) return;
    day = next;
    const date = card.querySelector('#together-date');
    date.dateTime = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    date.textContent = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(now);
    newScene(true);
  }
  updateDay(); setInterval(updateDay, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateDay(); });
})();
