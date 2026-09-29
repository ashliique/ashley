# For Ashley, always ♡

A small, interactive love letter built as a static website. It needs no account, build step, or server code.

## Preview locally

Open `index.html` in a browser. The letter, notes, reasons, hug, and page-turning scrapbook work without an internet connection. The optional web fonts load when online; fallback fonts are included.

## Publish with GitHub Pages

1. Create a new GitHub repository and upload **only** `index.html`, `styles.css`, `script.js`, and the `assets/` folder. Keep `index.html` at the repository root and `assets/` beside it. Do **not** upload the original `InstaPhotos/` folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your main branch and `/ (root)`, then save.
4. Open the Pages link GitHub shows after it finishes publishing.

If you want to personalize the words, edit the letter in `index.html` and the rotating notes, reasons, and scrapbook captions in `script.js`. The scrapbook cover uses the single-bear illustration in `assets/storybook-ashley.png`, with seven photo pages from `assets/photos/`; the photos have been copied without their original metadata. The original `InstaPhotos/` folder stays local and is excluded by `.gitignore`.

**Before publishing:** the seven scrapbook photos will be visible to anyone who can visit the GitHub Pages site. Make sure she is comfortable with those photos being online. The site can be published without the scrapbook by removing its section and `assets/photos/` first.

The single-bear storybook illustration was generated specifically for this cover with OpenAI image generation. The earlier two-bear illustration is retained locally as `assets/storybook-bears.png` but is not used by the site.
