# For Ashley, always ♡

A small, interactive love letter built as a static website. It needs no account, build step, or server code.

## Preview locally

Open `index.html` in a browser. The letter, notes, reasons, hug, and page-turning scrapbook work without an internet connection. The optional web fonts load when online; fallback fonts are included.

## Publish with GitHub Pages

1. Create a new GitHub repository and upload `index.html`, `styles.css`, `script.js`, `treasure.css`, `treasure.js`, `together.css`, `together.js`, `stickers.js`, `daily-letter.js`, and the `assets/` folder. Keep these files at the repository root and `assets/` beside them. Do **not** upload the original `InstaPhotos/` folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your main branch and `/ (root)`, then save.
4. Open the Pages link GitHub shows after it finishes publishing.

If you want to personalize the words, edit the letter in `index.html` and the rotating notes, reasons, and scrapbook captions in `script.js`. The scrapbook cover uses the single-bear illustration in `assets/storybook-ashley.png`, with seven photo pages from `assets/photos/`; the photos have been copied without their original metadata. The original `InstaPhotos/` folder stays local and is excluded by `.gitignore`.

**Before publishing:** the seven scrapbook photos will be visible to anyone who can visit the GitHub Pages site. Make sure she is comfortable with those photos being online. The site can be published without the scrapbook by removing its section and `assets/photos/` first.

The single-bear storybook illustration was generated specifically for this cover with OpenAI image generation. The earlier two-bear illustration is retained locally as `assets/storybook-bears.png` but is not used by the site.

## Saved spot and hidden surprises

“I saved you a spot” is a clickable illustrated room. Tap the empty seat to sit beside Ash; tap his bear to bring the two bears closer without changing their height. The non-photo surprises happen directly in the room: the lamp changes the light, the clock hands point to 6 and 7, the window cycles through six animated skies, and the cushion lifts to reveal a **MUTE ASH** remote. Ash’s expression changes while muted and returns to normal when the remote is pressed again. The “oh come on” bubble and randomized unmuted reply fade by themselves. The daily trail heart on the cushion disappears once the remote is revealed so it cannot cover the remote. A folded blanket near the lower left tucks both bears in and can be folded back again. The drawer opens Ashley's Miku drawing, the green cup opens the photo of the Shin Chan cup she recently bought, and the wall frame uses one of Ashley's cat drawings. Uploaded images open in pop-ups at their original proportions. The Rilakkuma photo remains in the hunt and scrapbook rather than being repeated as a room discovery.

The rug has a yarn ball, a little bunny and three stitched symbols. Those symbols are the day's random treasure trail. Tapping the matching room objects in order fills the symbols with colour; a wrong object gently resets the trail. The same combination survives room changes and reloads for that local calendar day. There are no room sound effects. The round arrow changes the room's weather without changing the daily trail. Decorative motion has a reduced-motion alternative, and the objects have keyboard controls and generous tap areas on phones.

The plant remembers the last local calendar day it was watered. It looks healthy after watering, becomes thirsty after two days, and turns brown and wilted after three days without water. Watering it again revives it. This plant state stays in that browser with the sticker collection.

Completing the three-object trail opens that day's folded sticker packet. There are 365 unique SVG designs: 73 illustrated motifs with five different accessory compositions and expressions each. A shuffled order gives every design once. There are no notes attached to them. Replaying or reloading cannot give a second sticker that day. Missed days do not consume stickers; there is no streak or expiry. Once all 365 are collected, the collection stays available and stops giving new ones.

The fridge shows her collected stickers; tapping one enlarges it and shows its date. The collection is stored in her browser and does not sync between devices; clearing browser storage clears it. It works in memory for a visit if storage is unavailable. The former twelve note magnets and sofa kiss control have been retired.

The hunt deals one of six settings with six objects from its own pool. Nineteen possible objects carry the jokes, drawings and clues. Each round chooses one of seven doodles, including Ashley's flower cat and notebook cat. That drawing stays fixed for the round, with no manual switching or captions below it. Her drawings have short reactions above them; their JPG files are copied unchanged. Her Miku drawing appears only when the room drawer is opened.

The Miku drawing and Shin Chan cup belong to the room. The movie browser detour, aloo, benchod, uncle toilet and 67 belong to the hunt. The phone in the hunt now has unsent message drafts. The final hunt letter opens with 😘 and has no Ash signature. The loose-floorboard discovery has been removed. The symbol lock still shuffles. The final note uses the dated message in `daily-letter.js` when one is available, with the shuffled 768-combination letter as its fallback.

## Write today's hunt letter

Open `daily-letter.js` and replace the empty date and paragraph list. Use Ashley's local calendar date in `YYYY-MM-DD` form:

```js
window.AshleyDailyLetter = {
  date: '2026-10-01',
  paragraphs: [
    'Write your first paragraph here.',
    'You can add as many paragraphs as you want.'
  ]
};
```

Upload that one changed file to GitHub. On that date, it replaces the shuffled final letter after she finishes the hunt. If the date is different or the paragraph list is empty, the original shuffled letter appears instead.

The eleventh parcel shake plays the exact uploaded cartoon “I love you” MP3 from `assets/audio/i-love-you.mp3` and adds a replay button. Kisses and little hearts float across the screen during playback. Replaying starts a fresh shower; finishing the audio or opening the parcel stops it. Switching away from the page pauses the audio and removes the shower. A reduced-motion version gently fades the marks in place. The supplied MP3 was copied unchanged and works offline. No automatic or background playback is used. The earlier synthetic WAV has been removed from the site.

Optional surprises are hidden in the heart sticker, inspected objects, repeated object checks, the lock and the parcel. The exact triggers are in `EASTER-EGGS.md`, which is not linked from the website. You can leave that guide out of the GitHub upload to keep the spoilers local.

Edit the sofa in `together.js` and `together.css`, the sticker collection in `stickers.js` and `assets/stickers/`, the hunt in `treasure.js` and `treasure.css`, and today's final hunt letter in `daily-letter.js`. The original intro, letter, existing interactive cards, photo captions and scrapbook keep the uploaded ZIP's wording and behaviour.

For an existing GitHub repository, upload the site files from this ZIP's `ashley-main` folder to the repository root, preserving the `assets/` folder structure. Replace the HTML, CSS, scripts and doodles with these versions; the original photo and cover assets are unchanged. There is no build step or backend. To publish a new personal final letter, update and upload `daily-letter.js` for that date.
