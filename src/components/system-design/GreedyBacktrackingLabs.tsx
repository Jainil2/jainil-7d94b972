import { useMemo, useState } from "react";

const buttonClass =
  "rounded border border-border px-2 py-1 font-mono text-xs text-muted-foreground hover:border-terminal/50 hover:text-terminal";
const activeClass = "border-terminal bg-terminal/10 text-terminal";
const panelClass = "rounded border border-border bg-background/40 p-3 font-mono text-xs";
const cellClass =
  "flex min-h-10 items-center justify-center rounded border border-border bg-background/50 px-2 py-2 font-mono text-xs";

export function IntervalSchedulingLab() {
  const intervals = [
    { id: "A", start: 0, end: 3 },
    { id: "B", start: 1, end: 4 },
    { id: "C", start: 3, end: 5 },
    { id: "D", start: 5, end: 7 },
  ];
  const [step, setStep] = useState(1);
  const selected = intervals.filter((i) => ["A", "C", "D"].includes(i.id)).slice(0, step);

  return (
    <div className="space-y-4">
      <button onClick={() => setStep((s) => (s % 3) + 1)} className={buttonClass}>
        pick next earliest finish
      </button>
      <div className="space-y-2">
        {intervals.map((interval) => {
          const chosen = selected.some((s) => s.id === interval.id);
          return (
            <div key={interval.id} className={panelClass}>
              <div className="mb-1 flex justify-between text-muted-foreground">
                <span>{interval.id}</span>
                <span>
                  {interval.start}-{interval.end}
                </span>
              </div>
              <div className="h-3 rounded bg-card">
                <div
                  className={`h-full rounded ${chosen ? "bg-terminal" : "bg-muted-foreground/30"}`}
                  style={{
                    marginLeft: `${interval.start * 12}%`,
                    width: `${(interval.end - interval.start) * 12}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Greedy rule: pick the compatible interval with the earliest finish time.
      </p>
    </div>
  );
}

export function HuffmanCodingLab() {
  const [step, setStep] = useState(0);
  const stages = [
    ["A:5", "B:9", "C:12", "D:13", "E:16", "F:45"],
    ["AB:14", "C:12", "D:13", "E:16", "F:45"],
    ["CD:25", "AB:14", "E:16", "F:45"],
    ["ABCD:39", "E:16", "F:45"],
    ["ABCDE:55", "F:45"],
  ];
  return (
    <div className="space-y-4">
      <button onClick={() => setStep((s) => (s + 1) % stages.length)} className={buttonClass}>
        merge two smallest
      </button>
      <div className="grid gap-2 md:grid-cols-3">
        {stages[step].map((node, i) => (
          <div key={node} className={`${panelClass} ${i < 2 ? activeClass : ""}`}>
            {node}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Huffman repeatedly merges the two lowest frequencies to build an optimal prefix code.
      </p>
    </div>
  );
}

export function NQueensLab() {
  const [row, setRow] = useState(0);
  const queens = [
    [0, 1],
    [1, 3],
    [2, 0],
    [3, 2],
  ];
  const active = queens.slice(0, row + 1);
  return (
    <div className="space-y-4">
      <button onClick={() => setRow((r) => (r + 1) % 4)} className={buttonClass}>
        place next queen
      </button>
      <div className="grid max-w-xs grid-cols-4 gap-1">
        {Array.from({ length: 16 }, (_, i) => {
          const r = Math.floor(i / 4);
          const c = i % 4;
          const hasQueen = active.some(([qr, qc]) => qr === r && qc === c);
          return (
            <div key={i} className={`${cellClass} ${hasQueen ? activeClass : ""}`}>
              {hasQueen ? "Q" : ""}
            </div>
          );
        })}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Backtracking places one queen per row, then rejects columns and diagonals under attack.
      </p>
    </div>
  );
}

export function PermutationsSubsetsLab() {
  const [mode, setMode] = useState<"subsets" | "permutations">("subsets");
  const output =
    mode === "subsets" ? ["[]", "[A]", "[B]", "[A,B]"] : ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["subsets", "permutations"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`${buttonClass} ${mode === m ? activeClass : ""}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {output.map((item) => (
          <div key={item} className={panelClass}>
            {item}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Subsets branch include/exclude; permutations branch by choosing each remaining item.
      </p>
    </div>
  );
}

export function BranchAndBoundLab() {
  const [step, setStep] = useState(0);
  const nodes = [
    { id: "root", bound: 19, kept: true },
    { id: "take A", bound: 17, kept: true },
    { id: "skip A", bound: 12, kept: false },
    { id: "take A+B", bound: 16, kept: true },
  ];
  const visible = nodes.slice(0, step + 1);
  return (
    <div className="space-y-4">
      <button onClick={() => setStep((s) => (s + 1) % nodes.length)} className={buttonClass}>
        expand best bound
      </button>
      <div className="grid gap-2 md:grid-cols-2">
        {visible.map((node) => (
          <div
            key={node.id}
            className={`${panelClass} ${node.kept ? activeClass : "border-destructive text-destructive"}`}
          >
            {node.id} · upper bound {node.bound} {node.kept ? "" : "pruned"}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Branch and bound searches choices but prunes branches whose best possible bound cannot win.
      </p>
    </div>
  );
}

export function MergeSortRecursionLab() {
  const [merged, setMerged] = useState(false);
  const levels = merged
    ? [["1 2 3 4 5 6 7 8"]]
    : [
        ["4 1 7 3 8 2 6 5"],
        ["4 1 7 3", "8 2 6 5"],
        ["4 1", "7 3", "8 2", "6 5"],
        ["4", "1", "7", "3", "8", "2", "6", "5"],
      ];
  return (
    <div className="space-y-4">
      <button onClick={() => setMerged((v) => !v)} className={buttonClass}>
        {merged ? "split" : "merge"}
      </button>
      <div className="space-y-2">
        {levels.map((level, i) => (
          <div key={i} className="flex flex-wrap justify-center gap-2">
            {level.map((chunk) => (
              <div key={chunk} className={`${panelClass} ${merged ? activeClass : ""}`}>
                {chunk}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Divide into halves until size one, then conquer by merging sorted halves.
      </p>
    </div>
  );
}

export function ActivitySelectionLab() {
  const activities = [
    { id: "wake", start: 8, end: 9 },
    { id: "code", start: 9, end: 12 },
    { id: "meet", start: 10, end: 11 },
    { id: "ship", start: 12, end: 14 },
  ];
  const picked = useMemo(() => ["wake", "code", "ship"], []);
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`${panelClass} ${picked.includes(activity.id) ? activeClass : ""}`}
          >
            {activity.id}: {activity.start}:00-{activity.end}:00
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Activity selection is interval scheduling where all compatible activities have equal value.
      </p>
    </div>
  );
}
