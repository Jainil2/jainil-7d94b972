import { useMemo, useState } from "react";

const buttonClass =
  "rounded border border-border px-2 py-1 font-mono text-xs text-muted-foreground hover:border-terminal/50 hover:text-terminal";
const activeClass = "border-terminal bg-terminal/10 text-terminal";
const cellClass =
  "flex min-h-12 items-center justify-center rounded border border-border bg-background/50 px-2 py-2 font-mono text-xs";
const BINARY_SEARCH_VALUES = [3, 7, 11, 18, 25, 31, 44, 52, 68];
const RADIX_VALUES = [170, 45, 75, 90, 802, 24, 2, 66];

export function BinarySearchLab() {
  const [target, setTarget] = useState(31);
  const [step, setStep] = useState(0);
  const states = useMemo(() => {
    let lo = 0;
    let hi = BINARY_SEARCH_VALUES.length - 1;
    const out: { lo: number; mid: number; hi: number }[] = [];
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      out.push({ lo, mid, hi });
      if (BINARY_SEARCH_VALUES[mid] === target) break;
      if (BINARY_SEARCH_VALUES[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    return out;
  }, [target]);
  const current = states[step % states.length];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[18, 31, 68].map((value) => (
          <button
            key={value}
            onClick={() => {
              setTarget(value);
              setStep(0);
            }}
            className={`${buttonClass} ${target === value ? activeClass : ""}`}
          >
            target {value}
          </button>
        ))}
        <button onClick={() => setStep((s) => s + 1)} className={buttonClass}>
          next compare
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
        {BINARY_SEARCH_VALUES.map((value, i) => (
          <div
            key={value}
            className={`${cellClass} ${i === current.mid ? activeClass : i >= current.lo && i <= current.hi ? "ring-1 ring-cyan-accent/50" : "opacity-30"}`}
          >
            {value}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        lo {current.lo}, mid {current.mid}, hi {current.hi}. Each comparison removes half the search
        space.
      </p>
    </div>
  );
}

export function QuickselectLab() {
  const values = [12, 4, 19, 7, 3, 15, 9];
  const [k, setK] = useState(3);
  const sorted = [...values].sort((a, b) => a - b);
  const pivot = 9;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[1, 3, 5].map((rank) => (
          <button
            key={rank}
            onClick={() => setK(rank)}
            className={`${buttonClass} ${k === rank ? activeClass : ""}`}
          >
            kth {rank}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {values.map((value) => (
          <div
            key={value}
            className={`${cellClass} ${value === pivot ? activeClass : value < pivot ? "text-cyan-accent" : "text-muted-foreground"}`}
          >
            {value}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Partition around pivot {pivot}; recurse only into the side containing rank {k}. Answer:{" "}
        <span className="text-terminal">{sorted[k - 1]}</span>.
      </p>
    </div>
  );
}

export function HeapSortLab() {
  const [phase, setPhase] = useState(0);
  const phases = [
    [4, 10, 3, 5, 1],
    [10, 5, 3, 4, 1],
    [5, 4, 3, 1, 10],
    [4, 1, 3, 5, 10],
    [1, 3, 4, 5, 10],
  ];
  const current = phases[phase];
  return (
    <div className="space-y-4">
      <button onClick={() => setPhase((p) => (p + 1) % phases.length)} className={buttonClass}>
        heapify / extract
      </button>
      <div className="grid grid-cols-5 gap-2">
        {current.map((value, i) => (
          <div
            key={`${value}-${i}`}
            className={`${cellClass} ${i >= current.length - phase ? activeClass : ""}`}
          >
            {value}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Heap sort builds a max heap, swaps the root to the sorted suffix, then heapifies the prefix.
      </p>
    </div>
  );
}

export function CountingSortLab() {
  const data = [2, 5, 3, 0, 2, 3, 0, 3];
  const counts = [0, 1, 2, 3, 4, 5].map((n) => data.filter((v) => v === n).length);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {data.map((value, i) => (
          <div key={i} className={cellClass}>
            {value}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2">
        {counts.map((count, value) => (
          <div key={value} className={`${cellClass} ${count ? activeClass : ""}`}>
            {value}: {count}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Counting sort is linear when the key range k is small relative to n.
      </p>
    </div>
  );
}

export function RadixSortLab() {
  const [digit, setDigit] = useState<"ones" | "tens">("ones");
  const buckets = useMemo(() => {
    const divisor = digit === "ones" ? 1 : 10;
    return Array.from({ length: 10 }, (_, bucket) =>
      RADIX_VALUES.filter((value) => Math.floor(value / divisor) % 10 === bucket),
    );
  }, [digit]);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["ones", "tens"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDigit(d)}
            className={`${buttonClass} ${digit === d ? activeClass : ""}`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-5">
        {buckets.map((bucket, i) => (
          <div
            key={i}
            className="rounded border border-border bg-background/40 p-2 font-mono text-xs"
          >
            <p className="text-muted-foreground">bucket {i}</p>
            <p className="mt-1 text-terminal">{bucket.join(", ") || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BucketSortLab() {
  const data = [0.12, 0.44, 0.21, 0.92, 0.71, 0.38, 0.63];
  const buckets = [0, 1, 2, 3].map((bucket) =>
    data.filter((value) => Math.floor(value * 4) === bucket),
  );
  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-4">
        {buckets.map((bucket, i) => (
          <div
            key={i}
            className="rounded border border-border bg-background/40 p-3 font-mono text-xs"
          >
            <p className="text-muted-foreground">
              range {i / 4} - {(i + 1) / 4}
            </p>
            <p className="mt-2 text-terminal">{bucket.join(", ") || "-"}</p>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Bucket sort distributes values, sorts each bucket, then concatenates buckets.
      </p>
    </div>
  );
}

export function TimSortLab() {
  const [merged, setMerged] = useState(false);
  const runs = merged
    ? [[1, 2, 3, 4, 5, 6, 7, 8]]
    : [
        [1, 2, 5, 8],
        [3, 4, 6, 7],
      ];
  return (
    <div className="space-y-4">
      <button onClick={() => setMerged((v) => !v)} className={buttonClass}>
        {merged ? "show natural runs" : "merge runs"}
      </button>
      <div className="space-y-2">
        {runs.map((run, i) => (
          <div key={i} className="grid grid-cols-8 gap-2">
            {run.map((value) => (
              <div key={value} className={`${cellClass} ${activeClass}`}>
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        TimSort exploits existing ordered runs, then merges them with stack invariants.
      </p>
    </div>
  );
}

export function ExternalMergeSortLab() {
  const [phase, setPhase] = useState<"runs" | "merge">("runs");
  const runs = [
    [2, 8, 11],
    [1, 7, 13],
    [3, 9, 12],
  ];
  const merged = [...runs.flat()].sort((a, b) => a - b);
  return (
    <div className="space-y-4">
      <button
        onClick={() => setPhase((p) => (p === "runs" ? "merge" : "runs"))}
        className={buttonClass}
      >
        {phase === "runs" ? "merge sorted runs" : "show disk runs"}
      </button>
      {phase === "runs" ? (
        <div className="grid gap-2 md:grid-cols-3">
          {runs.map((run, i) => (
            <div
              key={i}
              className="rounded border border-border bg-background/40 p-3 font-mono text-xs"
            >
              run {i + 1}: <span className="text-terminal">{run.join(", ")}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
          {merged.map((value) => (
            <div key={value} className={`${cellClass} ${activeClass}`}>
              {value}
            </div>
          ))}
        </div>
      )}
      <p className="font-mono text-xs text-muted-foreground">
        External sort creates memory-sized sorted runs, then performs a k-way merge from disk.
      </p>
    </div>
  );
}
