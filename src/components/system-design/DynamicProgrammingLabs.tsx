import { useMemo, useState } from "react";

const buttonClass =
  "rounded border border-border px-2 py-1 font-mono text-xs text-muted-foreground hover:border-terminal/50 hover:text-terminal";
const activeClass = "border-terminal bg-terminal/10 text-terminal";
const cellClass =
  "flex min-h-12 items-center justify-center rounded border border-border bg-background/50 px-2 py-2 font-mono text-xs";
const panelClass = "rounded border border-border bg-background/40 p-3 font-mono text-xs";
const COINS = [1, 3, 4];

export function FibonacciMemoLab() {
  const [n, setN] = useState(6);
  const fib = [0, 1, 1, 2, 3, 5, 8, 13];

  return (
    <div className="space-y-4">
      <input
        type="range"
        min="2"
        max="7"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        className="w-full accent-terminal"
      />
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {fib.map((value, i) => (
          <div key={i} className={`${cellClass} ${i <= n ? activeClass : "opacity-40"}`}>
            F({i})={value}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Memoization stores solved subproblems so F({n}) reuses F({n - 1}) and F({n - 2}) instead of
        recomputing the recursion tree.
      </p>
    </div>
  );
}

export function KnapsackLab() {
  const items = [
    { name: "A", weight: 2, value: 3 },
    { name: "B", weight: 3, value: 4 },
    { name: "C", weight: 4, value: 5 },
  ];
  const [capacity, setCapacity] = useState(5);
  const best = capacity < 3 ? 3 : capacity < 5 ? 4 : 7;

  return (
    <div className="space-y-4">
      <input
        type="range"
        min="2"
        max="7"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
        className="w-full accent-terminal"
      />
      <div className="grid gap-2 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className={panelClass}>
            <p className="text-cyan-accent">item {item.name}</p>
            <p className="mt-1 text-muted-foreground">
              weight {item.weight}, value {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className={panelClass}>
        capacity {capacity} {"->"} best value <span className="text-terminal">{best}</span>
      </div>
    </div>
  );
}

export function CoinChangeLab() {
  const [amount, setAmount] = useState(6);
  const dp = useMemo(() => {
    const table = Array.from({ length: 9 }, () => Infinity);
    table[0] = 0;
    for (let a = 1; a < table.length; a++) {
      for (const coin of COINS) {
        if (a >= coin) table[a] = Math.min(table[a], table[a - coin] + 1);
      }
    }
    return table;
  }, []);

  return (
    <div className="space-y-4">
      <input
        type="range"
        min="0"
        max="8"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full accent-terminal"
      />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
        {dp.map((value, i) => (
          <div key={i} className={`${cellClass} ${i === amount ? activeClass : ""}`}>
            {i}: {value}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        coins [{COINS.join(", ")}], min coins for {amount} ={" "}
        <span className="text-terminal">{dp[amount]}</span>.
      </p>
    </div>
  );
}

export function LISLab() {
  const data = [3, 1, 5, 2, 6, 4, 9];
  const [end, setEnd] = useState(4);
  const lis = [1, 1, 2, 2, 3, 3, 4];

  return (
    <div className="space-y-4">
      <button onClick={() => setEnd((i) => (i + 1) % data.length)} className={buttonClass}>
        advance index
      </button>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {data.map((value, i) => (
          <div key={i} className={`${cellClass} ${i <= end ? activeClass : "opacity-40"}`}>
            <div>
              <div>{value}</div>
              <div className="text-muted-foreground">lis {lis[i]}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        lis[i] checks earlier smaller values and extends the best subsequence ending there.
      </p>
    </div>
  );
}

export function LCSLab() {
  const a = "ABCBD";
  const b = "BDCAB";
  const [row, setRow] = useState(3);
  const table = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 2],
    [0, 1, 1, 2, 2, 2],
    [0, 1, 1, 2, 2, 3],
    [0, 1, 2, 2, 2, 3],
  ];

  return (
    <div className="space-y-4">
      <button onClick={() => setRow((r) => (r + 1) % table.length)} className={buttonClass}>
        fill next row
      </button>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-xs">
          <tbody>
            {table.map((cells, r) => (
              <tr key={r}>
                {cells.map((value, c) => (
                  <td
                    key={`${r}-${c}`}
                    className={`border border-border p-2 text-center ${r === row ? "bg-terminal/10 text-terminal" : "text-foreground"}`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        LCS length for {a} and {b} is <span className="text-terminal">3</span>.
      </p>
    </div>
  );
}

export function MatrixChainLab() {
  const [split, setSplit] = useState<"left" | "right">("left");
  const cost = split === "left" ? 4500 : 27000;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["left", "right"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSplit(s)}
            className={`${buttonClass} ${split === s ? activeClass : ""}`}
          >
            {s === "left" ? "(A x B) x C" : "A x (B x C)"}
          </button>
        ))}
      </div>
      <div className={panelClass}>
        dimensions: A 10x30, B 30x5, C 5x60
        <p className="mt-2 text-terminal">scalar multiplications: {cost}</p>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Matrix-chain DP chooses parenthesization; multiplication order changes cost, not result.
      </p>
    </div>
  );
}

export function GridDPLab() {
  const [blocked, setBlocked] = useState(false);
  const paths = blocked
    ? [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 2],
      ]
    : [
        [1, 1, 1],
        [1, 2, 3],
        [1, 3, 6],
      ];

  return (
    <div className="space-y-4">
      <button onClick={() => setBlocked((v) => !v)} className={buttonClass}>
        {blocked ? "remove obstacle" : "add obstacle"}
      </button>
      <div className="grid max-w-xs grid-cols-3 gap-2">
        {paths.flatMap((rowValues, r) =>
          rowValues.map((value, c) => (
            <div
              key={`${r}-${c}`}
              className={`${cellClass} ${blocked && r === 1 && c === 1 ? "border-destructive text-destructive" : value ? activeClass : ""}`}
            >
              {blocked && r === 1 && c === 1 ? "X" : value}
            </div>
          )),
        )}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        Each cell combines top and left subproblems: ways[r][c] = ways[r-1][c] + ways[r][c-1].
      </p>
    </div>
  );
}

export function TreeDPLab() {
  const [includeRoot, setIncludeRoot] = useState(true);
  const include = 10 + 1 + 3;
  const exclude = 4 + 5 + 1 + 3;

  return (
    <div className="space-y-4">
      <button onClick={() => setIncludeRoot((v) => !v)} className={buttonClass}>
        {includeRoot ? "exclude root" : "include root"}
      </button>
      <div className="space-y-3">
        <div className="mx-auto w-24">
          <div className={`${cellClass} ${includeRoot ? activeClass : ""}`}>10</div>
        </div>
        <div className="mx-auto grid max-w-sm grid-cols-2 gap-16">
          <div className={`${cellClass} ${!includeRoot ? activeClass : ""}`}>4</div>
          <div className={`${cellClass} ${!includeRoot ? activeClass : ""}`}>5</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 1].map((value, i) => (
            <div
              key={i}
              className={`${cellClass} ${includeRoot && (i === 0 || i === 2) ? activeClass : ""}`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        include root = {include}, exclude root = {exclude}; tree DP returns both states per node.
      </p>
    </div>
  );
}
