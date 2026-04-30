import { useMemo, useState } from "react";

const buttonClass =
  "rounded border border-border px-2 py-1 font-mono text-xs text-muted-foreground hover:border-terminal/50 hover:text-terminal";
const activeClass = "border-terminal bg-terminal/10 text-terminal";
const nodeClass =
  "flex size-12 items-center justify-center rounded-full border border-border bg-background/60 font-mono text-xs";

const nodes = ["A", "B", "C", "D", "E", "F"];
const edges: [string, string][] = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["C", "D"],
  ["E", "F"],
];

function GraphNodes({ active = [] }: { active?: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {nodes.map((node) => (
        <div key={node} className={`${nodeClass} ${active.includes(node) ? activeClass : ""}`}>
          {node}
        </div>
      ))}
    </div>
  );
}

export function GraphRepresentationLab() {
  const [mode, setMode] = useState<"list" | "matrix">("list");
  const adjacency = useMemo(
    () =>
      nodes.map((node) => ({
        node,
        neighbors: edges
          .filter(([a, b]) => a === node || b === node)
          .map(([a, b]) => (a === node ? b : a)),
      })),
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["list", "matrix"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`${buttonClass} ${mode === m ? activeClass : ""}`}
          >
            adjacency {m}
          </button>
        ))}
      </div>
      <GraphNodes />
      {mode === "list" ? (
        <div className="grid gap-2 md:grid-cols-2">
          {adjacency.map(({ node, neighbors }) => (
            <div
              key={node}
              className="rounded border border-border bg-background/40 p-2 font-mono text-xs"
            >
              <span className="text-cyan-accent">{node}</span> -&gt; {neighbors.join(", ") || "[]"}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <tbody>
              {nodes.map((row) => (
                <tr key={row}>
                  {nodes.map((col) => {
                    const linked = edges.some(
                      ([a, b]) => (a === row && b === col) || (a === col && b === row),
                    );
                    return (
                      <td
                        key={col}
                        className={`border border-border p-2 text-center ${linked ? "bg-terminal/10 text-terminal" : "text-muted-foreground"}`}
                      >
                        {linked ? 1 : 0}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function ConnectedComponentsLab() {
  const [component, setComponent] = useState(0);
  const groups = [
    ["A", "B", "C", "D"],
    ["E", "F"],
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {groups.map((group, i) => (
          <button
            key={group.join("")}
            onClick={() => setComponent(i)}
            className={`${buttonClass} ${component === i ? activeClass : ""}`}
          >
            component {i + 1}
          </button>
        ))}
      </div>
      <GraphNodes active={groups[component]} />
      <div className="rounded border border-border bg-background/40 p-3 font-mono text-xs text-muted-foreground">
        DFS/BFS from any unvisited node marks one connected component. Repeat until every node is
        visited.
      </div>
    </div>
  );
}

export function CycleDetectionLab() {
  const [extraEdge, setExtraEdge] = useState(false);
  const cycleNodes = extraEdge ? ["A", "B", "D", "C"] : [];

  return (
    <div className="space-y-4">
      <button onClick={() => setExtraEdge((v) => !v)} className={buttonClass}>
        {extraEdge ? "remove C-A edge" : "add C-A edge"}
      </button>
      <GraphNodes active={cycleNodes} />
      <div className="rounded border border-border bg-background/40 p-3 font-mono text-xs">
        <p className={extraEdge ? "text-destructive" : "text-terminal"}>
          {extraEdge ? "cycle found: A -> B -> D -> C -> A" : "no cycle in the shown DFS tree"}
        </p>
        <p className="mt-2 text-muted-foreground">
          Directed DFS uses a recursion stack; undirected DFS checks whether a visited neighbor is
          not the parent.
        </p>
      </div>
    </div>
  );
}

export function StronglyConnectedComponentsLab() {
  const [step, setStep] = useState(0);
  const components = [["A", "B", "C"], ["D", "E"], ["F"]];
  const active = components[Math.min(step, components.length - 1)];

  return (
    <div className="space-y-4">
      <button onClick={() => setStep((s) => (s + 1) % components.length)} className={buttonClass}>
        next SCC
      </button>
      <GraphNodes active={active} />
      <div className="rounded border border-border bg-background/40 p-3 font-mono text-xs text-muted-foreground">
        Tarjan tracks discovery time and low-link values. A node whose low-link equals its discovery
        index is the root of one strongly connected component.
      </div>
    </div>
  );
}

export function BipartiteCheckLab() {
  const [conflict, setConflict] = useState(false);
  const colors: Record<string, "left" | "right"> = {
    A: "left",
    B: "right",
    C: "right",
    D: "left",
    E: "left",
    F: conflict ? "left" : "right",
  };

  return (
    <div className="space-y-4">
      <button onClick={() => setConflict((v) => !v)} className={buttonClass}>
        {conflict ? "fix coloring" : "add odd-cycle conflict"}
      </button>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {nodes.map((node) => (
          <div
            key={node}
            className={`${nodeClass} ${
              colors[node] === "left"
                ? "border-cyan-accent text-cyan-accent"
                : "border-terminal text-terminal"
            } ${conflict && node === "F" ? "ring-1 ring-destructive" : ""}`}
          >
            {node}
          </div>
        ))}
      </div>
      <p
        className={`rounded border border-border bg-background/40 p-3 font-mono text-xs ${conflict ? "text-destructive" : "text-muted-foreground"}`}
      >
        {conflict
          ? "Not bipartite: an edge connects nodes with the same color."
          : "Bipartite: BFS can 2-color every edge endpoint with opposite colors."}
      </p>
    </div>
  );
}

export function GraphUnionFindLab() {
  const [parent, setParent] = useState([0, 1, 2, 3, 4, 5]);
  const unions: [number, number][] = [
    [0, 1],
    [1, 2],
    [3, 4],
    [2, 4],
  ];
  const [step, setStep] = useState(0);

  function rootOf(parents: number[], x: number): number {
    let cur = x;
    while (parents[cur] !== cur) cur = parents[cur];
    return cur;
  }

  function applyUnion() {
    const [a, b] = unions[step % unions.length];
    setParent((p) => {
      const next = [...p];
      const ra = rootOf(next, a);
      const rb = rootOf(next, b);
      next[rb] = ra;
      return next.map((_, i) => rootOf(next, i));
    });
    setStep((s) => s + 1);
  }

  const groups = useMemo(() => {
    const grouped = new Map<number, string[]>();
    parent.forEach((p, i) => grouped.set(p, [...(grouped.get(p) ?? []), nodes[i]]));
    return [...grouped.entries()];
  }, [parent]);

  return (
    <div className="space-y-4">
      <button onClick={applyUnion} className={buttonClass}>
        union edge {unions[step % unions.length].join("-")}
      </button>
      <div className="grid gap-2 md:grid-cols-3">
        {groups.map(([root, members]) => (
          <div
            key={root}
            className="rounded border border-border bg-background/40 p-3 font-mono text-xs"
          >
            <p className="text-cyan-accent">root {nodes[root]}</p>
            <p className="mt-2 text-foreground">{members.join(", ")}</p>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Union-Find gives fast online connectivity for undirected graphs.
      </p>
    </div>
  );
}
