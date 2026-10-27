# Apex Striker 3D

An original 3D arcade football game for the browser (Chrome, desktop and Android). No backend and no build step. All clubs, players and crests are fictional.

## Modes and features
- **Exhibition**: pick two clubs, a formation, difficulty and tactics.
- **Career**: 5-round season with a points table and coin bonus.
- **Tournament**: semi-final and final cup.
- **Player Shop** and **Create Player**: buy stars with coins and build your own player.
- 11-a-side matches with 6 formations: 4-3-3, 4-4-2, 4-2-3-1, 3-5-2, 3-4-3, 5-3-2.
- Tactics: attacking style (Balanced, Possession, Fast attack, Counter), defensive style (Balanced, High press, Mid block, Deep defence) and mentality (Defensive to Ultra attacking).
- Difficulty: Easy, Normal, Hard, Legendary (changes AI speed, tackling and shot accuracy).
- Fouls with yellow and red cards (red cards leave the opponent or you a player short).
- Progress, coins, settings and tactics are saved in `localStorage`.

## Controls
| Action | Keyboard | Touch |
|---|---|---|
| Move | WASD / arrows | Joystick |
| Sprint | Shift | RUN |
| Pass / Through ball | J / L | PASS / THRU |
| Shoot (hold to charge) | K | SHOOT |
| Tackle | Space | TACKLE |
| Switch player | E | SWAP |

Landscape only. Phones request fullscreen and lock orientation when a match starts.

## Project structure
```
index.html      page and menus
style.css       styles
manifest.json   PWA/landscape settings
icon.svg       icon
data.js      constants, teams, formations, saves
audio.js     Web Audio sounds
ui.js        menus and settings
career.js    career, shop, create player
controls.js  keyboard, touch joystick and buttons
stadium.js   3D pitch, stadium, renderer setup
team.js      teams, tactics, 3D players
match.js     match flow, passing, shooting, tackling, cards, restarts
playerAI.js  movement and AI decisions
ball.js      ball physics, goals, saves
camera.js    HUD and broadcast camera
results.js   full-time, pause, quit
main.js      start-up
```
Scripts are plain files loaded in order, so there is nothing to compile.

## Run locally
Open `index.html` in Chrome, or serve the folder: `python3 -m http.server 8000` then visit http://localhost:8000

## Deploy to GitHub Pages
1. Create a repository.
2. Upload everything in this folder, keeping the `js/` and `assets/` folders, to the repository root.
3. Go to **Settings, Pages**, choose **Deploy from a branch**, `main`, `/ (root)`, then Save.
4. The game appears at `https://<your-username>.github.io/<repo-name>/` after a minute or two. Hard refresh if you see an old version.

The game loads Three.js r128 from cdnjs. To host it yourself, put `three.min.js` in `assets/` and change the script tag in `index.html`.

## Known limitations
No offside, penalties, free-kick aiming, crosses or headers yet. No replays, weather, extra stadiums or transfer market yet. Players are simple procedural models, and goalposts are not solid.

## Roadmap
Stage 2: set pieces and offside. Stage 3: Practice, full tournament, Quick Match flow. Stage 4: squad management, transfers, multi-season career. Stage 5: replays, stats, Phantom Mode, weather, stadiums.

Note: this is the flat version, with all files in one folder (no js/ or assets/ folders), so it can be uploaded from a phone in one go.
