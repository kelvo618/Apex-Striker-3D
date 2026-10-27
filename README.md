# Apex Striker 3D

A 3D arcade 7-a-side football game that runs in the browser (Chrome, desktop and Android). No backend, no build step. All teams, players and crests are fictional.

## Modes
- **Exhibition**: pick any two teams and a formation.
- **Career**: 5-round season against the other teams (3 pts win, 1 draw). Coin bonus at season end.
- **Tournament**: semi-final then final cup.
- **Player Shop**: spend coins on star players; they join your team automatically.
- **Create Player**: set name, position, build and skin tone; your player is added to your team.
- Progress, coins, settings and purchases are saved in `localStorage`.

## Controls
| Action | Keyboard | Touch |
|---|---|---|
| Move | WASD / arrows | Joystick |
| Sprint | Shift | RUN |
| Pass / Through ball | J / L | PASS / THRU |
| Shoot (hold to charge) | K | SHOOT |
| Tackle | Space | TACKLE |
| Switch player | E | SWAP |

The game is landscape-only; on phones it requests fullscreen and locks orientation when a match starts.

## Run locally
Open `index.html` in Chrome. For installable/PWA behaviour, serve the folder instead:
`python3 -m http.server 8000` then visit http://localhost:8000

## Deploy to GitHub Pages
1. Create a new GitHub repository (for example `apex-striker`).
2. Upload everything in this folder (`index.html`, `manifest.json`, `assets/`, `README.md`, `LICENSE`, `.nojekyll`, `.gitignore`) to the repository root.
3. Go to **Settings → Pages**, set Source to **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
4. After a minute your game is live at `https://Kelvo618.github.io/Apex-Striker-3D

## Offline / no CDN
The game loads Three.js r128 from cdnjs. To self-host it, download `three.min.js` r128 into `assets/` and change the script tag in `index.html` to `<script src="assets/three.min.js"></script>`.

## Graphics settings
Low, Medium and High change render resolution, shadows and crowd density. Use Low on older phones.

## Known limitations
7-a-side only; no practice mode or radar yet; goalposts are not solid; basic AI; players are simple procedural models.

## Roadmap
Practice mode, radar, post collisions, offside, more formations, split code into modules, real player models.
