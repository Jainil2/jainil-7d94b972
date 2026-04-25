import type { ComponentType } from "react";
import { BloomFilter } from "@/components/system-design/BloomFilter";
import { LRUCache } from "@/components/system-design/LRUCache";
import { RaftCluster } from "@/components/system-design/RaftCluster";
import { SortingRace } from "@/components/system-design/SortingRace";
import { DijkstraGrid } from "@/components/system-design/DijkstraGrid";
import { OIDCFlow } from "@/components/system-design/OIDCFlow";
import { MessageQueue } from "@/components/system-design/MessageQueue";
import { MerkleTree } from "@/components/system-design/MerkleTree";
import { ConsistentHashLab } from "@/components/system-design/ConsistentHashLab";
import { RateLimiterLab } from "@/components/system-design/RateLimiterLab";
import { BTreeIndexLab } from "@/components/system-design/BTreeIndexLab";
import { GraphTraversalLab } from "@/components/system-design/GraphTraversalLab";
import { CapTheoremLab } from "@/components/system-design/CapTheoremLab";
import { DeadlockLab } from "@/components/system-design/DeadlockLab";

export type LabCategory = "Distributed Systems" | "Data Structures" | "Algorithms" | "Security";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface LabEntry {
  slug: string;
  title: string;
  category: LabCategory;
  difficulty: Difficulty;
  readingTimeMin: number;
  blurb: string;
  caption: string;
  whereUsed?: { label: string; href: string };
  component: ComponentType;
  /** Skill names this lab demonstrates — used to render "▸ try it" chips on Skills cards. */
  skillTags: string[];
  /** Long-form explanation, shown in the "Concept" section. */
  concept: string;
  complexity?: { operation: string; time: string; space?: string }[];
  codeSnippet?: { language: "ts" | "py" | "go" | "sql"; code: string };
  realWorld?: string[];
  pitfalls?: string[];
  references?: { label: string; href: string }[];
}

