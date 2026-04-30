import { useMemo, useState } from "react";

const buttonClass =
  "rounded border border-border px-2 py-1 font-mono text-xs text-muted-foreground hover:border-terminal/50 hover:text-terminal";
const activeClass = "border-terminal bg-terminal/10 text-terminal";
const panelClass = "rounded border border-border bg-background/40 p-3 font-mono text-xs";

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={panelClass}>
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg text-terminal">{value}</p>
    </div>
  );
}

export function BellmanFordLab() {
  const [pass, setPass] = useState(0);
  const edges = [
    ["S", "A", 4],
    ["S", "B", 5],
    ["A", "C", -2],
    ["B", "C", 3],
    ["C", "D", 2],
  ] as const;
  const distancesByPass = [
    { S: 0, A: "∞", B: "∞", C: "∞", D: "∞" },
    { S: 0, A: 4, B: 5, C: "∞", D: "∞" },
    { S: 0, A: 4, B: 5, C: 2, D: "∞" },
    { S: 0, A: 4, B: 5, C: 2, D: 4 },
  ];
  const distances = distancesByPass[pass];

  return (
    <div className="space-y-4">
      <button
        onClick={() => setPass((p) => (p + 1) % distancesByPass.length)}
        className={buttonClass}
      >
        relax pass {pass + 1}
      </button>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(distances).map(([node, distance]) => (
          <Metric key={node} label={node} value={distance} />
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {edges.map(([from, to, weight]) => (
          <div key={`${from}-${to}`} className={panelClass}>
            <span className="text-cyan-accent">{from}</span> -&gt;{" "}
            <span className="text-cyan-accent">{to}</span>{" "}
            <span className={weight < 0 ? "text-destructive" : "text-muted-foreground"}>
              weight {weight}
            </span>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Bellman-Ford relaxes every edge V-1 times, so negative edges are allowed.
      </p>
    </div>
  );
}

export function FloydWarshallLab() {
  const [k, setK] = useState(0);
  const labels = ["A", "B", "C", "D"];
  const matrices = [
    [
      [0, 3, "∞", 7],
      [8, 0, 2, "∞"],
      [5, "∞", 0, 1],
      [2, "∞", "∞", 0],
    ],
    [
      [0, 3, "∞", 7],
      [8, 0, 2, 15],
      [5, 8, 0, 1],
      [2, 5, "∞", 0],
    ],
    [
      [0, 3, 5, 7],
      [8, 0, 2, 15],
      [5, 8, 0, 1],
      [2, 5, 7, 0],
    ],
    [
      [0, 3, 5, 6],
      [7, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ],
  ];
  const matrix = matrices[k];

  return (
    <div className="space-y-4">
      <button
        onClick={() => setK((value) => (value + 1) % matrices.length)}
        className={buttonClass}
      >
        allow intermediate {labels[k]}
      </button>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-xs">
          <tbody>
            {matrix.map((row, r) => (
              <tr key={labels[r]}>
                {row.map((cell, c) => (
                  <td
                    key={`${r}-${c}`}
                    className={`border border-border p-3 text-center ${r === k || c === k ? "bg-terminal/10 text-terminal" : "text-foreground"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Dynamic programming update: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).
      </p>
    </div>
  );
}

export function PrimLab() {
  const [step, setStep] = useState(0);
  const picked = [
    ["A"],
    ["A", "B"],
    ["A", "B", "C"],
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D", "E"],
  ];
  const costs = [0, 2, 5, 6, 9];
  const active = picked[step];

  return (
    <div className="space-y-4">
      <button onClick={() => setStep((s) => (s + 1) % picked.length)} className={buttonClass}>
        add cheapest crossing edge
      </button>
      <div className="grid grid-cols-5 gap-2">
        {["A", "B", "C", "D", "E"].map((node) => (
          <div
            key={node}
            className={`${panelClass} text-center ${active.includes(node) ? activeClass : ""}`}
          >
            {node}
          </div>
        ))}
      </div>
      <Metric label="MST cost so far" value={costs[step]} />
      <p className="font-mono text-xs text-muted-foreground">
        Prim grows one connected tree by repeatedly choosing the cheapest edge crossing from visited
        to unvisited nodes.
      </p>
    </div>
  );
}

export function KruskalLab() {
  const sortedEdges = [
    ["A-B", 2],
    ["C-D", 3],
    ["B-C", 4],
    ["D-E", 5],
    ["A-C", 6],
  ] as const;
  const [count, setCount] = useState(0);
  const accepted = sortedEdges.slice(0, count);
  const cost = accepted.reduce((sum, [, w]) => sum + w, 0);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setCount((c) => (c + 1) % (sortedEdges.length + 1))}
        className={buttonClass}
      >
        consider next edge
      </button>
      <div className="space-y-2">
        {sortedEdges.map(([edge, weight], i) => (
          <div key={edge} className={`${panelClass} ${i < count ? activeClass : ""}`}>
            {edge} · weight {weight} {i < count ? "accepted" : "pending"}
          </div>
        ))}
      </div>
      <Metric label="accepted cost" value={cost} />
    </div>
  );
}

export function MaxFlowLab() {
  const [flow, setFlow] = useState(0);
  const augmentations = [0, 3, 5, 7];
  const value = augmentations[flow];

  return (
    <div className="space-y-4">
      <button
        onClick={() => setFlow((f) => (f + 1) % augmentations.length)}
        className={buttonClass}
      >
        augment path
      </button>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["S->A", Math.min(value, 4), 4],
          ["S->B", Math.max(0, value - 4), 3],
          ["A/B->T", value, 7],
        ].map(([edge, used, cap]) => (
          <div key={edge} className={panelClass}>
            <div className="mb-2 flex justify-between text-muted-foreground">
              <span>{edge}</span>
              <span>
                {used}/{cap}
              </span>
            </div>
            <div className="h-2 rounded bg-card">
              <div
                className="h-full rounded bg-terminal"
                style={{ width: `${(Number(used) / Number(cap)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <Metric label="max flow value" value={value} />
    </div>
  );
}

export function EdmondsKarpLab() {
  const [round, setRound] = useState(0);
  const paths = [
    { path: "S -> A -> T", bottleneck: 3, total: 3 },
    { path: "S -> B -> T", bottleneck: 2, total: 5 },
    { path: "S -> A -> B -> T", bottleneck: 1, total: 6 },
  ];
  const current = paths[round];

  return (
    <div className="space-y-4">
      <button onClick={() => setRound((r) => (r + 1) % paths.length)} className={buttonClass}>
        BFS augment
      </button>
      <div className={panelClass}>
        <p className="text-muted-foreground">shortest augmenting path</p>
        <p className="mt-2 text-terminal">{current.path}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Metric label="bottleneck" value={current.bottleneck} />
        <Metric label="total flow" value={current.total} />
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Edmonds-Karp is Ford-Fulkerson with BFS, giving a polynomial O(VE^2) bound.
      </p>
    </div>
  );
}

export function MinCutLab() {
  const [cut, setCut] = useState<"left" | "right">("left");
  const capacity = cut === "left" ? 7 : 9;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["left", "right"] as const).map((side) => (
          <button
            key={side}
            onClick={() => setCut(side)}
            className={`${buttonClass} ${cut === side ? activeClass : ""}`}
          >
            {side} cut
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["S", "A", "B", "T"].map((node, i) => (
          <div
            key={node}
            className={`${panelClass} text-center ${
              (cut === "left" && i < 3) || (cut === "right" && i < 2) ? activeClass : ""
            }`}
          >
            {node}
          </div>
        ))}
      </div>
      <Metric label="cut capacity" value={capacity} />
      <p className="font-mono text-xs text-muted-foreground">
        Max-flow min-cut says the maximum flow value equals the smallest source/sink cut capacity.
      </p>
    </div>
  );
}

export function BipartiteMatchingLab() {
  const [step, setStep] = useState(0);
  const matches = [["u1-jobA"], ["u1-jobA", "u2-jobC"], ["u1-jobB", "u2-jobC", "u3-jobA"]];
  const current = matches[step];
  const left = ["u1", "u2", "u3"];
  const right = ["jobA", "jobB", "jobC"];

  return (
    <div className="space-y-4">
      <button onClick={() => setStep((s) => (s + 1) % matches.length)} className={buttonClass}>
        augment matching
      </button>
      <div className="grid grid-cols-[1fr_1fr] gap-6">
        <div className="space-y-2">
          {left.map((node) => (
            <div key={node} className={panelClass}>
              {node}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {right.map((node) => (
            <div key={node} className={panelClass}>
              {node}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded border border-border bg-background/40 p-3 font-mono text-xs">
        <p className="text-muted-foreground">matches</p>
        <p className="mt-2 text-terminal">{current.join(", ")}</p>
      </div>
    </div>
  );
}
