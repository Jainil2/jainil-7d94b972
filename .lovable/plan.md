# Pass 5 — Discoverable Terminal + Compact HUD Dock

Two related problems to fix:

1. **Terminal is hidden.** `TerminalShell` is fully built and powerful (`help`, `ls`, `cat`, `goto`, `cd`, `open`, `kill`, `restore`, `tokens`, `env`, `ping`, `whoami`…), but it's only reachable via `⌘J` or a tiny icon buried inside the HUD. Most visitors will never know it exists.
2. **HUD is bloated.** The 336px-wide HUD now stacks: env switcher, 3 metric cells, sparkline, 3 vitals cells, identity card, incidents list, 5 social/resume links, and a simulations toggle + shell button. It dominates the bottom-left and looks busy on smaller laptops.

This pass fixes both with one cohesive change: turn the HUD into a **collapsible dock** with tabs, and surface the terminal as a **first-class entry point** in the nav and on mobile.

---

## What you'll get

### 1. Terminal becomes discoverable

- **Nav button** (desktop): a small `▸ shell` chip next to `lab`, with the `⌘J` shortcut shown on hover. Clicking opens the terminal.
- **Mobile FAB** (bottom-right, only on `md:` and below): a circular terminal button so phone visitors — who don't have `⌘J` — can also open it.
- **Hero hint upgrade**: the existing "try `⌘K` or visit `/lab`" line gets `⌘J` added so first-time visitors learn the shell exists.
- **Terminal stays the same internally** — same commands, same UX, same `⌘J` toggle. Just more ways in.

### 2. HUD becomes a compact, professional dock

Replace the always-expanded 336-wide panel with a **two-state dock** in the bottom-left:

- **Collapsed (default after first visit)**: a single ~160px pill showing the most useful at-a-glance signals — env badge, TPS, node health, and a chevron to expand. About a third the visual footprint of today's HUD.
- **Expanded**: a 320px panel with **tabs** instead of one long stack. Three tabs:
  - **`stats`** — env switcher, metric cells (tokens / tps / nodes), TPS sparkline, web-vitals (LCP / INP / CLS).
  - **`me`** — identity card, primary stack line, social links (GitHub / LinkedIn / email / resume / lab).
  - **`ops`** — simulations toggle, open-shell button, env switcher mirror, and any open incidents (so they're still surfaced but not always taking vertical space).

  Incidents get a **red dot badge** on the collapsed pill when any are unacknowledged, so you don't lose the at-a-glance warning when collapsed.

- **Persistence**: collapsed/expanded state and active tab persisted in `localStorage` alongside the existing visibility pref.
- **Hide-completely** behaviour from today's HUD is preserved (the small "hud" pill that re-shows it).
- **Visual language stays consistent** with the rest of the site: same border, card bg, mono font, terminal-green accents — just better organized.

### 3. Cohesion touches

- Command palette (`⌘K`) gains an explicit **"Open Shell"** entry so the two surfaces cross-reference each other.
- Mobile nav menu gets a **`▸ shell`** item too (currently mobile users had no way to open it at all).

---

## Files

| File | Change |
|---|---|
| `src/components/portfolio/Nav.tsx` | Add desktop `shell` button + mobile menu entry; both dispatch the existing `⌘J` event used today by the HUD's shell button. |
| `src/components/portfolio/PortfolioHUD.tsx` | Rewrite layout to collapsed pill + expanded tabbed panel. Same data sources (`useControlPlane`, `useSimulationStore`, `useTokenRate`) — only the chrome changes. |
| `src/components/portfolio/MobileShellFab.tsx` *(new)* | Small circular terminal FAB for `<md` viewports, bottom-right, dispatches `⌘J`. Mounted in `__root.tsx` next to the existing `TerminalShell` / HUD. |
| `src/components/portfolio/Hero.tsx` | Update the interactive-hint line to mention `⌘J shell` alongside `⌘K` and `/lab`. |
| `src/components/portfolio/CommandPalette.tsx` | Add an "Open Shell" command in the existing Settings/utility group. |
| `src/lib/useHudPrefs.ts` | Extend to also persist `expanded: boolean` and `tab: "stats" \| "me" \| "ops"` (additive, backward-compatible read of the existing `visible` key). |
| `src/routes/__root.tsx` | Mount `<MobileShellFab />` alongside the existing HUD/terminal. |

No new dependencies. No backend changes. No route changes.

---

## Technical notes

- The existing pattern `window.dispatchEvent(new KeyboardEvent("keydown", { key: "j", metaKey: true }))` (already used by the HUD's shell button and listened for by `TerminalShell`) is reused everywhere — no new prop drilling, no new global store.
- Tabs are a simple local `useState` inside `PortfolioHUD`, persisted via `useHudPrefs`. No `Tabs` UI primitive needed; styled buttons match the existing terminal aesthetic and stay lighter than pulling shadcn `Tabs`.
- Mobile FAB only renders on `<md` (the HUD is already desktop-only via `hidden md:block`), so the two never overlap.
- Reduced-motion: collapsed↔expanded transition uses the same `transition-all` pattern already in the codebase; no new motion variants.
- Accessibility: dock pill has `aria-expanded`, tabs use `role="tab"` / `aria-selected`, FAB has `aria-label="Open shell"`, and the nav `shell` button advertises the `⌘J` shortcut via `title`.

---

## Out of scope (ask if you want any pulled in)

- Drag-to-reposition the dock
- Multiple dock positions (top-right, etc.)
- Full keyboard navigation through the tabs (Tab/Arrow keys) — current tab buttons remain mouse/Enter accessible via normal focus order
- A separate "always-visible mini terminal" embedded in the page (vs the modal) — the modal stays; we only make it easier to open
