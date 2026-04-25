
# Pass 6 — Lab Expansion: More Modules + Deep Learning Content

You currently have **8 labs** across 4 categories. The goal of this pass is two-fold:

1. **Add 6 new in-depth modules** spanning DSA, System Design, and Distributed Systems — chosen to cover gaps (concurrency, rate limiting, replication, indexing, hashing, graph traversal beyond Dijkstra).
2. **Turn each lab page from a "play widget" into a real learning page** — concept explainer, complexity table, annotated code snippet, real-world usage, and references. This is what makes visitors actually *learn* something instead of just clicking around.

Total after this pass: **14 labs**, each with structured educational content.

---

## Part A — 6 new lab modules

Each is a self-contained interactive component under `src/components/system-design/`. All follow the existing `GameCard` shell so they look consistent.

### 1. `ConsistentHashLab` — `/lab/consistent-hashing`
- **Category**: Distributed Systems
- **What it shows**: Ring of N virtual nodes; you add/remove physical nodes and watch how only ~K/N keys remap (vs. naive `hash % N` which remaps almost everything). Side-by-side counter: "keys remapped: consistent vs naive".
- **You already have** `ConsistentHashRing.tsx` used in Projects — this lab wraps it in a fuller educational page with a "Naive Mode" toggle and key-remap counter.
- **Skill tags**: `Distributed Systems`, `System Design`, `Redis`

### 2. `LeakyBucketLab` — `/lab/rate-limiter`
- **Category**: Distributed Systems
- **What it shows**: Side-by-side **Token Bucket vs Leaky Bucket vs Fixed Window vs Sliding Window** rate limiters. Click "burst 20 requests" and watch which strategies allow/deny what. Live throughput gauge.
- **Reuses**: existing `useTokenBucket` hook + `TokenBucket` component logic, expanded to 4 strategies.
- **Skill tags**: `System Design`, `Distributed Systems`

### 3. `BTreeIndexLab` — `/lab/btree-index`
- **Category**: Data Structures
- **What it shows**: Animated B-Tree (order 4) — insert keys, watch nodes split and the tree grow upward. Toggle "table scan vs B-tree lookup" to compare comparison counts on 1000 rows. Caption explains why Postgres/MySQL use B-trees instead of binary trees (disk page locality).
- **Skill tags**: `DSA`, `Postgres`, `System Design`

### 4. `GraphBFSDFSLab` — `/lab/graph-traversal`
- **Category**: Algorithms
- **What it shows**: Same graph rendered twice — left runs BFS, right runs DFS. Step through with play/pause/step. Shows queue vs stack contents live. Highlights why BFS finds shortest unweighted path and DFS doesn't.
- **Complements** the existing Dijkstra lab (which is weighted).
- **Skill tags**: `DSA`

### 5. `CapTheoremLab` — `/lab/cap-theorem`
- **Category**: Distributed Systems
- **What it shows**: A 3-node cluster with a partition slider. Pick **CP** (refuse writes on minority side) or **AP** (accept writes, diverge). Trigger a partition and see read/write availability on each side. After healing, show the conflict-resolution step (last-write-wins vs vector clocks).
- **Skill tags**: `Distributed Systems`, `System Design`

### 6. `DeadlockLab` — `/lab/deadlock`
- **Category**: Distributed Systems (concurrency)
- **What it shows**: Dining philosophers (5 forks, 5 philosophers). Run "naive" mode → instant deadlock visualization (wait-for graph cycle). Switch to "resource ordering" or "asymmetric" → watch them eat. Live wait-for graph.
- **Skill tags**: `DSA`, `System Design`, `Distributed Systems`

---

## Part B — Deep learning content per lab

Right now `LabEntry` only carries `caption` (one line) + `whereUsed`. I'll extend it so every lab page renders a full educational layout below the playable widget.

### Schema additions to `LabEntry` (in `src/lib/labRegistry.ts`)

```ts
interface LabEntry {
  // ...existing fields
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readingTimeMin: number;          // e.g. 4
  concept: string;                 // 2–4 paragraphs of plain-English explanation
  complexity: {                    // rendered as a small table
    operation: string;             // e.g. "Insert", "Lookup"
    time: string;                  // e.g. "O(k)"
    space?: string;
  }[];
  codeSnippet?: {                  // canonical implementation excerpt
    language: "ts" | "py" | "go" | "sql";
    code: string;
  };
  realWorld: string[];             // bullet list — "Used by Cassandra for…", "Postgres uses…", etc.
  pitfalls?: string[];             // common mistakes / gotchas
  references?: { label: string; href: string }[]; // papers, docs, blog posts
}
```

