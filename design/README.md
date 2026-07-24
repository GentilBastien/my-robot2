# Design mockups

Static, clickable HTML/CSS previews of the MyRobot2 client UI (Login → Queue → Proposal → Combat), built on the tokens in `../design-system`. Not wired to the real WebSocket client in `../client/src` — open a file directly in a browser to review.

- `v0-mockup.html` — first pass: cyberpunk HUD terminal aesthetic, permanent self/enemy HUD panels side by side.
- `v1-mockup.html` — deep-space Sci-Fi background (starfield/nebula/planet), self mini-portrait pinned bottom-left, single on-demand "target card" shown only when a robot is clicked/targeted.
- `v2-mockup.html` — current: sober "Star Wars control panel" styling (muted beveled borders, LED-dot buttons, no neon glow), a turn-order strip supporting multiple robots/teams (self/ally/enemy, not a self/enemy binary), and a hex grid with naturalistic terrain (sand/rock/grass/snow/water, elevation shading, glowing resource clusters) inspired by a reference screenshot.

Use the "APERÇU DESIGN" tab switcher (top-right) to jump between screens. See each file's header HTML comment for the list of documented placeholder/assumption choices.