export const labRegistry: LabEntry[] = [
  {
    slug: "bloom-filter",
    title: "Bloom Filter",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Probabilistic set membership in O(k) bits.",
    caption:
      "Type a word — three hash functions flip three bits. Membership checks return 'maybe' or 'definitely not'. Watch the false-positive rate climb as the bit array fills.",
    whereUsed: { label: "Cache stack at Tech Holding", href: "/#projects" },
    component: BloomFilter,
    skillTags: ["DSA", "Redis"],
    concept:
      "A Bloom filter is a space-efficient probabilistic data structure that answers one question: 'have we seen this item before?' It can be wrong in one direction — it may say 'maybe yes' when the answer is no (false positive), but it will never say 'no' when the answer is yes.\n\nIt works by maintaining an array of m bits and k independent hash functions. Insert: hash the item k times, set those k bits. Lookup: hash again — if any of the k bits is 0, the item is definitely not in the set. If all k bits are 1, it might be in the set.\n\nThe false-positive rate grows as the bit array fills: roughly (1 − e^(−kn/m))^k. Tuning k and m for an expected n gives you a controllable error budget.",
    complexity: [
      { operation: "Insert", time: "O(k)", space: "O(m bits)" },
      { operation: "Lookup", time: "O(k)", space: "O(1)" },
      { operation: "Delete", time: "—", space: "(not supported; use Counting Bloom)" },
    ],
    codeSnippet: {
      language: "ts",
      code: `class BloomFilter {
  bits: Uint8Array;
  constructor(public m: number, public k: number) {
    this.bits = new Uint8Array(m);
  }
  private hash(seed: number, s: string) {
    let h = seed;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h % this.m;
  }
  add(s: string) {
    for (let i = 0; i < this.k; i++) this.bits[this.hash(7 + i * 31, s)] = 1;
  }
  has(s: string): boolean {
    for (let i = 0; i < this.k; i++) {
      if (!this.bits[this.hash(7 + i * 31, s)]) return false;
    }
    return true; // maybe
  }
}`,
    },
    realWorld: [
      "Bigtable / Cassandra: per-SSTable Bloom filter avoids disk reads for keys that aren't there.",
      "Chrome: filters known-malicious URLs locally before hitting the Safe Browsing API.",
      "CDNs: skip a database round-trip on cache misses for keys that have never existed.",
      "Postgres: pg_bloom extension speeds up multi-column filters.",
    ],
    pitfalls: [
      "Standard Bloom filters can't delete — use a Counting Bloom Filter when removals matter.",
      "False-positive rate stacks across layers (filter → cache → DB) so size for the worst layer.",
      "Hash quality matters: weak hashes cause clustering and inflate the FP rate beyond the formula.",
    ],
    references: [
      { label: "Burton Bloom — Space/Time Trade-offs in Hash Coding (1970)", href: "https://dl.acm.org/doi/10.1145/362686.362692" },
      { label: "Cassandra docs — Bloom Filters", href: "https://cassandra.apache.org/doc/latest/cassandra/architecture/storage_engine.html" },
    ],
  },
  {
    slug: "lru-cache",
    title: "LRU Cache",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "Doubly-linked list + hash map = O(1) eviction.",
    caption:
      "Click any key to access it. Recent keys move to the head; the tail gets evicted when capacity is exceeded.",
    whereUsed: { label: "Session cache layer", href: "/#projects" },
    component: LRUCache,
    skillTags: ["DSA", "Redis", "System Design"],
    concept:
      "An LRU (Least-Recently-Used) cache evicts the entry that hasn't been touched for the longest time. The classic O(1) implementation pairs a hash map (key → list node) with a doubly-linked list (most-recent at head, least-recent at tail).\n\nGet: hash-lookup → unlink the node → push to head. Put: if key exists, update + push to head; if at capacity, evict the tail. Both are O(1) because every operation is a constant number of pointer rewires plus a hash op.\n\nLRU is the default eviction policy for most caches because it captures temporal locality cheaply. Variants like LRU-K, ARC, and 2Q add scan resistance for workloads where one-shot reads would otherwise pollute the cache.",
    complexity: [
      { operation: "Get", time: "O(1)", space: "O(capacity)" },
      { operation: "Put", time: "O(1)", space: "O(1) per entry" },
    ],
    codeSnippet: {
      language: "ts",
      code: `class LRU<K, V> {
  private map = new Map<K, V>();
  constructor(private capacity: number) {}
  get(k: K): V | undefined {
    if (!this.map.has(k)) return undefined;
    const v = this.map.get(k)!;
    this.map.delete(k); // re-insert to move to most-recent
    this.map.set(k, v);
    return v;
  }
  put(k: K, v: V) {
    if (this.map.has(k)) this.map.delete(k);
    else if (this.map.size >= this.capacity) {
      const oldest = this.map.keys().next().value;
      this.map.delete(oldest);
    }
    this.map.set(k, v);
  }
}`,
    },
    realWorld: [
      "Redis: maxmemory-policy allkeys-lru / volatile-lru.",
      "Linux page cache uses a 2-list LRU (active + inactive).",
      "Caffeine (JVM) uses Window-TinyLFU, an LRU evolution that beats LRU on most traces.",
      "Browser HTTP caches use LRU-style eviction inside the disk cache.",
    ],
    pitfalls: [
      "JS Map insertion order gives you LRU 'for free' — but only single-threaded; use a real lock for shared state.",
      "Pure LRU is fooled by sequential scans — one big read kicks out hot keys. Reach for ARC/SLRU/W-TinyLFU.",
      "Don't forget TTLs — LRU evicts by recency, not freshness; stale data lives until pushed out.",
    ],
    references: [{ label: "LeetCode 146 — LRU Cache", href: "https://leetcode.com/problems/lru-cache/" }],
  },
  {
    slug: "raft-election",
    title: "Raft Leader Election",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "5-node consensus with crash recovery.",
    caption:
      "Click the leader to crash it. Followers time out, vote, and elect a new leader with animated RequestVote RPCs.",
    whereUsed: { label: "Distributed coordination work", href: "/#experience" },
    component: RaftCluster,
    skillTags: ["Distributed Systems", "System Design"],
    concept:
      "Raft is a consensus algorithm designed to be understandable. A cluster of nodes elects exactly one leader; all writes flow through that leader and are replicated to followers via AppendEntries RPCs. If the leader fails, followers detect the missing heartbeat (election timeout, randomized 150–300ms), increment their term, and call RequestVote.\n\nA candidate wins if it collects votes from a majority — that's why odd cluster sizes are standard (3, 5, 7). Once elected, the leader pushes its log to followers; conflicting entries are overwritten. The 'commit' point is the highest log index replicated on a majority.\n\nRaft cleanly separates leader election, log replication, and safety, making it the consensus algorithm of choice for etcd, Consul, CockroachDB, and TiKV.",
    complexity: [
      { operation: "Election", time: "~1 RTT × log(N)", space: "O(N) RPCs" },
      { operation: "Replicate", time: "1 RTT to majority", space: "O(N)" },
    ],
    codeSnippet: {
      language: "go",
      code: `// Simplified Raft election loop
func (r *Raft) run() {
  for {
    switch r.state {
    case Follower:
      select {
      case <-r.heartbeat:        // got AppendEntries, stay follower
      case <-r.electionTimeout(): // 150-300ms randomized
        r.state = Candidate
      }
    case Candidate:
      r.term++
      r.votedFor = r.id
      votes := r.requestVotes()
      if votes > len(r.peers)/2 {
        r.state = Leader
      }
    case Leader:
      r.broadcastAppendEntries() // every 50ms
    }
  }
}`,
    },
    realWorld: [
      "etcd — Kubernetes' control-plane store runs Raft.",
      "Consul, Nomad — HashiCorp's coordination services.",
      "CockroachDB / TiKV — Raft per range/region for sharded SQL.",
      "MongoDB replica sets use a Raft-like protocol since 3.2.",
    ],
    pitfalls: [
      "Even cluster sizes (2, 4) are worse than odd — no majority advantage but more failure modes.",
      "Network partitions can elect two leaders briefly; Raft resolves on heal but writes during the split may be lost.",
      "Election storms: tune heartbeat / election timeouts so they don't overlap on flaky networks.",
    ],
    references: [
      { label: "Diego Ongaro — Raft paper (2014)", href: "https://raft.github.io/raft.pdf" },
      { label: "raft.github.io — visualizations", href: "https://raft.github.io/" },
    ],
  },
  {
    slug: "sorting-race",
    title: "Sorting Race",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "Bubble vs Quick vs Merge — same array, side by side.",
    caption:
      "Three algorithms sort identical inputs. Compare comparison counts and watch the bars settle in real time.",
    component: SortingRace,
    skillTags: ["DSA"],
    concept:
      "Sorting is the canonical algorithm comparison. Bubble sort is O(n²) and easy to write. Quicksort averages O(n log n) by partitioning around a pivot but degrades to O(n²) on adversarial inputs (sorted/reverse with bad pivot choice). Mergesort guarantees O(n log n) by recursively splitting and merging — at the cost of O(n) extra space.\n\nReal-world sort routines are hybrids: V8/CPython use Timsort (mergesort variant tuned for partially-sorted real data), C++ std::sort uses introsort (quicksort that falls back to heapsort if recursion gets too deep), Java Arrays.sort uses dual-pivot quicksort for primitives.",
    complexity: [
      { operation: "Bubble sort", time: "O(n²)", space: "O(1)" },
      { operation: "Quicksort", time: "O(n log n) avg, O(n²) worst", space: "O(log n)" },
      { operation: "Mergesort", time: "O(n log n)", space: "O(n)" },
    ],
    realWorld: [
      "V8 / CPython — Timsort (mergesort + insertion sort for small runs).",
      "C++ STL — introsort (quicksort + heapsort fallback).",
      "Java primitive arrays — dual-pivot quicksort.",
      "PostgreSQL — external mergesort for ORDER BY that exceeds work_mem.",
    ],
  },
  {
    slug: "dijkstra",
    title: "Dijkstra Pathfinder",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Shortest path on a weighted grid.",
    caption:
      "Click cells to drop walls. Run Dijkstra and watch the visited frontier expand before the shortest path lights up.",
    component: DijkstraGrid,
    skillTags: ["DSA"],
    concept:
      "Dijkstra's algorithm finds the shortest path from a source to every other node in a graph with non-negative edge weights. It maintains a priority queue of (distance, node) and repeatedly pops the closest unvisited node, relaxing edges to its neighbors.\n\nWith a binary-heap priority queue: O((V + E) log V). With a Fibonacci heap: O(E + V log V), but constants make binary heaps faster in practice.\n\nFor maps and games where you have a heuristic (e.g. Euclidean distance to the goal), A* — Dijkstra plus an admissible heuristic — explores far fewer nodes. For negative edges, use Bellman-Ford. For all-pairs, use Floyd-Warshall.",
    complexity: [
      { operation: "Single-source", time: "O((V + E) log V)", space: "O(V)" },
    ],
    codeSnippet: {
      language: "ts",
      code: `function dijkstra(graph: Map<string, [string, number][]>, src: string) {
  const dist = new Map<string, number>();
  for (const v of graph.keys()) dist.set(v, Infinity);
  dist.set(src, 0);
  const pq: [number, string][] = [[0, src]]; // (dist, node)
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift()!;
    if (d > dist.get(u)!) continue;
    for (const [v, w] of graph.get(u) ?? []) {
      if (d + w < dist.get(v)!) {
        dist.set(v, d + w);
        pq.push([d + w, v]);
      }
    }
  }
  return dist;
}`,
    },
    realWorld: [
      "Google Maps / OSRM — variants of Dijkstra (often A* with contraction hierarchies) for routing.",
      "OSPF / IS-IS — link-state routing protocols run Dijkstra over the network topology.",
      "Game pathfinding (often A* with grid heuristic).",
    ],
    pitfalls: [
      "Negative edge weights break it — use Bellman-Ford instead.",
      "Re-using a stale (distance, node) entry in the priority queue is the classic off-by-one bug — check if popped distance matches current best.",
    ],
  },
  {
    slug: "oidc-flow",
    title: "OAuth 2.0 / OIDC Flow",
    category: "Security",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Authz-code + PKCE, replay attack, tampered verifier — step by step.",
    caption:
      "Animate the OIDC dance between a browser, client app, authz server (Ory Hydra-style), and resource server. Swap scenarios to see why PKCE matters and how a replayed code gets rejected.",
    whereUsed: { label: "Auth stack at Tech Holding", href: "/#experience" },
    component: OIDCFlow,
    skillTags: ["Security", "System Design"],
    concept:
      "OAuth 2.0 grants delegated access to resources; OIDC layers identity (who is the user) on top via the id_token. The Authorization Code flow is the recommended grant for both web and SPAs — combined with PKCE (Proof Key for Code Exchange) for public clients that can't keep a secret.\n\nPKCE works by having the client generate a random code_verifier, hashing it (S256) into a code_challenge sent to the authz server. When exchanging the auth code for tokens, the client must present the original verifier. An attacker who intercepts the auth code can't redeem it without the verifier — even if they capture the redirect.\n\nOther safeguards: state parameter (CSRF), nonce (id_token replay), short-lived access tokens, refresh-token rotation, audience binding, JWKS-based signature validation.",
    realWorld: [
      "Google, Microsoft, Apple, Okta, Auth0, Ory Hydra — all standard OIDC providers.",
      "All major browsers' WebAuthn/passkey flows ride on top of OIDC.",
      "Most B2B SaaS uses OIDC for SSO instead of legacy SAML.",
    ],
    pitfalls: [
      "Implicit flow is deprecated — never use it for new code.",
      "Validating the id_token signature is non-optional; never trust the JSON without verifying with the JWKS.",
      "Refresh tokens stored in localStorage are XSS-exposed — use httpOnly cookies or BFF pattern.",
    ],
    references: [
      { label: "RFC 6749 — OAuth 2.0", href: "https://datatracker.ietf.org/doc/html/rfc6749" },
      { label: "RFC 7636 — PKCE", href: "https://datatracker.ietf.org/doc/html/rfc7636" },
      { label: "OpenID Connect Core 1.0", href: "https://openid.net/specs/openid-connect-core-1_0.html" },
    ],
  },
  {
    slug: "message-queue",
    title: "Distributed Message Queue",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Kafka-style Pub/Sub with partitions and consumer lag.",
    caption:
      "Publish events to a topic. Messages are partitioned and processed asynchronously by a consumer group. Watch out for consumer lag if you publish too fast!",
    component: MessageQueue,
    skillTags: ["System Design", "Distributed Systems", "Kafka"],
    concept:
      "A distributed log (Kafka, Pulsar, Kinesis) is a partitioned, append-only commit log per topic. Producers append to a partition; consumers track their own offset. This decouples producers from consumers — they don't need to be online at the same time, and consumers can replay history.\n\nPartitioning is the unit of parallelism: each partition is consumed by exactly one member of a consumer group. Within a partition, ordering is guaranteed; across partitions, it isn't. The partitioning key (often user_id) decides which partition a message lands in — pick it carefully because skewed keys mean hot partitions.\n\nConsumer lag (= producer offset − consumer offset) is the canonical health metric. Steady lag = matched throughput. Growing lag = consumers can't keep up; scale out, batch more, or shed load.",
    realWorld: [
      "Kafka — LinkedIn's original use case; now powers most event-driven backends.",
      "AWS Kinesis, GCP Pub/Sub, Azure Event Hubs — managed equivalents.",
      "Redis Streams, NATS JetStream — lighter-weight alternatives for smaller scales.",
      "Database CDC: Debezium streams Postgres/MySQL changes into Kafka.",
    ],
    pitfalls: [
      "Hot partitions from skewed keys — monitor per-partition byte rate.",
      "Auto-commit can lose messages if a consumer crashes mid-batch — prefer manual commit after side effects succeed.",
      "Re-partitioning is painful (Kafka doesn't move data) — over-partition early.",
    ],
  },
  {
    slug: "merkle-tree",
    title: "Merkle Tree",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Data integrity via cryptographic hashes.",
    caption:
      "Mutate a data block (leaf node) to see its hash change. Watch how the invalidation bubbles up the tree, changing the Root Hash. Used in Git, Blockchain, and DynamoDB.",
    component: MerkleTree,
    skillTags: ["System Design", "Security"],
    concept:
      "A Merkle tree is a binary tree where each leaf is the hash of a data block, and each internal node is the hash of the concatenation of its children's hashes. The single root hash uniquely fingerprints the entire dataset.\n\nThe magic: to prove a single block is part of the dataset, you only need O(log n) sibling hashes — a Merkle proof. To detect any tampering, you re-hash the changed block; the change cascades up to a different root.\n\nThis enables efficient verification in adversarial settings (blockchains, content-addressed storage) and efficient sync in distributed systems (compare roots; if they differ, descend into the differing subtree to find the diverging block).",
    complexity: [
      { operation: "Build", time: "O(n)", space: "O(n)" },
      { operation: "Membership proof", time: "O(log n)", space: "O(log n)" },
      { operation: "Update one leaf", time: "O(log n)", space: "O(1)" },
    ],
    realWorld: [
      "Git — every commit/tree/blob is content-addressed by SHA-1/SHA-256 hash.",
      "Bitcoin / Ethereum — every block header contains a Merkle root over its transactions.",
      "DynamoDB / Cassandra — Merkle trees for anti-entropy: detect divergent replicas with O(log n) comparisons.",
      "IPFS, BitTorrent v2 — content addressing and partial verification.",
    ],
    references: [
      { label: "Ralph Merkle — original 1979 paper", href: "https://www.merkle.com/papers/Thesis1979.pdf" },
    ],
  },
  // ─── New labs ────────────────────────────────────────────────────────────
  {
    slug: "consistent-hashing",
    title: "Consistent Hashing",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Add/remove nodes and remap only ~K/N keys.",
    caption:
      "Toggle nodes on/off and watch how consistent hashing remaps only a small fraction of keys, while naive `hash % N` would remap nearly everything — the difference between a graceful degradation and a cache stampede.",
    whereUsed: { label: "Cache & sharding work", href: "/#projects" },
    component: ConsistentHashLab,
    skillTags: ["Distributed Systems", "System Design", "Redis"],
    concept:
      "Consistent hashing solves a sharding problem: when you add or remove a node, how do you avoid remapping every key? With naive `hash(key) % N`, a single node change shuffles ~all keys. With consistent hashing, a key remapping is bounded to ~K/N keys.\n\nThe trick: hash both keys and nodes onto a circular ring (typically 0 to 2^32). A key is owned by the next node clockwise. Adding a node steals only the slice between it and the previous node; removing a node hands its slice to the next clockwise node.\n\nReal implementations use 'virtual nodes' (each physical node owns hundreds of points on the ring) to smooth out load and reduce variance. Without vnodes, a single hot node can dominate.",
    complexity: [
      { operation: "Lookup", time: "O(log V)", space: "O(V)" },
      { operation: "Add/remove node", time: "O(K/N) keys remapped", space: "O(V/N)" },
    ],
    codeSnippet: {
      language: "ts",
      code: `class ConsistentHash {
  private ring: { angle: number; node: string }[] = [];
  constructor(nodes: string[], private vnodes = 100) {
    for (const n of nodes) this.addNode(n);
  }
  addNode(n: string) {
    for (let v = 0; v < this.vnodes; v++) {
      this.ring.push({ angle: hash(\`\${n}#\${v}\`), node: n });
    }
    this.ring.sort((a, b) => a.angle - b.angle);
  }
  lookup(key: string): string {
    const a = hash(key);
    // binary search for first angle >= a, wrap around if needed
    for (const v of this.ring) if (v.angle >= a) return v.node;
    return this.ring[0].node;
  }
}`,
    },
    realWorld: [
      "Amazon DynamoDB — ring-based partitioning across nodes.",
      "Apache Cassandra — Murmur3-partitioner on a 64-bit token ring.",
      "Memcached client libraries (ketama).",
      "Akka Cluster Sharding.",
    ],
    pitfalls: [
      "Skip vnodes and you'll get hot spots — load variance scales as 1/√V.",
      "Don't use a weak hash like simple modulo of node names — clustering wrecks load balance.",
      "Re-balancing requires moving data — plan for the I/O burst when scaling.",
    ],
    references: [
      { label: "Karger et al. — Consistent Hashing (1997)", href: "https://dl.acm.org/doi/10.1145/258533.258660" },
      { label: "DynamoDB paper", href: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf" },
    ],
  },
  {
    slug: "rate-limiter",
    title: "Rate Limiter Showdown",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Token Bucket vs Leaky Bucket vs Fixed Window vs Sliding Log.",
    caption:
      "Fire single requests or 20-request bursts. Watch how each rate-limiter strategy responds — the same traffic, four different verdicts. Pick the one that matches your tolerance for bursts vs smoothness.",
    component: RateLimiterLab,
    skillTags: ["System Design", "Distributed Systems"],
    concept:
      "Rate limiting protects a service from being overwhelmed. The four common strategies trade bursts vs smoothness vs memory:\n\n• Token Bucket — tokens refill at a steady rate up to a cap; each request consumes one. Allows bursts up to the cap. Used by Stripe, AWS, GCP.\n• Leaky Bucket — requests enter a FIFO queue that drains at a fixed rate. Smooths output; excess overflows. Common in network shapers.\n• Fixed Window — count requests per N-second window; reset on tick. Simple but allows 2× burst at the window boundary.\n• Sliding Log/Window — track request timestamps and only count those in the last N seconds. Most accurate, costs memory per request.\n\nDistributed rate limiting (across a cluster) usually centralizes counters in Redis (INCR + EXPIRE) or uses a probabilistic approximation per node.",
    complexity: [
      { operation: "Token Bucket allow?", time: "O(1)", space: "O(1) per key" },
      { operation: "Sliding Log allow?", time: "O(log N)", space: "O(N) per key" },
    ],
    codeSnippet: {
      language: "ts",
      code: `class TokenBucket {
  private tokens: number;
  private last = Date.now();
  constructor(private capacity: number, private refillPerSec: number) {
    this.tokens = capacity;
  }
  allow(): boolean {
    const now = Date.now();
    const dt = (now - this.last) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + dt * this.refillPerSec);
    this.last = now;
    if (this.tokens >= 1) { this.tokens -= 1; return true; }
    return false; // 429
  }
}`,
    },
    realWorld: [
      "Stripe API: token-bucket per API key, 100 req/s with burst.",
      "AWS API Gateway: token-bucket with regional quotas.",
      "Cloudflare: sliding-window per zone + token-bucket per IP.",
      "Linux tc (traffic control): leaky-bucket-style token bucket filter (TBF).",
    ],
    pitfalls: [
      "Fixed window allows up to 2× the limit at the window boundary — switch to sliding for strict caps.",
      "Distributed rate limiting on Redis without Lua scripts can race — use atomic INCRBY + TTL.",
      "Per-IP limits can be defeated by NAT/CGNAT — combine with per-account where possible.",
    ],
  },
  {
    slug: "btree-index",
    title: "B-Tree Index",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Insert keys and watch nodes split — Postgres-style.",
    caption:
      "Insert keys into a B-tree of order 4 and watch nodes split as they fill. Lookup any key to compare against a naive table scan — this is exactly how Postgres and MySQL turn O(n) into O(log n).",
    component: BTreeIndexLab,
    skillTags: ["DSA", "Postgres", "System Design"],
    concept:
      "A B-tree (or B+ tree) is a self-balancing search tree where each node holds many keys instead of just one. This is critical for storage engines: a node fits inside a single disk page (~4KB-16KB), so each level of the tree is one disk read.\n\nWith a fanout of 100+, a B-tree of 100 million rows is only 4 levels deep — meaning a row lookup costs ~4 disk reads. A binary tree at the same scale would be 27+ levels deep.\n\nWhen a node fills (more than `order` keys), it splits in half and pushes the median key up to the parent. The tree grows at the root, never the leaves, which is why B-trees stay balanced. B+ trees (the variant Postgres and MySQL use) keep all data in leaf nodes and link the leaves into a sorted list, making range scans O(log n + k) instead of O((log n) × k).",
    complexity: [
      { operation: "Search", time: "O(log_b n)", space: "O(1)" },
      { operation: "Insert", time: "O(log_b n)", space: "O(log_b n) splits" },
      { operation: "Range scan (B+)", time: "O(log_b n + k)", space: "O(1)" },
    ],
    codeSnippet: {
      language: "sql",
      code: `-- Postgres: every PRIMARY KEY and UNIQUE constraint
-- is backed by a B-tree index. You can also create them explicitly:
CREATE INDEX users_email_idx ON users (email);

-- Compound index supports prefix queries
CREATE INDEX orders_user_date_idx ON orders (user_id, created_at);

-- Use EXPLAIN to see the planner pick the index
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'jainil@example.com';
-- Index Scan using users_email_idx  (cost=0.43..8.45 rows=1)`,
    },
    realWorld: [
      "PostgreSQL — default index type. B+ tree with 8KB pages.",
      "MySQL InnoDB — clustered B+ tree on the primary key (the table is the index).",
      "SQLite, Oracle, SQL Server — all default to B-trees.",
      "LSM-trees (RocksDB, Cassandra, ScyllaDB) are the alternative for write-heavy workloads.",
    ],
    pitfalls: [
      "Indexes speed reads but slow writes — every INSERT/UPDATE rewrites every affected index.",
      "Composite index (a, b, c) helps WHERE a=… and WHERE a=… AND b=… but NOT WHERE b=… alone.",
      "Index bloat from updates — VACUUM or REINDEX periodically on Postgres.",
      "High-cardinality indexes work great; low-cardinality (boolean) often don't help vs full scan.",
    ],
  },
  {
    slug: "graph-traversal",
    title: "BFS vs DFS",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Same graph, two strategies — Queue vs Stack.",
    caption:
      "Step through BFS and DFS on identical graphs. Watch the queue (FIFO) explore in layers and the stack (LIFO) plunge depth-first. The shape of the frontier is everything.",
    component: GraphTraversalLab,
    skillTags: ["DSA"],
    concept:
      "BFS (Breadth-First Search) explores layer by layer using a queue. It finds the shortest path in an unweighted graph — the first time you reach a node, you've reached it through the fewest edges.\n\nDFS (Depth-First Search) plunges as deep as possible before backtracking, using a stack (or recursion). It's the right tool for cycle detection, topological sort, finding connected components, and any problem where you need to enumerate paths or do tree-shaped recursion.\n\nBoth are O(V + E) time, O(V) space. The difference is the data structure — and that's why they're often the first interview question after arrays: they teach how a tiny choice (queue vs stack) reshapes the entire algorithm's behavior.",
    complexity: [
      { operation: "BFS", time: "O(V + E)", space: "O(V) queue" },
      { operation: "DFS", time: "O(V + E)", space: "O(V) stack/recursion" },
    ],
    codeSnippet: {
      language: "ts",
      code: `function bfs(start: string, adj: Map<string, string[]>) {
  const visited = new Set<string>([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift()!; // FIFO
    for (const nb of adj.get(node) ?? []) {
      if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }
    }
  }
  return visited;
}

function dfs(start: string, adj: Map<string, string[]>) {
  const visited = new Set<string>([start]);
  const stack = [start];
  while (stack.length) {
    const node = stack.pop()!; // LIFO
    for (const nb of adj.get(node) ?? []) {
      if (!visited.has(nb)) { visited.add(nb); stack.push(nb); }
    }
  }
  return visited;
}`,
    },
    realWorld: [
      "BFS — web crawlers (politeness layer), shortest-path in unweighted graphs, social-network 'degrees of separation'.",
      "DFS — topological sort (build systems, npm install order), cycle detection (deadlock detection!), maze solving.",
      "Garbage collectors mark phase: typically DFS to keep stack small.",
    ],
    pitfalls: [
      "DFS recursion blows the stack on deep graphs — convert to iterative DFS with explicit stack.",
      "Never forget to mark visited at enqueue time (BFS), not dequeue — otherwise a node can be enqueued many times.",
    ],
  },
  {
    slug: "cap-theorem",
    title: "CAP Theorem",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Pick CP or AP — partition is non-negotiable.",
    caption:
      "Trigger a network partition between two halves of a 3-node cluster. Pick CP (refuse writes on the minority) or AP (accept writes, diverge). Then heal the partition and watch conflict resolution.",
    component: CapTheoremLab,
    skillTags: ["Distributed Systems", "System Design"],
    concept:
      "CAP says: in the presence of a network Partition, a distributed system must choose between Consistency and Availability. You can't have all three.\n\nCP systems (etcd, Spanner, Mongo with majority writes) refuse writes on the minority side of a partition — guaranteeing that any successful read returns the most recent write. The cost: minority partitions become read-only or fully unavailable.\n\nAP systems (Cassandra, DynamoDB with eventual consistency, Riak) accept writes on both sides during a partition, then reconcile when the partition heals — using strategies like last-write-wins, vector clocks, or CRDTs. The cost: reads can return stale data, and conflict resolution can lose writes.\n\nCAP is about partitions specifically. The day-to-day trade-off is closer to PACELC: when there's a Partition, choose A or C; Else, choose Latency or Consistency.",
    realWorld: [
      "CP — etcd, ZooKeeper, Consul, Google Spanner, MongoDB (majority).",
      "AP — Cassandra, DynamoDB (default), Riak, CouchDB, Redis Cluster (with quirks).",
      "CRDTs — used in collaborative editing (Figma, Notion, Yjs) to give AP without losing writes.",
    ],
    pitfalls: [
      "'My DB is CA' is a confused statement — partitions are a fact of networking, not a choice.",
      "Eventual consistency works only if your application can tolerate stale reads — money rarely can.",
      "Last-write-wins silently loses concurrent updates — vector clocks or CRDTs surface conflicts.",
    ],
    references: [
      { label: "Eric Brewer — CAP Theorem (2000 keynote, 2012 retrospective)", href: "https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" },
    ],
  },
  {
    slug: "deadlock",
    title: "Dining Philosophers — Deadlock",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "5 philosophers, 5 forks, one classic deadlock.",
    caption:
      "Run the naive strategy and watch all 5 philosophers grab the left fork → instant deadlock. Switch to resource ordering or asymmetric and watch them eat. The wait-for graph never closes a cycle.",
    component: DeadlockLab,
    skillTags: ["DSA", "System Design", "Distributed Systems"],
    concept:
      "Dijkstra's Dining Philosophers problem is the canonical concurrency parable. Five philosophers sit around a table; between each pair is one fork. Each needs both adjacent forks to eat. If everyone grabs their left fork at the same time, everyone waits forever for their right — a perfect circular wait, the textbook deadlock.\n\nDeadlock requires four conditions (Coffman, 1971): mutual exclusion, hold-and-wait, no preemption, and a circular wait. Break any one and you can't deadlock.\n\nClassic fixes: (1) global resource ordering — always grab the lower-numbered fork first, breaking the circular wait; (2) asymmetric solution — one philosopher reverses their order; (3) try-and-back-off with random retry (livelock risk!); (4) waiter/arbitrator mediates fork access.\n\nReal systems hit this constantly: database transactions waiting on row locks, distributed locks across services, even goroutine channel sends.",
    realWorld: [
      "Postgres deadlock detector — runs every deadlock_timeout (1s default), aborts one transaction.",
      "MySQL InnoDB — same; SHOW ENGINE INNODB STATUS shows the last detected cycle.",
      "JVM thread dumps — jstack flags 'Found one Java-level deadlock' with the cycle.",
      "Distributed locks (Redlock, ZooKeeper) — careful lock ordering across services.",
    ],
    pitfalls: [
      "Random back-off can become livelock — both retry, both back off, both retry…",
      "Lock ordering only works if all callers know the order — one rogue path = deadlock returns.",
      "Holding a transaction open across user input is the #1 way to deadlock a database in production.",
    ],
    references: [
      { label: "Coffman et al. — System Deadlocks (1971)", href: "https://dl.acm.org/doi/10.1145/356586.356588" },
    ],
  },
];

export function getLabBySlug(slug: string): LabEntry | undefined {
  return labRegistry.find((l) => l.slug === slug);
}

export function getLabsForSkill(skill: string): LabEntry[] {
  return labRegistry.filter((l) => l.skillTags.includes(skill));
}

export const LAB_CATEGORIES: LabCategory[] = [
  "Distributed Systems",
  "Data Structures",
  "Algorithms",
  "Security",
];