All 14 labs (8 existing + 6 new) will be filled in. For example, the **Bloom Filter** entry would carry:
- concept: probabilistic membership, why false positives are acceptable in caches/CDNs, how `k` and `m` interact
- complexity table: insert O(k), lookup O(k), space O(m bits)
- code snippet: 15-line TS implementation
- realWorld: Bigtable row key filter, Cassandra SSTable summaries, Chrome's malicious URL list, CDN cache-miss avoidance
- pitfalls: can't delete (use Counting Bloom), false-positive rate compounds across layers
- references: Burton Howard Bloom 1970 paper, Google Bigtable paper

### New rendering on the lab detail page (`src/routes/lab.$slug.tsx`)

Below the existing `GameCard`, render four collapsible-by-default sections:

1. **📖 Concept** — prose, 2–4 paragraphs. Open by default.
2. **⚡ Complexity** — small table.
3. **💻 Reference implementation** — syntax-highlighted code snippet (use a lightweight highlighter like `prismjs` or a pre/code with manual color classes — leaning toward the latter to avoid a heavy dep).
4. **🌍 In the wild** — bullet list of real-world systems using this technique, plus pitfalls.
5. **🔗 References** — links to papers / docs.

Difficulty badge + reading-time chip render in the page header next to the title.

### New rendering on the lab index page (`src/routes/lab.tsx`)

- **Category filter pills**: "All • Distributed Systems • Data Structures • Algorithms • Security" (4 → 5 filters, since concurrency lives under Distributed Systems).
- **Group by category** when "All" is selected, with a section header per category.
- **Difficulty badge** on each card (Beginner = green, Intermediate = amber, Advanced = magenta).
- **Reading-time chip** ("~4 min read") on each card.
- Keep the existing progress counter + reset button.

---

## Part C — Wiring & polish

- **`labRegistry.ts`**: register the 6 new components and fill in the new fields for all 14 labs.
- **`public/sitemap.xml`**: add the 6 new `/lab/<slug>` URLs.
- **CommandPalette**: regenerate lab entries from `labRegistry` (already does this — no change needed beyond the registry growing).
- **Skills section**: existing `getLabsForSkill` will pick up new entries automatically as long as `skillTags` are populated.
- **TerminalShell**: if there's a `lab` or `ls /lab` command, it'll list the new ones automatically (will verify and adjust if needed).

---

## Files to create

- `src/components/system-design/ConsistentHashLab.tsx`
- `src/components/system-design/LeakyBucketLab.tsx`
- `src/components/system-design/BTreeIndexLab.tsx`
- `src/components/system-design/GraphBFSDFSLab.tsx`
- `src/components/system-design/CapTheoremLab.tsx`
- `src/components/system-design/DeadlockLab.tsx`
- `src/components/system-design/LabContent.tsx` — shared component that renders Concept / Complexity / Code / Real-world / References sections below `GameCard`
- `src/components/system-design/CodeBlock.tsx` — small syntax-highlighted code block (no extra deps; manual token coloring with Tailwind classes)

## Files to edit

- `src/lib/labRegistry.ts` — extend interface; register 6 new labs; add educational fields to all 14 entries
- `src/routes/lab.$slug.tsx` — render `<LabContent />` below `<GameCard>`; add difficulty + reading-time chips
- `src/routes/lab.tsx` — add category filter pills + grouping by category + difficulty/time badges on cards
- `public/sitemap.xml` — add 6 new lab URLs

---

## Out of scope for this pass (ask if you want any moved in)

- Quizzes / "test what you learned" mode after each lab
- Saving lab notes to the backend
- Exporting a lab as a PDF cheat sheet
- A `/lab/playground` open code editor (Monaco) where users can write and run their own implementations
- Sound effects / haptics
- Multiplayer Raft / leader-election game

---

After approval I'll build it in one pass: 6 new components + extended registry with full educational content for all 14 labs + new index/detail layouts + sitemap update.
