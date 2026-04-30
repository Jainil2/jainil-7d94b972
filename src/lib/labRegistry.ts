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
import { GossipProtocol } from "@/components/system-design/GossipProtocol";
import { DistributedTx } from "@/components/system-design/DistributedTx";
import { SnowflakeId } from "@/components/system-design/SnowflakeId";
import { VectorClocks } from "@/components/system-design/VectorClocks";
import { LSMTree } from "@/components/system-design/LSMTree";
import { HyperLogLog } from "@/components/system-design/HyperLogLog";
import { QuadTreeLab } from "@/components/system-design/QuadTreeLab";
import { SkipList } from "@/components/system-design/SkipList";
import { TrieLab } from "@/components/system-design/TrieLab";
import { AStarSearch } from "@/components/system-design/AStarSearch";
import { PageRankLab } from "@/components/system-design/PageRankLab";
import { LevenshteinLab } from "@/components/system-design/LevenshteinLab";
import { RabinKarp } from "@/components/system-design/RabinKarp";
import { JWTAnatomy } from "@/components/system-design/JWTAnatomy";
import { TLSHandshake } from "@/components/system-design/TLSHandshake";
import { CORSLab } from "@/components/system-design/CORSLab";
import { WebAuthnLab } from "@/components/system-design/WebAuthnLab";
import {
  BackpressureLab,
  CRDTLab,
  CircuitBreakerLab,
  LoadBalancerLab,
  ShardingReplicationLab,
  TopologicalSortLab,
} from "@/components/system-design/AdvancedSystemLabs";
import {
  ArrayLab,
  BitsetLab,
  CircularBufferLab,
  DequeLab,
  DynamicArrayLab,
  HashTableLab,
  LinkedListLab,
  QueueLab,
  SparseMatrixLab,
  StackLab,
} from "@/components/system-design/CoreDataStructureLabs";
import {
  BipartiteCheckLab,
  ConnectedComponentsLab,
  CycleDetectionLab,
  GraphRepresentationLab,
  GraphUnionFindLab,
  StronglyConnectedComponentsLab,
} from "@/components/system-design/CoreGraphLabs";
import {
  BellmanFordLab,
  BipartiteMatchingLab,
  EdmondsKarpLab,
  FloydWarshallLab,
  KruskalLab,
  MaxFlowLab,
  MinCutLab,
  PrimLab,
} from "@/components/system-design/GraphOptimizationLabs";
import {
  CoinChangeLab,
  FibonacciMemoLab,
  GridDPLab,
  KnapsackLab,
  LCSLab,
  LISLab,
  MatrixChainLab,
  TreeDPLab,
} from "@/components/system-design/DynamicProgrammingLabs";
import {
  ActivitySelectionLab,
  BranchAndBoundLab,
  HuffmanCodingLab,
  IntervalSchedulingLab,
  MergeSortRecursionLab,
  NQueensLab,
  PermutationsSubsetsLab,
} from "@/components/system-design/GreedyBacktrackingLabs";
import {
  BinarySearchLab,
  BucketSortLab,
  CountingSortLab,
  ExternalMergeSortLab,
  HeapSortLab,
  QuickselectLab,
  RadixSortLab,
  TimSortLab,
} from "@/components/system-design/SearchSortLabs";
import {
  AVLTreeLab,
  BPlusTreeLab,
  BSTLab,
  BinaryTreeLab,
  DisjointSetLab,
  FenwickTreeLab,
  HeapLab,
  RedBlackTreeLab,
  SegmentTreeLab,
} from "@/components/system-design/CoreTreeLabs";

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
    slug: "array",
    title: "Array",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "Contiguous memory with constant-time indexed access.",
    caption:
      "Move the highlighted index and sliding window across contiguous cells. Arrays are fast because index lookup is address arithmetic, not traversal.",
    component: ArrayLab,
    skillTags: ["DSA", "Memory"],
    concept:
      "An array stores equal-sized elements in contiguous memory. If the base address and element size are known, the address of index i is base + i * elementSize, which gives O(1) random access.\n\nThat contiguity is also cache-friendly: scanning adjacent elements tends to use CPU cache lines efficiently. The tradeoff is that inserting or deleting in the middle requires shifting elements, and fixed-size arrays cannot grow without allocating new storage.",
    complexity: [
      { operation: "Access by index", time: "O(1)", space: "O(1)" },
      { operation: "Search unsorted", time: "O(n)", space: "O(1)" },
      { operation: "Insert/delete middle", time: "O(n)", space: "O(1)" },
    ],
    realWorld: [
      "Backing storage for vectors, strings, heaps, hash-table buckets, and database pages.",
      "Sliding-window algorithms over logs, metrics, and time-series samples.",
    ],
    pitfalls: [
      "Out-of-bounds access is unsafe in low-level languages.",
      "Middle insertions are expensive because data must shift.",
      "Sparse data wastes memory when represented as a dense array.",
    ],
  },
  {
    slug: "dynamic-array",
    title: "Dynamic Array",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Growable array with amortized O(1) append.",
    caption:
      "Push elements until capacity doubles. Most pushes are O(1); the resize push copies old elements into a larger backing array.",
    component: DynamicArrayLab,
    skillTags: ["DSA", "Memory"],
    concept:
      "A dynamic array wraps a fixed array with a length and capacity. Appending is cheap while capacity remains. When the array fills, it allocates a larger backing store, commonly 2x capacity, copies existing elements, then writes the new value.\n\nA resize is O(n), but it happens rarely enough that append is amortized O(1). This is the structure behind JavaScript arrays, Python lists, Java ArrayList, C++ vector, and Go slices.",
    complexity: [
      { operation: "Access", time: "O(1)", space: "O(1)" },
      { operation: "Append", time: "O(1) amortized", space: "O(n)" },
      { operation: "Insert/delete middle", time: "O(n)", space: "O(1)" },
    ],
    realWorld: ["UI lists, request buffers, parser token streams, and in-memory result sets."],
    pitfalls: [
      "Holding references into a backing array can break after resize in low-level languages.",
      "Over-allocation trades memory for append performance.",
      "Repeated front insertion is a poor fit; use a deque.",
    ],
  },
  {
    slug: "linked-list",
    title: "Linked List",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Pointer-linked nodes optimized for local insertion and deletion.",
    caption:
      "Insert at the head and traverse node by node. Linked lists avoid shifting but lose O(1) indexed access and cache locality.",
    component: LinkedListLab,
    skillTags: ["DSA", "Memory"],
    concept:
      "A linked list stores each value in a node that points to the next node. Singly linked lists support forward traversal; doubly linked lists also point backward. Inserting or deleting near a known node is O(1) because only pointers change.\n\nThe cost is lookup: finding index i requires walking from the head. Each node also carries pointer overhead and scattered allocation, which is less cache-friendly than arrays.",
    complexity: [
      { operation: "Insert/delete known node", time: "O(1)", space: "O(1)" },
      { operation: "Search/index lookup", time: "O(n)", space: "O(1)" },
      { operation: "Traversal", time: "O(n)", space: "O(1)" },
    ],
    realWorld: [
      "LRU cache recency chains, adjacency lists, memory allocators, and intrusive kernel lists.",
    ],
    pitfalls: [
      "Pointer bugs create cycles, leaks, or lost sublists.",
      "Poor cache locality can make lists slower than arrays despite better big-O for insertion.",
      "Deleting a node usually requires knowing its predecessor in a singly linked list.",
    ],
  },
  {
    slug: "stack",
    title: "Stack",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "Last-in, first-out storage for nested work.",
    caption:
      "Push and pop call frames from the top. The newest item is always removed first, matching recursion and parser behavior.",
    component: StackLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "A stack is a LIFO structure: push adds to the top, pop removes from the top, and peek reads the top without removing it. It can be implemented with an array or linked list.\n\nStacks model nested work. Function calls, expression parsing, undo history, DFS, browser navigation, and bracket matching all rely on the idea that the most recent unfinished item should be handled first.",
    complexity: [
      { operation: "Push", time: "O(1)", space: "O(1)" },
      { operation: "Pop/peek", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "Call stacks, DFS traversal, expression evaluators, undo stacks, and monotonic stacks.",
    ],
    pitfalls: [
      "Recursive algorithms can overflow the process call stack.",
      "Popping from an empty stack must be handled explicitly.",
      "A stack reverses order; this is useful but easy to misuse.",
    ],
  },
  {
    slug: "queue",
    title: "Queue",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "First-in, first-out ordering for fair processing.",
    caption:
      "Enqueue work at the back and dequeue from the front. Queue order preserves arrival order for BFS, jobs, and streams.",
    component: QueueLab,
    skillTags: ["DSA", "Backend"],
    concept:
      "A queue is a FIFO structure. Producers enqueue at the back; consumers dequeue from the front. This makes queues a natural fit for fair scheduling and breadth-first processing.\n\nQueues can be backed by linked lists, ring buffers, or broker logs. Production queues add persistence, acknowledgements, retries, visibility timeouts, dead-letter queues, and backpressure.",
    complexity: [
      { operation: "Enqueue", time: "O(1)", space: "O(1)" },
      { operation: "Dequeue/peek", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "BFS, worker queues, event loops, message brokers, print queues, and request buffers.",
    ],
    pitfalls: [
      "Unbounded queues hide overload as growing latency.",
      "Array-backed queues must avoid O(n) front shifts; use head/tail indexes.",
      "Distributed queues need idempotent consumers because retries happen.",
    ],
  },
  {
    slug: "deque",
    title: "Deque",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Double-ended queue for front and back operations.",
    caption:
      "Push and pop from either side. Deques combine stack-like and queue-like behavior without shifting the whole collection.",
    component: DequeLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "A deque, or double-ended queue, supports insertion and removal at both front and back. Implementations usually use a linked block list or circular array so both ends are O(1).\n\nDeques are useful when algorithms need both ends: sliding-window maximum keeps candidate values in monotonic order, work-stealing schedulers pop local work from one end and steal from the other, and editors use deques for history buffers.",
    complexity: [
      { operation: "Push/pop front", time: "O(1)", space: "O(1)" },
      { operation: "Push/pop back", time: "O(1)", space: "O(1)" },
      { operation: "Search", time: "O(n)", space: "O(1)" },
    ],
    realWorld: [
      "Sliding-window algorithms, job schedulers, undo/redo buffers, and browser history.",
    ],
    pitfalls: [
      "Random access is not always O(1), depending on implementation.",
      "Concurrency at both ends requires careful locking or lock-free design.",
      "A deque is not a priority queue; it preserves end order, not priority.",
    ],
  },
  {
    slug: "circular-buffer",
    title: "Circular Buffer",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Fixed-size ring storage with wrapping head and tail pointers.",
    caption:
      "Write and read through a fixed ring. Head and tail wrap with modulo arithmetic so no element shifting is required.",
    component: CircularBufferLab,
    skillTags: ["DSA", "Streaming", "Systems"],
    concept:
      "A circular buffer stores data in a fixed-size array with head and tail indexes that wrap around. Writing advances tail; reading advances head. When full, the buffer either rejects writes, blocks, or overwrites old data depending on policy.\n\nThis design gives predictable memory usage and O(1) operations, which is why it appears in audio pipelines, network drivers, log buffers, embedded systems, and streaming queues.",
    complexity: [
      { operation: "Read/write", time: "O(1)", space: "O(capacity)" },
      { operation: "Advance pointer", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "TCP buffers, audio/video streams, telemetry windows, kernel logs, and producer-consumer queues.",
    ],
    pitfalls: [
      "Full and empty states can look identical if only head and tail are tracked.",
      "Overwrite policy must be explicit.",
      "Multi-producer/multi-consumer rings require memory-ordering discipline.",
    ],
  },
  {
    slug: "hash-table",
    title: "Hash Table",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Map keys to buckets for average O(1) lookup.",
    caption:
      "Insert keys and watch them route to buckets. Collisions form chains, showing why load factor and hash quality matter.",
    component: HashTableLab,
    skillTags: ["DSA", "Backend"],
    concept:
      "A hash table stores key-value pairs by hashing each key to a bucket. A good hash function spreads keys evenly, giving O(1) average insert, lookup, and delete. Collisions are handled with chaining, open addressing, or hybrid schemes.\n\nHash tables power maps, sets, caches, indexes, joins, memoization, and deduplication. Performance depends on load factor, collision strategy, resizing policy, and hash quality.",
    complexity: [
      { operation: "Insert/lookup/delete", time: "O(1) average, O(n) worst", space: "O(n)" },
      { operation: "Resize", time: "O(n)", space: "O(n)" },
    ],
    realWorld: [
      "JavaScript Map/Object, Python dict, Redis dictionaries, compiler symbol tables, and hash joins.",
    ],
    pitfalls: [
      "Adversarial keys can force collisions unless hashing is hardened.",
      "Resizing can create latency spikes.",
      "Iteration order should not be relied on unless the implementation guarantees it.",
    ],
  },
  {
    slug: "bitset",
    title: "Bitset",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Pack boolean flags into bits for memory-efficient sets.",
    caption:
      "Toggle individual bits and watch the byte value change. Bitsets compress booleans and enable fast set operations with bitwise logic.",
    component: BitsetLab,
    skillTags: ["DSA", "Systems"],
    concept:
      "A bitset stores boolean values as individual bits instead of full bytes or objects. This reduces memory by up to 8x or more and enables word-level operations: AND for intersection, OR for union, XOR for differences, and bit shifts for compact state transitions.\n\nBitsets are ideal when the universe of possible values is bounded and can be mapped to integer positions.",
    complexity: [
      { operation: "Set/clear/test bit", time: "O(1)", space: "O(n / wordSize)" },
      { operation: "Union/intersection", time: "O(n / wordSize)", space: "O(n / wordSize)" },
    ],
    realWorld: [
      "Permissions flags, bitmap indexes, Bloom filters, graph reachability, schedulers, and feature flags.",
    ],
    pitfalls: [
      "Requires a stable mapping from item to bit position.",
      "Sparse large universes may waste memory.",
      "Bit arithmetic is compact but can reduce readability if not wrapped well.",
    ],
  },
  {
    slug: "sparse-matrix",
    title: "Sparse Matrix",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Store only non-zero cells instead of the full grid.",
    caption:
      "Scan non-zero matrix cells and compare the dense grid to coordinate triples. Sparse storage saves memory when most entries are zero.",
    component: SparseMatrixLab,
    skillTags: ["DSA", "ML", "Databases"],
    concept:
      "A sparse matrix represents a grid where most values are zero or empty. Instead of storing every cell, formats like COO store triples (row, column, value), CSR groups values by row, and CSC groups by column.\n\nSparse matrices are fundamental in search, recommendation systems, graphs, scientific computing, machine learning, and analytics because real relationships are often sparse.",
    complexity: [
      { operation: "Dense storage", time: "O(rows * cols)", space: "O(rows * cols)" },
      { operation: "Sparse storage", time: "O(nonZero)", space: "O(nonZero)" },
      { operation: "Lookup", time: "O(1) to O(log n)", space: "depends on index" },
    ],
    realWorld: [
      "User-item recommendation matrices, graph adjacency matrices, inverted indexes, and ML feature vectors.",
    ],
    pitfalls: [
      "Random lookup can be slower unless an index is added.",
      "Wrong sparse format makes operations expensive.",
      "When density grows, dense arrays can become faster and simpler.",
    ],
  },
  {
    slug: "binary-tree",
    title: "Binary Tree",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Hierarchical nodes with at most two children.",
    caption:
      "Step through level-order traversal and observe array-style child indexing. Binary trees are the base shape behind heaps, search trees, and expression trees.",
    component: BinaryTreeLab,
    skillTags: ["DSA", "Trees"],
    concept:
      "A binary tree is a hierarchical structure where each node has at most a left and right child. It does not require ordering by itself; it is just a shape. Traversals define how you visit nodes: preorder for serialization, inorder for sorted output in BSTs, postorder for cleanup/evaluation, and level-order for breadth-first scans.\n\nComplete binary trees can be stored compactly in arrays: for node i, left child is 2i+1 and right child is 2i+2.",
    complexity: [
      { operation: "Traversal", time: "O(n)", space: "O(h)" },
      { operation: "Access child pointer", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "ASTs in compilers, expression evaluators, heaps, decision trees, and UI scene graphs.",
    ],
    pitfalls: [
      "A plain binary tree has no search guarantee.",
      "Recursive traversal can overflow on deep trees.",
      "Tree height controls performance for many derived structures.",
    ],
  },
  {
    slug: "binary-search-tree",
    title: "Binary Search Tree",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Ordered tree where left is smaller and right is larger.",
    caption:
      "Search for values by branching left or right at each comparison. Balanced height gives logarithmic lookup.",
    component: BSTLab,
    skillTags: ["DSA", "Trees"],
    concept:
      "A binary search tree stores keys so every left subtree is smaller than the node and every right subtree is larger. This lets search, insert, and delete discard half-ish of the remaining tree at each step when the tree is balanced.\n\nThe weakness is shape. Inserting sorted data into a naive BST creates a linked list with O(n) operations. Balanced trees such as AVL and red-black trees add rotations to keep height logarithmic.",
    complexity: [
      { operation: "Search/insert/delete balanced", time: "O(log n)", space: "O(h)" },
      { operation: "Search/insert/delete worst", time: "O(n)", space: "O(h)" },
    ],
    realWorld: [
      "Ordered maps, range queries, symbol tables, and educational search-tree foundations.",
    ],
    pitfalls: [
      "Sorted inserts can degrade to a chain.",
      "Delete cases are easy to implement incorrectly.",
      "Duplicate-key policy must be explicit.",
    ],
  },
  {
    slug: "avl-tree",
    title: "AVL Tree",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Self-balancing BST with strict height guarantees.",
    caption:
      "Insert a skewing value and rotate back into balance. AVL tracks balance factor and performs rotations when height differs too much.",
    component: AVLTreeLab,
    skillTags: ["DSA", "Trees"],
    concept:
      "An AVL tree is a self-balancing binary search tree. For every node, the height difference between left and right subtrees must be -1, 0, or 1. After insertion or deletion, the tree restores this invariant using single or double rotations.\n\nAVL trees are stricter than red-black trees, so lookups are very fast due to lower height. The cost is more frequent rotations on write-heavy workloads.",
    complexity: [
      { operation: "Search", time: "O(log n)", space: "O(1)" },
      { operation: "Insert/delete", time: "O(log n)", space: "O(1)" },
      { operation: "Rotation", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "Read-heavy in-memory indexes, language libraries, and schedulers needing ordered lookup.",
    ],
    pitfalls: [
      "Balance-factor updates are easy to get wrong.",
      "More rotations than red-black trees under frequent writes.",
      "Recursive implementations must handle height updates carefully.",
    ],
  },
  {
    slug: "red-black-tree",
    title: "Red-Black Tree",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Balanced BST using color rules and rotations.",
    caption:
      "Toggle a violation fix to see recoloring and rotation. Red-black trees keep height bounded without being as strict as AVL.",
    component: RedBlackTreeLab,
    skillTags: ["DSA", "Trees"],
    concept:
      "A red-black tree is a balanced BST with color invariants: nodes are red or black, the root is black, red nodes cannot have red children, and every path to a null leaf has the same number of black nodes. These rules bound height to O(log n).\n\nCompared with AVL, red-black trees allow looser balance and typically perform fewer rotations on updates, which makes them popular for general-purpose ordered maps.",
    complexity: [
      { operation: "Search/insert/delete", time: "O(log n)", space: "O(1)" },
      { operation: "Recolor/rotation fix", time: "O(log n)", space: "O(1)" },
    ],
    realWorld: ["Java TreeMap, C++ std::map/std::set, Linux kernel rbtree, and epoll timers."],
    pitfalls: [
      "Color invariants are subtle to preserve.",
      "Implementation complexity is higher than AVL or treap.",
      "Not optimal for cache locality compared with B-trees.",
    ],
  },
  {
    slug: "heap-priority-queue",
    title: "Heap / Priority Queue",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Tree-backed structure for repeatedly extracting min or max.",
    caption:
      "Push and pop the minimum value. The root is always the next highest-priority item while the full array remains only partially ordered.",
    component: HeapLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "A binary heap is a complete binary tree usually stored in an array. In a min-heap, every parent is less than or equal to its children, so the minimum is always at the root. Push bubbles a value up; pop swaps root with the last item and bubbles down.\n\nA priority queue exposes this behavior as insert plus extract-min/extract-max. It is central to scheduling, Dijkstra, A*, event simulation, and top-k problems.",
    complexity: [
      { operation: "Peek", time: "O(1)", space: "O(1)" },
      { operation: "Push/pop", time: "O(log n)", space: "O(1)" },
      { operation: "Build heap", time: "O(n)", space: "O(1)" },
    ],
    realWorld: ["Job schedulers, timers, Dijkstra/A*, top-k analytics, and merge-k-sorted-lists."],
    pitfalls: [
      "A heap is not globally sorted.",
      "Removing arbitrary items needs extra indexing.",
      "Priority ties require deterministic tie-breaking when order matters.",
    ],
  },
  {
    slug: "segment-tree",
    title: "Segment Tree",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Range queries and point updates in logarithmic time.",
    caption:
      "Select ranges and compute sums from covered intervals. Segment trees trade memory for fast range aggregation.",
    component: SegmentTreeLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "A segment tree recursively partitions an array into intervals. Each tree node stores an aggregate for its interval, such as sum, min, max, gcd, or a custom merge value. Range queries combine only the nodes that fully cover the requested interval.\n\nPoint updates update one leaf and recompute ancestors. Lazy propagation extends the structure to range updates by deferring work until a child interval is needed.",
    complexity: [
      { operation: "Build", time: "O(n)", space: "O(n)" },
      { operation: "Range query", time: "O(log n)", space: "O(log n)" },
      { operation: "Point update", time: "O(log n)", space: "O(1)" },
    ],
    realWorld: [
      "Leaderboard intervals, time-series windows, computational geometry, and competitive programming range queries.",
    ],
    pitfalls: [
      "Uses more memory than a Fenwick tree.",
      "Lazy propagation bugs are common.",
      "The merge function must be associative.",
    ],
  },
  {
    slug: "fenwick-tree",
    title: "Fenwick Tree",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Compact prefix sums with lowbit jumps.",
    caption:
      "Move the prefix endpoint and watch the query summarize values with lowbit jumps. Fenwick trees are smaller and simpler than segment trees for prefix-style operations.",
    component: FenwickTreeLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "A Fenwick tree, or Binary Indexed Tree, stores partial sums in an array. The lowbit operation, i & -i, tells each index how large a range it summarizes. Prefix queries repeatedly subtract lowbit; point updates repeatedly add lowbit.\n\nFenwick trees are excellent for prefix sums, frequency tables, inversion counts, and dynamic cumulative distributions when the operation has an inverse.",
    complexity: [
      { operation: "Prefix query", time: "O(log n)", space: "O(1)" },
      { operation: "Point update", time: "O(log n)", space: "O(1)" },
      { operation: "Build", time: "O(n log n) or O(n)", space: "O(n)" },
    ],
    realWorld: [
      "Inversion counting, ranked leaderboards, cumulative frequencies, and online analytics buckets.",
    ],
    pitfalls: [
      "Indexing is usually 1-based, which causes off-by-one bugs.",
      "Less flexible than segment trees for arbitrary range operations.",
      "Requires invertible operations for easy range query conversion.",
    ],
  },
  {
    slug: "disjoint-set-union",
    title: "Disjoint Set Union",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Track connected components with union-find.",
    caption:
      "Union sets and watch components merge. DSU answers whether two nodes belong to the same component almost instantly.",
    component: DisjointSetLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "Disjoint Set Union, also called union-find, maintains a partition of items into non-overlapping sets. Find returns a representative root; union merges two sets. Path compression flattens trees during find, and union by rank/size keeps them shallow.\n\nWith both optimizations, operations are effectively constant time: O(alpha(n)), where alpha is the inverse Ackermann function and grows so slowly it is below 5 for practical inputs.",
    complexity: [
      { operation: "Find/union optimized", time: "O(alpha(n))", space: "O(n)" },
      { operation: "Connected?", time: "O(alpha(n))", space: "O(1)" },
    ],
    realWorld: [
      "Kruskal MST, image segmentation, network connectivity, percolation, and account merging.",
    ],
    pitfalls: [
      "Naive union can create tall trees.",
      "Path compression mutates parent pointers during reads.",
      "DSU handles merges well but not arbitrary edge deletions.",
    ],
  },
  {
    slug: "b-plus-tree",
    title: "B+ Tree",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Disk-friendly ordered index with linked leaf pages.",
    caption:
      "Scan linked leaf pages under a small internal index. B+ trees optimize databases for range scans and block storage.",
    component: BPlusTreeLab,
    skillTags: ["DSA", "Databases", "System Design"],
    concept:
      "A B+ tree is a high-fanout balanced search tree used for storage indexes. Internal nodes store separator keys that guide search. Records live in leaf pages, and leaves are linked so range scans can proceed sequentially.\n\nHigh fanout keeps height small, often 3-4 levels for millions of keys. Because nodes align with disk or SSD pages, each search performs a small number of page reads instead of many pointer hops.",
    complexity: [
      { operation: "Search/insert/delete", time: "O(log_f n)", space: "O(n)" },
      { operation: "Range scan k records", time: "O(log_f n + k)", space: "O(1)" },
    ],
    realWorld: ["PostgreSQL, MySQL/InnoDB, SQLite, filesystems, and ordered key-value stores."],
    pitfalls: [
      "Page splits and merges must preserve balance.",
      "Random inserts fragment pages more than sequential keys.",
      "Concurrency requires latching or optimistic page protocols.",
    ],
  },
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
      {
        label: "Burton Bloom — Space/Time Trade-offs in Hash Coding (1970)",
        href: "https://dl.acm.org/doi/10.1145/362686.362692",
      },
      {
        label: "Cassandra docs — Bloom Filters",
        href: "https://cassandra.apache.org/doc/latest/cassandra/architecture/storage_engine.html",
      },
    ],
  },
  {
    slug: "graph-representations",
    title: "Graph Representations",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Adjacency lists vs matrices for storing relationships.",
    caption:
      "Switch between adjacency list and matrix views. Sparse graphs favor lists; dense graphs and O(1) edge checks can favor matrices.",
    component: GraphRepresentationLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "A graph models entities as vertices and relationships as edges. The representation determines memory use and operation cost. An adjacency list stores neighbors per vertex, using O(V + E) space and working well for sparse graphs. An adjacency matrix stores every possible pair, using O(V^2) space but giving O(1) edge-existence checks.\n\nDirected graphs store edge direction; weighted graphs attach costs; multigraphs allow repeated edges. Choosing the representation is often the first performance decision in a graph problem.",
    complexity: [
      { operation: "Adjacency list space", time: "—", space: "O(V + E)" },
      { operation: "Adjacency matrix space", time: "—", space: "O(V^2)" },
      { operation: "Matrix edge check", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "Social graphs, dependency graphs, route maps, knowledge graphs, and network topologies.",
    ],
    pitfalls: [
      "A matrix is wasteful for sparse graphs.",
      "A list makes edge-existence checks O(degree) unless indexed.",
      "Directed vs undirected edge insertion must be explicit.",
    ],
  },
  {
    slug: "connected-components",
    title: "Connected Components",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Group reachable nodes in an undirected graph.",
    caption:
      "Highlight each component. DFS or BFS marks all nodes reachable from a start node before moving to the next unvisited node.",
    component: ConnectedComponentsLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "A connected component is a maximal group of nodes where every node can reach every other node through undirected edges. To find all components, iterate over vertices; whenever a vertex is unvisited, start DFS or BFS and mark the entire reachable group.\n\nConnected components answer whether a graph is split into islands. They are also the foundation for clustering, image regions, account merging, and graph cleanup.",
    complexity: [
      { operation: "Find all components", time: "O(V + E)", space: "O(V)" },
      { operation: "Single BFS/DFS", time: "O(component vertices + edges)", space: "O(V)" },
    ],
    realWorld: [
      "Network partition detection, image segmentation, social communities, and duplicate-account clusters.",
    ],
    pitfalls: [
      "Directed graphs need weak or strong component definitions.",
      "For huge graphs, recursion can overflow; use iterative traversal.",
      "Disconnected isolated nodes are components of size one.",
    ],
  },
  {
    slug: "cycle-detection",
    title: "Cycle Detection",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Detect loops in directed and undirected graphs.",
    caption:
      "Add an edge to create a cycle. DFS detects back edges in directed graphs and non-parent visited edges in undirected graphs.",
    component: CycleDetectionLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "Cycle detection asks whether a path can return to a previously visited node. In directed graphs, DFS tracks three states: unvisited, visiting, and done. Seeing an edge to a visiting node means a back edge and therefore a cycle. In undirected graphs, seeing a visited neighbor that is not the parent indicates a cycle.\n\nCycle detection is essential for dependency validation, deadlock detection, scheduling, and graph sanity checks.",
    complexity: [
      { operation: "DFS cycle detection", time: "O(V + E)", space: "O(V)" },
      { operation: "Union-Find undirected cycle check", time: "O(E alpha(V))", space: "O(V)" },
    ],
    realWorld: [
      "Package managers, build systems, lock graphs, workflow engines, and schema dependency checks.",
    ],
    pitfalls: [
      "Directed and undirected cycle rules differ.",
      "A visited node is not always a cycle in directed DFS; it must be in the current recursion stack.",
      "Self-loops and parallel edges need explicit handling.",
    ],
  },
  {
    slug: "strongly-connected-components",
    title: "Strongly Connected Components",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Find maximal mutually reachable groups in directed graphs.",
    caption:
      "Step through SCC groups. Tarjan compresses cycles into components using discovery indexes and low-link values.",
    component: StronglyConnectedComponentsLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "A strongly connected component, or SCC, is a maximal set of directed graph nodes where every node can reach every other node. Tarjan's algorithm performs one DFS, assigns discovery indexes, maintains low-link values, and pops a component when a node is the root of an SCC.\n\nCollapsing SCCs turns a directed graph into a DAG, which is useful for dependency analysis, compiler optimization, deadlock reasoning, and graph simplification.",
    complexity: [
      { operation: "Tarjan SCC", time: "O(V + E)", space: "O(V)" },
      { operation: "Kosaraju SCC", time: "O(V + E)", space: "O(V + E)" },
    ],
    realWorld: [
      "Compiler control-flow analysis, dependency cycles, web link graphs, and service-call cycle detection.",
    ],
    pitfalls: [
      "Low-link updates must distinguish tree edges from back edges.",
      "SCCs apply to directed graphs; undirected components are simpler.",
      "Recursive Tarjan can overflow on very deep graphs.",
    ],
  },
  {
    slug: "bipartite-check",
    title: "Bipartite Check",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Determine whether a graph can be colored with two sets.",
    caption:
      "Toggle a conflict and see two-coloring fail. A graph is bipartite when every edge connects opposite colors.",
    component: BipartiteCheckLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "A graph is bipartite if its vertices can be split into two sets such that every edge connects nodes from different sets. BFS or DFS can test this by assigning alternating colors. If an edge ever connects nodes with the same color, the graph is not bipartite.\n\nBipartite graphs are exactly graphs with no odd-length cycles. They are the structure behind matching problems, assignment systems, recommendations, and constraint checks.",
    complexity: [{ operation: "Two-color check", time: "O(V + E)", space: "O(V)" }],
    realWorld: [
      "Job-to-worker matching, user-item recommendation graphs, conflict constraints, and scheduling.",
    ],
    pitfalls: [
      "Disconnected graphs require starting BFS from every uncolored node.",
      "Self-loops immediately violate bipartiteness.",
      "Odd cycles are the reason two-coloring fails.",
    ],
  },
  {
    slug: "graph-union-find",
    title: "Graph Union-Find",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Answer dynamic connectivity in undirected graphs.",
    caption:
      "Union incoming edges and watch components merge. Union-Find is the graph connectivity workhorse behind Kruskal and online component tracking.",
    component: GraphUnionFindLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "Union-Find maintains connected components as edges arrive. Each node points to a parent representative. Find returns the root; union merges two roots. Path compression and union by size or rank make operations almost constant time.\n\nFor undirected graphs where edges are only added, Union-Find is usually faster and simpler than rerunning DFS after every edge.",
    complexity: [
      { operation: "Find/union", time: "O(alpha(V))", space: "O(V)" },
      { operation: "Process E edges", time: "O(E alpha(V))", space: "O(V)" },
    ],
    realWorld: [
      "Kruskal minimum spanning tree, network connectivity, account merge, percolation, and image regions.",
    ],
    pitfalls: [
      "Does not support arbitrary deletions cleanly.",
      "Works for undirected connectivity, not directed reachability.",
      "Without path compression/rank, trees can become tall.",
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
    references: [
      { label: "LeetCode 146 — LRU Cache", href: "https://leetcode.com/problems/lru-cache/" },
    ],
  },
  {
    slug: "bellman-ford",
    title: "Bellman-Ford",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Shortest paths with negative edges and cycle detection.",
    caption:
      "Relax every edge pass by pass. Unlike Dijkstra, Bellman-Ford can handle negative weights and detect reachable negative cycles.",
    component: BellmanFordLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "Bellman-Ford computes shortest paths from one source by repeatedly relaxing every edge. After at most V-1 passes, every shortest path without cycles has been discovered. A final pass that can still improve a distance proves a reachable negative-weight cycle.\n\nIt is slower than Dijkstra but more general because edge weights may be negative. This matters in systems that model credits, arbitrage, penalties, or constraint differences.",
    complexity: [
      { operation: "Shortest paths", time: "O(VE)", space: "O(V)" },
      { operation: "Negative-cycle check", time: "O(E)", space: "O(1)" },
    ],
    realWorld: [
      "Currency arbitrage, routing with penalties, constraint systems, and graph sanity checks.",
    ],
    pitfalls: [
      "Negative cycles make shortest paths undefined.",
      "It is usually too slow for very large sparse graphs when weights are non-negative.",
      "Only cycles reachable from the source are detected in the standard version.",
    ],
  },
  {
    slug: "floyd-warshall",
    title: "Floyd-Warshall",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "All-pairs shortest paths with dynamic programming.",
    caption:
      "Allow each intermediate node and update the distance matrix. Floyd-Warshall is compact and powerful for dense graphs.",
    component: FloydWarshallLab,
    skillTags: ["DSA", "Graphs", "Dynamic Programming"],
    concept:
      "Floyd-Warshall computes shortest paths between every pair of vertices. It uses dynamic programming over allowed intermediate nodes: when node k becomes available, every pair i,j checks whether going through k improves its distance.\n\nThe algorithm is simple and handles negative edges, but not negative cycles. Its O(V^3) runtime makes it best for small or dense graphs where all-pairs answers are needed.",
    complexity: [
      { operation: "All-pairs shortest paths", time: "O(V^3)", space: "O(V^2)" },
      { operation: "Path reconstruction", time: "O(path length)", space: "O(V^2)" },
    ],
    realWorld: [
      "Small network routing tables, game maps, transitive closure, and dependency distance analysis.",
    ],
    pitfalls: [
      "Too expensive for large sparse graphs.",
      "Negative cycles require separate detection.",
      "Path reconstruction needs a next-hop matrix, not just distances.",
    ],
  },
  {
    slug: "prim-mst",
    title: "Prim MST",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Grow a minimum spanning tree from one connected frontier.",
    caption:
      "Add the cheapest edge crossing from the visited set to the unvisited set. Prim keeps one growing connected tree.",
    component: PrimLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "Prim's algorithm finds a minimum spanning tree of a connected weighted undirected graph. It starts from any node, maintains a visited set, and repeatedly chooses the cheapest edge that connects visited to unvisited nodes.\n\nWith a priority queue, Prim is efficient on sparse graphs. It is a natural fit when the graph is already represented by adjacency lists and you want to grow from a known starting point.",
    complexity: [
      { operation: "With binary heap", time: "O(E log V)", space: "O(V + E)" },
      { operation: "Dense matrix version", time: "O(V^2)", space: "O(V)" },
    ],
    realWorld: ["Network cabling, cluster design, road planning, and approximation pipelines."],
    pitfalls: [
      "Requires undirected weighted graphs.",
      "Disconnected graphs produce a spanning forest, not one tree.",
      "MST minimizes total edge cost, not shortest paths from a source.",
    ],
  },
  {
    slug: "kruskal-mst",
    title: "Kruskal MST",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Build an MST by sorting edges and skipping cycles.",
    caption:
      "Consider edges in ascending weight order. Union-Find accepts edges that connect different components and rejects cycle-forming edges.",
    component: KruskalLab,
    skillTags: ["DSA", "Graphs"],
    concept:
      "Kruskal's algorithm sorts all edges by weight, then scans from cheapest to most expensive. An edge is accepted only if it connects two different components; otherwise it would create a cycle. Union-Find makes the component test fast.\n\nKruskal is especially clean when edges are already available as a list or when the graph is sparse.",
    complexity: [
      { operation: "Sort edges", time: "O(E log E)", space: "O(E)" },
      { operation: "Union-Find scan", time: "O(E alpha(V))", space: "O(V)" },
    ],
    realWorld: ["Clustering, network design, image segmentation, and offline graph optimization."],
    pitfalls: [
      "Parallel edges are allowed; choose the cheapest useful one.",
      "Disconnected input yields a minimum spanning forest.",
      "Sorting dominates runtime for most inputs.",
    ],
  },
  {
    slug: "max-flow",
    title: "Max Flow",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Push as much flow as possible from source to sink.",
    caption:
      "Augment paths through a small network and watch capacities fill. Residual capacity determines where more flow can still move.",
    component: MaxFlowLab,
    skillTags: ["DSA", "Graphs", "Optimization"],
    concept:
      "Max flow asks for the largest amount that can be sent from a source to a sink through capacity-limited edges. Algorithms maintain a residual graph: unused forward capacity and backward edges that allow earlier choices to be revised.\n\nThe abstraction appears anywhere limited resources move through a network: bandwidth, assignments, traffic, supply chains, and matching problems.",
    complexity: [
      {
        operation: "Ford-Fulkerson",
        time: "O(E * maxFlow) for integer capacities",
        space: "O(V + E)",
      },
      { operation: "Residual update", time: "O(path length)", space: "O(E)" },
    ],
    realWorld: [
      "Bandwidth allocation, evacuation planning, supply chains, bipartite matching, and image segmentation.",
    ],
    pitfalls: [
      "Naive path choice can be slow.",
      "Irrational capacities can prevent Ford-Fulkerson termination in theory.",
      "Residual backward edges are essential, not optional.",
    ],
  },
  {
    slug: "edmonds-karp",
    title: "Edmonds-Karp",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Max flow using BFS shortest augmenting paths.",
    caption:
      "Run BFS augmentations and track bottlenecks. Edmonds-Karp is slower than modern flow algorithms but easier to reason about.",
    component: EdmondsKarpLab,
    skillTags: ["DSA", "Graphs", "Optimization"],
    concept:
      "Edmonds-Karp is the Ford-Fulkerson method with one rule: choose augmenting paths using BFS in the residual graph. That shortest-path rule gives a polynomial O(VE^2) bound and avoids pathological path choices.\n\nIt is a practical teaching algorithm for residual graphs, bottlenecks, and flow conservation before moving to Dinic or Push-Relabel.",
    complexity: [
      { operation: "Max flow", time: "O(VE^2)", space: "O(V + E)" },
      { operation: "One BFS augmentation", time: "O(E)", space: "O(V)" },
    ],
    realWorld: [
      "Teaching max flow, small assignment systems, and correctness baselines for optimized solvers.",
    ],
    pitfalls: [
      "Too slow for very large flow networks.",
      "Must update reverse edges after every augmentation.",
      "BFS is over residual capacity, not original capacity.",
    ],
  },
  {
    slug: "min-cut",
    title: "Min Cut",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Find the smallest capacity separating source from sink.",
    caption:
      "Compare two cuts through the network. The best cut capacity equals the max-flow value.",
    component: MinCutLab,
    skillTags: ["DSA", "Graphs", "Optimization"],
    concept:
      "An s-t cut partitions vertices into a source side and a sink side. Its capacity is the sum of capacities on edges crossing from source side to sink side. The min-cut problem asks for the lowest such capacity.\n\nThe max-flow min-cut theorem states that the maximum source-to-sink flow equals the minimum cut capacity. After a max-flow run, nodes reachable from the source in the residual graph identify a minimum cut.",
    complexity: [
      { operation: "After max-flow", time: "O(V + E)", space: "O(V)" },
      { operation: "Via flow algorithm", time: "depends on max-flow", space: "O(V + E)" },
    ],
    realWorld: [
      "Image segmentation, network reliability, graph partitioning, and identifying bottleneck links.",
    ],
    pitfalls: [
      "Cut direction matters in directed graphs.",
      "A visually small cut is not always the minimum-capacity cut.",
      "Min cut depends on capacities, not just edge count.",
    ],
  },
  {
    slug: "bipartite-matching",
    title: "Bipartite Matching",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Pair left and right sets with augmenting paths.",
    caption:
      "Augment the matching until no improving path remains. Matching powers assignment, scheduling, and recommendation constraints.",
    component: BipartiteMatchingLab,
    skillTags: ["DSA", "Graphs", "Optimization"],
    concept:
      "Bipartite matching pairs nodes from a left set to nodes in a right set so no node is used more than once. An augmenting path alternates between unmatched and matched edges; flipping that path increases the matching size by one.\n\nThe problem can be solved with DFS augmenting paths, Hopcroft-Karp for better asymptotics, or max-flow by connecting a source to left nodes and right nodes to a sink.",
    complexity: [
      { operation: "DFS augmenting paths", time: "O(VE)", space: "O(V + E)" },
      { operation: "Hopcroft-Karp", time: "O(E sqrt(V))", space: "O(V + E)" },
    ],
    realWorld: [
      "Job assignment, school admissions, ad allocation, dating/recommendation constraints, and resource scheduling.",
    ],
    pitfalls: [
      "Greedy matching can get stuck below optimal.",
      "Weighted matching is a different problem.",
      "The graph must be bipartite for these algorithms.",
    ],
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
    slug: "binary-search",
    title: "Binary Search",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Find a target in sorted data by halving the search space.",
    caption:
      "Step through lo, mid, and hi. Binary search is simple, but boundary handling is where most bugs live.",
    component: BinarySearchLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "Binary search works on sorted monotonic data. It compares the target with the middle element, discards the half that cannot contain the answer, and repeats. The same idea applies to arrays, answer-space search, lower_bound/upper_bound, and monotonic predicates.\n\nThe key is maintaining an invariant: the answer is always inside the active range, or the active range represents the boundary being searched.",
    complexity: [
      { operation: "Search", time: "O(log n)", space: "O(1)" },
      { operation: "Recursive search", time: "O(log n)", space: "O(log n)" },
    ],
    realWorld: [
      "Database index lookup, sorted logs, feature thresholds, pagination cursors, and capacity planning search.",
    ],
    pitfalls: [
      "Off-by-one errors in lo/hi updates.",
      "Requires sorted or monotonic data.",
      "mid = (lo + hi) / 2 can overflow in low-level languages; use lo + (hi-lo)/2.",
    ],
  },
  {
    slug: "quickselect",
    title: "Quickselect",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Find the kth smallest element without fully sorting.",
    caption:
      "Partition around a pivot and recurse only into the side containing rank k. Quickselect is selection, not sorting.",
    component: QuickselectLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "Quickselect uses the same partitioning idea as quicksort, but after partitioning it only recurses into the side containing the desired rank. This gives O(n) average time for kth smallest/largest selection.\n\nIt is ideal when you need a median, percentile, or top-k threshold without paying O(n log n) to sort the full input.",
    complexity: [
      { operation: "Average selection", time: "O(n)", space: "O(1)" },
      { operation: "Worst case", time: "O(n^2)", space: "O(1)" },
    ],
    realWorld: [
      "Median latency, percentile dashboards, top-k filtering, and approximate ranking pipelines.",
    ],
    pitfalls: [
      "Bad pivots create quadratic behavior.",
      "It mutates the input unless copied.",
      "k indexing must be consistent: zero-based vs one-based.",
    ],
  },
  {
    slug: "heap-sort",
    title: "Heap Sort",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Sort in-place using a binary heap.",
    caption:
      "Build a heap, extract the root into the sorted suffix, and heapify the remaining prefix.",
    component: HeapSortLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "Heap sort first transforms the array into a max heap. The largest item is at the root, so it swaps the root with the end of the array, shrinks the heap, and heapifies the root again. Repeating this produces a sorted suffix.\n\nIt has guaranteed O(n log n) time and O(1) auxiliary space, but it is not stable and usually has worse cache behavior than quicksort or TimSort.",
    complexity: [
      { operation: "Build heap", time: "O(n)", space: "O(1)" },
      { operation: "Sort", time: "O(n log n)", space: "O(1)" },
    ],
    realWorld: ["In-place sorting under tight memory constraints and priority-queue fundamentals."],
    pitfalls: [
      "Not stable.",
      "Often slower in practice than optimized quicksort/TimSort.",
      "Heap index arithmetic is prone to off-by-one errors.",
    ],
  },
  {
    slug: "counting-sort",
    title: "Counting Sort",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Linear-time sorting for small integer ranges.",
    caption:
      "Count each key, then rebuild output from frequencies. Counting sort wins when the value range is bounded.",
    component: CountingSortLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "Counting sort avoids comparisons. It counts how many times each integer key appears, then emits keys in order. A stable variant uses prefix sums to place records in output while preserving equal-key order.\n\nThe runtime is O(n + k), where k is the key range. That is linear only when k is reasonably small.",
    complexity: [
      { operation: "Sort", time: "O(n + k)", space: "O(k)" },
      { operation: "Stable placement", time: "O(n + k)", space: "O(n + k)" },
    ],
    realWorld: [
      "Grades, small IDs, histogram sorting, radix sort subroutine, and frequency analytics.",
    ],
    pitfalls: [
      "Large key ranges waste memory.",
      "Negative keys need offset mapping.",
      "Plain count expansion is not stable unless prefix placement is used.",
    ],
  },
  {
    slug: "radix-sort",
    title: "Radix Sort",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Sort integers or strings digit by digit.",
    caption:
      "Bucket numbers by ones or tens digit. Stable passes from least-significant to most-significant digit produce sorted output.",
    component: RadixSortLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "Radix sort processes keys by digits rather than comparing whole values. LSD radix sort starts with the least-significant digit and uses a stable sort, often counting sort, for each digit. MSD radix sort starts from the most-significant digit and recursively partitions.\n\nFor fixed-width integers or strings, radix sort can be linear in the number of digits times n.",
    complexity: [{ operation: "Sort", time: "O(d(n + b))", space: "O(n + b)" }],
    realWorld: [
      "Integer sorting, string sorting, network addresses, IDs, and high-performance analytics kernels.",
    ],
    pitfalls: [
      "Requires stable per-digit sorting for LSD radix.",
      "Variable-length keys need padding or careful ordering.",
      "Constants can beat comparison sorts only for suitable key types.",
    ],
  },
  {
    slug: "bucket-sort",
    title: "Bucket Sort",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Distribute values into buckets, sort locally, then concatenate.",
    caption:
      "Map normalized values into ranges. Bucket sort is powerful when input is roughly uniformly distributed.",
    component: BucketSortLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "Bucket sort partitions input into value ranges, sorts each bucket, then concatenates buckets in order. If values are uniformly distributed and bucket counts stay small, the result is close to linear time.\n\nIt is a distribution sort: performance depends less on comparisons and more on how evenly the bucket function spreads data.",
    complexity: [
      { operation: "Average sort", time: "O(n + k)", space: "O(n + k)" },
      { operation: "Worst case", time: "O(n^2)", space: "O(n)" },
    ],
    realWorld: [
      "Floating-point ranges, histogram processing, distributed partitioning, and approximate ranking.",
    ],
    pitfalls: [
      "Skewed input overloads a bucket.",
      "Bucket boundaries must preserve global ordering.",
      "Needs a local sorting strategy inside each bucket.",
    ],
  },
  {
    slug: "timsort",
    title: "TimSort",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Production hybrid sort optimized for real-world partially ordered data.",
    caption:
      "Identify natural sorted runs and merge them. TimSort powers Python and Java object sorting because real data is often already partly sorted.",
    component: TimSortLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "TimSort is a hybrid stable sorting algorithm derived from merge sort and insertion sort. It scans for natural ordered runs already present in the input, extends small runs with insertion sort, and merges runs while maintaining stack invariants that keep merging balanced.\n\nIt performs especially well on real-world data because logs, UI lists, and database results are often partially sorted before sorting begins.",
    complexity: [
      { operation: "Best case", time: "O(n)", space: "O(n)" },
      { operation: "Worst case", time: "O(n log n)", space: "O(n)" },
    ],
    realWorld: [
      "Python list.sort/sorted, Java object arrays, Android, and production UI/data sorting.",
    ],
    pitfalls: [
      "Implementation is complex because run invariants matter.",
      "Needs extra memory for merges.",
      "Primitive-array sorts may use different algorithms.",
    ],
  },
  {
    slug: "external-merge-sort",
    title: "External Merge Sort",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Sort datasets larger than memory with run generation and k-way merge.",
    caption:
      "Create sorted disk runs, then merge them. External sorting optimizes I/O instead of CPU comparisons.",
    component: ExternalMergeSortLab,
    skillTags: ["DSA", "Databases", "Big Data"],
    concept:
      "External merge sort handles data too large to fit in memory. It reads memory-sized chunks, sorts each chunk into a run on disk, then performs a k-way merge using buffers and a priority queue.\n\nThe key cost is I/O. Good implementations choose run size, merge fan-in, compression, and sequential access patterns to minimize disk passes.",
    complexity: [
      { operation: "Run generation", time: "O(n log m)", space: "O(m)" },
      { operation: "K-way merge", time: "O(n log k)", space: "O(k)" },
    ],
    realWorld: [
      "Database ORDER BY, data warehouses, search indexing, log processing, and ETL pipelines.",
    ],
    pitfalls: [
      "Random I/O destroys performance.",
      "Too many merge passes increase disk reads/writes.",
      "Temporary storage must be sized for run files.",
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
    slug: "fibonacci-memoization",
    title: "Fibonacci Memoization",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "Turn exponential recursion into linear work by caching subproblems.",
    caption:
      "Move n and watch solved Fibonacci values stay cached. Memoization is top-down dynamic programming.",
    component: FibonacciMemoLab,
    skillTags: ["DSA", "Dynamic Programming"],
    concept:
      "Naive Fibonacci recursion recomputes the same subproblems many times. Memoization stores each solved F(n), so later calls return immediately. This changes the runtime from exponential to linear.\n\nThis is the core dynamic programming move: identify overlapping subproblems, define a recurrence, cache results, and reuse them.",
    complexity: [
      { operation: "Naive recursion", time: "O(2^n)", space: "O(n)" },
      { operation: "Memoized DP", time: "O(n)", space: "O(n)" },
    ],
    realWorld: [
      "Recursive optimization, parsers, route planning, and expensive repeated computations.",
    ],
    pitfalls: [
      "Cache key must capture all state.",
      "Memoization can trade too much memory for speed.",
      "Cycles in recurrence need detection.",
    ],
  },
  {
    slug: "knapsack",
    title: "0/1 Knapsack",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Choose items under capacity to maximize value.",
    caption:
      "Adjust capacity and compare item choices. Each item can be taken or skipped exactly once.",
    component: KnapsackLab,
    skillTags: ["DSA", "Dynamic Programming"],
    concept:
      "0/1 knapsack asks for the maximum value that fits within a weight capacity when each item can be chosen at most once. The recurrence compares skipping the item vs taking it and adding the best value for remaining capacity.\n\nIt is a canonical DP because the same subproblem appears repeatedly: best value using first i items and capacity w.",
    complexity: [
      { operation: "DP table", time: "O(nW)", space: "O(nW)" },
      { operation: "1D optimized", time: "O(nW)", space: "O(W)" },
    ],
    realWorld: [
      "Budget allocation, packing, feature selection, and constrained resource planning.",
    ],
    pitfalls: [
      "Pseudo-polynomial: W matters.",
      "Loop direction matters for 1D 0/1 DP.",
      "Fractional knapsack is a different greedy problem.",
    ],
  },
  {
    slug: "coin-change",
    title: "Coin Change",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Compute minimum coins or number of ways for a target amount.",
    caption:
      "Change the amount and inspect the DP table. Each amount reuses smaller solved amounts.",
    component: CoinChangeLab,
    skillTags: ["DSA", "Dynamic Programming"],
    concept:
      "Coin change appears in two common forms: minimum coins to make an amount, or number of combinations. For minimum coins, dp[a] = min(dp[a], dp[a - coin] + 1). The table builds from amount 0 upward.\n\nThe exact loop order changes semantics. Iterating coins outside amounts counts combinations; iterating amount outside coins can count permutations.",
    complexity: [{ operation: "Min coins", time: "O(amount * coins)", space: "O(amount)" }],
    realWorld: ["Payment systems, resource bundles, dynamic pricing, and combinatorial counting."],
    pitfalls: [
      "Unreachable amounts need Infinity/sentinel handling.",
      "Combination vs permutation loop order is easy to mix up.",
      "Greedy only works for some coin systems.",
    ],
  },
  {
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Find the longest ordered subsequence without requiring contiguity.",
    caption: "Advance across values and track the best subsequence ending at each index.",
    component: LISLab,
    skillTags: ["DSA", "Dynamic Programming"],
    concept:
      "The O(n^2) LIS DP defines lis[i] as the longest increasing subsequence ending at i. It scans all earlier j where nums[j] < nums[i], then extends the best candidate. A faster O(n log n) method keeps tails: the smallest possible ending value for each length.\n\nLIS is useful for ordering, ranking, diffing, and reducing problems to monotonic subsequences.",
    complexity: [
      { operation: "Classic DP", time: "O(n^2)", space: "O(n)" },
      { operation: "Tails + binary search", time: "O(n log n)", space: "O(n)" },
    ],
    realWorld: ["Version diffing, ranking systems, envelope nesting, and sequence analysis."],
    pitfalls: [
      "Subsequence is not substring.",
      "Strict vs non-decreasing comparison changes answer.",
      "The O(n log n) tails array does not directly store the sequence without parent links.",
    ],
  },
  {
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Find shared order between two sequences.",
    caption:
      "Fill the DP matrix row by row. Matching characters extend the diagonal; mismatches take the best neighbor.",
    component: LCSLab,
    skillTags: ["DSA", "Dynamic Programming"],
    concept:
      "LCS finds the longest sequence that appears in both inputs in the same order, not necessarily contiguously. If characters match, dp[i][j] = 1 + dp[i-1][j-1]. Otherwise it takes max(dp[i-1][j], dp[i][j-1]).\n\nIt is the foundation for diff tools and sequence similarity because it preserves relative ordering.",
    complexity: [
      { operation: "LCS length", time: "O(mn)", space: "O(mn)" },
      { operation: "Space optimized length", time: "O(mn)", space: "O(min(m,n))" },
    ],
    realWorld: ["Git diff, document comparison, DNA/protein sequence analysis, and merge tools."],
    pitfalls: [
      "LCS differs from longest common substring.",
      "Reconstructing the sequence needs backtracking or parent data.",
      "Large strings require memory optimization.",
    ],
  },
  {
    slug: "matrix-chain-multiplication",
    title: "Matrix Chain Multiplication",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Choose multiplication order that minimizes scalar operations.",
    caption: "Compare two parenthesizations with the same result but very different costs.",
    component: MatrixChainLab,
    skillTags: ["DSA", "Dynamic Programming"],
    concept:
      "Matrix multiplication is associative, so A(BC) and (AB)C produce the same final matrix, but the number of scalar operations can be wildly different. Matrix-chain DP tries every split k between i and j, combining the best left cost, best right cost, and multiplication cost.\n\nThis is interval DP: solve smaller ranges, then compose larger ranges.",
    complexity: [{ operation: "Optimal parenthesization", time: "O(n^3)", space: "O(n^2)" }],
    realWorld: ["Query planning, tensor algebra, compiler optimization, and scientific computing."],
    pitfalls: [
      "Only optimizes order, not mathematical result.",
      "Requires compatible dimensions.",
      "The split table is needed to reconstruct parentheses.",
    ],
  },
  {
    slug: "grid-dp",
    title: "Grid DP",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Solve path/counting problems by combining neighboring cells.",
    caption:
      "Add an obstacle and watch path counts change. Each cell depends on previously solved adjacent cells.",
    component: GridDPLab,
    skillTags: ["DSA", "Dynamic Programming"],
    concept:
      "Grid DP appears when movement is constrained, often to right/down or four directions with acyclic ordering. For path counting, each cell combines top and left counts. For minimum path sum, each cell takes its cost plus min(top, left).\n\nThe trick is choosing an iteration order where dependencies are already solved.",
    complexity: [
      { operation: "m x n grid", time: "O(mn)", space: "O(mn)" },
      { operation: "Rolling row", time: "O(mn)", space: "O(n)" },
    ],
    realWorld: [
      "Robot paths, image processing, edit-distance grids, game maps, and spreadsheet-like propagation.",
    ],
    pitfalls: [
      "Obstacles need zero/blocked states.",
      "Movement cycles break simple row-order DP.",
      "Boundary initialization controls correctness.",
    ],
  },
  {
    slug: "tree-dp",
    title: "Tree DP",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Return multiple states per node and combine child answers.",
    caption:
      "Toggle include/exclude root. Tree DP often computes states like take-this-node vs skip-this-node.",
    component: TreeDPLab,
    skillTags: ["DSA", "Dynamic Programming", "Trees"],
    concept:
      "Tree DP solves recursive problems where each node combines answers from children. Many problems return multiple states per node. For example, maximum independent set returns include-node and exclude-node: including a node excludes children, while excluding it allows each child to choose its best state.\n\nBecause trees have no cycles, postorder traversal naturally solves children before parents.",
    complexity: [{ operation: "Postorder DP", time: "O(n)", space: "O(h)" }],
    realWorld: [
      "Org chart optimization, dependency trees, AST optimization, network design, and hierarchical permissions.",
    ],
    pitfalls: [
      "Root choice can matter for directed/parented states.",
      "Rerooting DP is needed when every node may be root.",
      "Recursive depth can overflow on skewed trees.",
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
    complexity: [{ operation: "Single-source", time: "O((V + E) log V)", space: "O(V)" }],
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
    slug: "interval-scheduling",
    title: "Interval Scheduling",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Select the maximum number of non-overlapping intervals.",
    caption:
      "Pick intervals by earliest finish time. The local greedy choice leaves maximum room for future compatible intervals.",
    component: IntervalSchedulingLab,
    skillTags: ["DSA", "Greedy"],
    concept:
      "Interval scheduling asks for the largest set of non-overlapping intervals. The optimal greedy rule is to sort by finish time and repeatedly choose the first interval that starts after the last selected interval ends.\n\nThis works because the earliest-finishing compatible interval never leaves less room for future intervals than a later-finishing choice.",
    complexity: [{ operation: "Sort + select", time: "O(n log n)", space: "O(1) to O(n)" }],
    realWorld: [
      "Calendar booking, meeting room allocation, CPU job windows, and media ad slot planning.",
    ],
    pitfalls: [
      "Sorting by start time or shortest duration is not generally optimal.",
      "Weighted intervals need DP, not this greedy rule.",
      "Boundary rules for touching intervals must be defined.",
    ],
  },
  {
    slug: "activity-selection",
    title: "Activity Selection",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "Greedily choose compatible activities with equal value.",
    caption:
      "Activities with equal value reduce to interval scheduling. Pick the next activity that finishes earliest.",
    component: ActivitySelectionLab,
    skillTags: ["DSA", "Greedy"],
    concept:
      "Activity selection is the classic greedy scheduling problem: given start and finish times, choose the maximum number of mutually compatible activities. When every activity has equal value, earliest-finish-time greedy is optimal.\n\nThe problem teaches the exchange argument: replace the first activity in an optimal solution with the earliest finishing compatible one without making the solution worse.",
    complexity: [
      { operation: "After sorting", time: "O(n)", space: "O(1)" },
      { operation: "Including sort", time: "O(n log n)", space: "O(1) to O(n)" },
    ],
    realWorld: [
      "Single-machine scheduling, classroom planning, task windows, and interview scheduling.",
    ],
    pitfalls: [
      "Not suitable when activities have different profit.",
      "Requires known start/end times.",
      "Overlapping definition affects compatibility.",
    ],
  },
  {
    slug: "huffman-coding",
    title: "Huffman Coding",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Build optimal prefix codes from character frequencies.",
    caption:
      "Merge the two lowest-frequency nodes repeatedly. Frequent symbols get shorter codes; rare symbols get longer codes.",
    component: HuffmanCodingLab,
    skillTags: ["DSA", "Compression", "Greedy"],
    concept:
      "Huffman coding constructs an optimal prefix-free binary code for known symbol frequencies. It repeatedly removes the two least frequent nodes from a priority queue, merges them, and pushes the combined node back.\n\nPrefix-free means no code is the prefix of another, so decoding is unambiguous. The greedy merge is optimal because the two least frequent symbols can safely be placed deepest as siblings.",
    complexity: [
      { operation: "Build tree", time: "O(n log n)", space: "O(n)" },
      { operation: "Encode/decode", time: "O(message bits)", space: "O(n)" },
    ],
    realWorld: ["DEFLATE/ZIP concepts, media codecs, column compression, and telemetry encoding."],
    pitfalls: [
      "Requires frequency model or two-pass input.",
      "Not adaptive unless rebuilt or updated.",
      "Arithmetic coding can compress closer to entropy.",
    ],
  },
  {
    slug: "n-queens",
    title: "N-Queens",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Backtrack through board placements with constraint pruning.",
    caption:
      "Place one queen per row and reject attacked columns or diagonals. Backtracking searches only valid partial states.",
    component: NQueensLab,
    skillTags: ["DSA", "Backtracking"],
    concept:
      "N-Queens asks for placing N queens on an N x N chessboard so no two attack each other. Backtracking places a queen row by row, maintaining used columns and diagonals. If a placement violates constraints, that branch is abandoned immediately.\n\nThe technique generalizes to constraint satisfaction: build partial solutions, prune invalid states, and backtrack when no option remains.",
    complexity: [{ operation: "Backtracking search", time: "O(N!) worst-ish", space: "O(N)" }],
    realWorld: ["Constraint solvers, scheduling, puzzle engines, and test-case generation."],
    pitfalls: [
      "Naive board scanning is slower than column/diagonal sets.",
      "Symmetric solutions can duplicate work.",
      "Backtracking still has exponential worst-case growth.",
    ],
  },
  {
    slug: "permutations-subsets",
    title: "Permutations & Subsets",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Generate combinatorial search spaces with recursion.",
    caption:
      "Switch between include/exclude subsets and order-sensitive permutations. Both are core backtracking templates.",
    component: PermutationsSubsetsLab,
    skillTags: ["DSA", "Backtracking"],
    concept:
      "Subset generation branches on each item: include it or skip it. Permutation generation branches by choosing each remaining item for the next position. These templates are the basis for exhaustive search and many pruning algorithms.\n\nThe output size dominates runtime: there are 2^n subsets and n! permutations.",
    complexity: [
      { operation: "Generate subsets", time: "O(n 2^n)", space: "O(n)" },
      { operation: "Generate permutations", time: "O(n n!)", space: "O(n)" },
    ],
    realWorld: [
      "Feature combinations, brute-force search, puzzle solving, and small input optimization.",
    ],
    pitfalls: [
      "Output grows explosively.",
      "Duplicate input values need deduping rules.",
      "Mutable path arrays must be copied at output time.",
    ],
  },
  {
    slug: "branch-and-bound",
    title: "Branch and Bound",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Search optimization branches while pruning hopeless states.",
    caption:
      "Expand the best bound and prune branches that cannot beat the incumbent. This is exhaustive search with math-guided cuts.",
    component: BranchAndBoundLab,
    skillTags: ["DSA", "Optimization"],
    concept:
      "Branch and bound solves optimization problems by branching over decisions and computing a bound on the best possible result inside each branch. If a branch cannot beat the current best solution, it is pruned.\n\nThe quality of the bound determines performance. Strong bounds prune aggressively; weak bounds degrade toward brute force.",
    complexity: [
      { operation: "Worst case", time: "exponential", space: "depends on frontier" },
      {
        operation: "Pruned practical case",
        time: "problem/bound dependent",
        space: "problem dependent",
      },
    ],
    realWorld: [
      "Integer programming, knapsack optimization, TSP solvers, scheduling, and search planning.",
    ],
    pitfalls: [
      "A wrong bound can prune the optimal answer.",
      "Weak bounds do little work reduction.",
      "Priority frontier can grow large.",
    ],
  },
  {
    slug: "merge-sort-recursion",
    title: "Merge Sort Recursion",
    category: "Algorithms",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Divide arrays into halves, then merge sorted halves.",
    caption:
      "Split down to singletons, then merge back into sorted order. Merge sort is the canonical divide-and-conquer algorithm.",
    component: MergeSortRecursionLab,
    skillTags: ["DSA", "Divide and Conquer"],
    concept:
      "Merge sort divides an array into halves until each piece has one element, then merges sorted halves back together. The divide phase creates log n levels, and each level performs O(n) total merge work.\n\nIt guarantees O(n log n), is stable, and adapts well to linked lists and external sorting because merging is sequential.",
    complexity: [
      { operation: "Sort", time: "O(n log n)", space: "O(n)" },
      { operation: "Merge two sorted arrays", time: "O(n)", space: "O(n)" },
    ],
    realWorld: [
      "Stable sorting, external merge sort, linked-list sorting, and distributed sort pipelines.",
    ],
    pitfalls: [
      "Needs extra memory for arrays.",
      "Recursive allocation can be costly if not optimized.",
      "Small arrays are often faster with insertion sort.",
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
      {
        label: "OpenID Connect Core 1.0",
        href: "https://openid.net/specs/openid-connect-core-1_0.html",
      },
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
      {
        label: "Ralph Merkle — original 1979 paper",
        href: "https://www.merkle.com/papers/Thesis1979.pdf",
      },
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
      {
        label: "Karger et al. — Consistent Hashing (1997)",
        href: "https://dl.acm.org/doi/10.1145/258533.258660",
      },
      {
        label: "DynamoDB paper",
        href: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf",
      },
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
      {
        label: "Eric Brewer — CAP Theorem (2000 keynote, 2012 retrospective)",
        href: "https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/",
      },
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
      {
        label: "Coffman et al. — System Deadlocks (1971)",
        href: "https://dl.acm.org/doi/10.1145/356586.356588",
      },
    ],
  },
  {
    slug: "gossip-protocol",
    title: "Gossip Protocol",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Epidemic state dissemination.",
    caption:
      "A cluster of nodes spreads state like a virus. Adjust the fanout and watch how a single update infects the entire network in O(log N) steps. Perfect for decentralized systems without a single point of failure.",
    component: GossipProtocol,
    skillTags: ["Distributed Systems", "System Design"],
    concept:
      "Gossip protocols (or epidemic protocols) are a family of decentralized communication patterns inspired by the way social gossip or viruses spread. In a cluster, each node periodically picks a random peer and 'gossips' its latest state. \n\nThe beauty of gossip is its resilience: it requires no central coordinator, and even if half the network fails, the message will still eventually reach every surviving node. It converges in O(log N) rounds, where N is the number of nodes. \n\nModern systems use gossip for failure detection (detecting when a node goes down), membership (knowing who is in the cluster), and metadata synchronization.",
    complexity: [
      { operation: "Convergence", time: "O(log N)", space: "O(1) local state" },
      { operation: "Message Load", time: "O(1) per node per tick", space: "O(fanout)" },
    ],
    realWorld: [
      "Apache Cassandra: uses gossip for cluster membership and failure detection.",
      "HashiCorp Consul: uses the Serf library (Swim-based gossip) for health checking.",
      "Amazon S3: spreads bucket metadata across thousands of nodes using gossip.",
      "Bitcoin: nodes discover peers and announce new transactions via gossip.",
    ],
    pitfalls: [
      "High fanout = faster convergence but higher network bandwidth usage.",
      "Network partitions can cause 'split brain' if not combined with a consensus layer.",
      "Zombie nodes: if a node is silent for too long, it's hard to distinguish 'dead' from 'partitioned'.",
    ],
    references: [
      {
        label: "SWIM: Scalable Weakly-consistent Infection-style Process Group Membership",
        href: "https://www.cs.cornell.edu/projects/Quicksilver/public_pdfs/SWIM.pdf",
      },
    ],
  },
  {
    slug: "distributed-tx",
    title: "Saga vs 2PC",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "2-Phase Commit vs Eventual Sagas.",
    caption:
      "Simulate a cross-service purchase. Compare the rigid lock-step of 2PC (Two-Phase Commit) with the flexible, compensating-transaction model of Sagas. Inject failures and watch how each system recovers — or fails.",
    component: DistributedTx,
    skillTags: ["Distributed Systems", "Microservices"],
    concept:
      "Atomic transactions are easy in a single database, but across microservices, you must choose between Strong Consistency (2PC) and Eventual Consistency (Saga).\n\n2PC (Two-Phase Commit) uses a coordinator to ask all participants to 'prepare' (lock resources), then 'commit'. It guarantees atomicity but is blocking and fragile: if the coordinator or a node fails during the lock phase, the system stalls.\n\nSagas break a transaction into a sequence of local transactions. Each step has a corresponding 'compensating transaction' (undo). If step 3 fails, the Saga runs the undo actions for steps 2 and 1. It scales better and doesn't hold locks, but allows 'interleaving' where other users might see partially complete state.",
    complexity: [
      { operation: "2PC Latency", time: "2 RTTs + Locks", space: "O(N) locks" },
      { operation: "Saga Latency", time: "N local TXs", space: "O(N) log storage" },
    ],
    realWorld: [
      "Bank Transfers: legacy systems often use 2PC/XA for strong atomicity.",
      "Uber/Lyft: Sagas manage the ride-request → payment → driver-dispatch flow.",
      "Booking.com: Sagas handle flight + hotel + car rental bundles.",
      "Temporal / Zeebe: Workflow engines designed specifically to manage long-running Sagas.",
    ],
    pitfalls: [
      "Saga steps must be idempotent because undos/retries will happen.",
      "2PC scales poorly beyond a few nodes due to the blocking 'prepare' phase.",
      "Lack of isolation in Sagas means you need 'semantic locks' or careful business logic to handle concurrent updates.",
    ],
  },
  {
    slug: "snowflake-id",
    title: "Snowflake IDs",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "K-ordered unique IDs at scale.",
    caption:
      "Generate IDs that are unique across thousands of machines without a central database. Deconstruct the 64-bit ID into its components: Timestamp, Worker ID, and Sequence number. Fast, sorted, and collision-free.",
    component: SnowflakeId,
    skillTags: ["Distributed Systems", "System Design"],
    concept:
      "Snowflake is a distributed ID generation service used when you need unique, roughly time-sorted (k-ordered) 64-bit integers across a massive cluster without the bottleneck of a central auto-incrementing database.\n\nThe 64 bits are typically divided: 1 bit (unused), 41 bits (milliseconds since epoch), 10 bits (machine/worker ID), and 12 bits (sequence number). This allows for 4,096 IDs per millisecond per worker, for ~69 years.\n\nBecause the timestamp is the most significant part, IDs are naturally sorted by time, which is highly beneficial for database indexing (keeping B-Tree inserts sequential).",
    complexity: [
      { operation: "Generate", time: "O(1)", space: "8 bytes" },
      { operation: "Throughput", time: "4,096 IDs / ms / node", space: "—" },
    ],
    realWorld: [
      "Twitter: the original creator of the Snowflake algorithm.",
      "Discord: uses snowflakes for every message, user, and server ID.",
      "Instagram: uses a similar ShardingID approach in Postgres.",
      "Sony: uses snowflakes for PlayStation Network activity IDs.",
    ],
    pitfalls: [
      "Clock skew is the enemy: if a machine's clock moves backwards, it might generate duplicate IDs. Servers must wait or error out.",
      "Machine ID management: you need a way (Zookeeper/etcd) to assign unique 10-bit IDs to workers.",
    ],
    references: [
      {
        label: "Twitter Snowflake original source",
        href: "https://github.com/twitter-archive/snowflake/tree/snowflake-2010",
      },
    ],
  },
  {
    slug: "vector-clocks",
    title: "Vector Clocks",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Detecting causality and conflicts.",
    caption:
      "Witness how distributed systems track time without a central clock. Trigger events on different nodes and watch the vectors grow. Detect 'happened-before' relationships and identify concurrent write conflicts (siblings).",
    component: VectorClocks,
    skillTags: ["Distributed Systems", "System Design"],
    concept:
      "In a distributed system, there is no single 'now'. Physical clocks drift, making them unreliable for ordering events. Vector clocks are a logical clock mechanism used to determine the partial ordering of events and detect causality violations.\n\nEach node maintains a vector of counters (one for every node in the cluster). When a node performs an internal event, it increments its own counter. When it sends a message, it includes its vector. The receiver updates its vector by taking the element-wise maximum. \n\nIf vector A is strictly less than vector B, then A 'happened before' B. If neither is less than the other, the events happened concurrently, and we have a conflict that requires resolution (e.g., Last-Write-Wins or application-side merging).",
    complexity: [
      { operation: "Update", time: "O(1)", space: "O(N) where N = nodes" },
      { operation: "Compare", time: "O(N)", space: "—" },
    ],
    realWorld: [
      "Amazon Dynamo: the original paper popularized vector clocks for conflict detection.",
      "Riak: a distributed NoSQL DB that uses vector clocks (and later Dotted Version Vectors).",
      "Voldemort: LinkedIn's distributed key-value store.",
    ],
    pitfalls: [
      "Vector size grows linearly with the number of nodes. In large clusters, vectors can become massive ('Vector Clock Bloat').",
      "Pruning: to save space, systems eventually prune old counters, which can rarely lead to false conflict detections.",
    ],
    references: [
      {
        label: "Leslie Lamport — Time, Clocks, and the Ordering of Events (1978)",
        href: "https://lamport.azurewebsites.net/pubs/time-clocks.pdf",
      },
      {
        label: "Dynamo: Amazon’s Highly Available Key-value Store",
        href: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf",
      },
    ],
  },
  {
    slug: "lsm-tree",
    title: "LSM Tree",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Write-optimized storage engine.",
    caption:
      "Experience the high-throughput engine behind NoSQL. Watch as writes are buffered in a MemTable, flushed to immutable SSTables, and eventually merged through background compaction. Fast writes, at the cost of background I/O.",
    component: LSMTree,
    skillTags: ["DSA", "System Design", "Databases"],
    concept:
      "Log-Structured Merge-Trees (LSM Trees) are the data structure of choice for write-heavy workloads. Unlike B-Trees, which perform random-access updates, LSM Trees turn all writes into sequential I/O.\n\n1. Writes hit an in-memory **MemTable** (usually a Skip List).\n2. When full, the MemTable is flushed to disk as an immutable **SSTable** (Sorted String Table).\n3. Over time, many SSTables accumulate. A background **Compaction** process merges them, removing deleted or overwritten keys and keeping the total number of files manageable.\n\nThis architecture provides massive write throughput but introduces 'Read Amplification' (checking multiple files) and 'Write Amplification' (re-writing data during compaction).",
    complexity: [
      { operation: "Write", time: "O(1) amortized", space: "Sequential I/O" },
      { operation: "Read", time: "O(log N * #files)", space: "Random I/O" },
    ],
    realWorld: [
      "RocksDB: the engine inside TiDB, CockroachDB, and MyRocks.",
      "Apache Cassandra: uses LSM for high-availability writes.",
      "Bigtable: Google's original wide-column store.",
      "InfluxDB: uses a variant (TSM) for time-series data.",
    ],
    pitfalls: [
      "Write Stalls: if compaction can't keep up with the write rate, the system will eventually block writes to catch up.",
      "Space Amplification: deleted data isn't actually removed until the next compaction cycle.",
    ],
    references: [
      {
        label: "The Log-Structured Merge-Tree (LSM-Tree) — O'Neil et al.",
        href: "https://www.cs.umb.edu/~poneil/lsmtree.pdf",
      },
    ],
  },
  {
    slug: "hyperloglog",
    title: "HyperLogLog",
    category: "Data Structures",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Probabilistic cardinality estimation.",
    caption:
      "Count 10 million unique items using only 1.5KB of memory. Watch the 'buckets' record the maximum number of leading zeros in hashed values to estimate cardinality with a ~1% error rate. Space-efficiency at its peak.",
    component: HyperLogLog,
    skillTags: ["DSA", "System Design", "Big Data"],
    concept:
      "HyperLogLog (HLL) is a probabilistic algorithm used to estimate the number of unique elements (cardinality) in a set. While a Set would require memory proportional to the number of elements, HLL can estimate a cardinality of billions using less than 2KB of memory.\n\nIt works by hashing every incoming item and looking at the number of leading zeros in the binary hash. If you see a hash with 10 leading zeros, it's statistically likely that you've seen ~2^10 items. HLL averages these observations across thousands of 'buckets' to produce a highly accurate estimate.\n\nThe trade-off is a small, predictable error rate (usually 0.81% for 16,384 buckets).",
    complexity: [
      { operation: "Add", time: "O(1)", space: "O(log log N) bits" },
      { operation: "Merge", time: "O(M) where M = buckets", space: "O(1)" },
    ],
    realWorld: [
      "Redis: the `PFADD` and `PFCOUNT` commands are HLL implementations.",
      "Google BigQuery: used for rapid `COUNT(DISTINCT)` over petabytes.",
      "Facebook: counts unique daily active users (DAU) across various dimensions efficiently.",
    ],
    pitfalls: [
      "It is a 'maybe' count. Never use HLL for billing or tasks where 100% precision is required.",
      "Small sets: HLL is less accurate for small sets; most implementations use a 'Linear Counting' fallback for low cardinalities.",
    ],
    references: [
      {
        label: "HyperLogLog: the analysis of a near-optimal cardinality estimation algorithm",
        href: "http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf",
      },
    ],
  },
  {
    slug: "quadtree",
    title: "QuadTree / GeoSpatial",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "2D spatial partitioning.",
    caption:
      "Efficiently find points in a 2D area. Watch the space recursively subdivide into four quadrants as more points are added. Perfect for collision detection, map markers, and image compression.",
    component: QuadTreeLab,
    skillTags: ["DSA", "Graphics", "GeoSpatial"],
    concept:
      "A QuadTree is a spatial data structure used to partition a two-dimensional space by recursively subdividing it into four quadrants (Northwest, Northeast, Southwest, Southeast). \n\nInstead of checking every point in the world (O(N)), a QuadTree allows you to prune entire branches of the search tree that don't overlap with your query area. This turns a global search into an O(log N) operation.\n\nIt is the 2D equivalent of an Octree (3D) and is a foundational structure for game engines, geographic information systems (GIS), and sparse data representations.",
    complexity: [
      { operation: "Insert", time: "O(log N) avg, O(N) worst", space: "O(N)" },
      { operation: "Range Query", time: "O(K + log N)", space: "O(log N) stack" },
    ],
    realWorld: [
      "Game Engines: for broad-phase collision detection between entities.",
      "Map Rendering: to efficiently determine which markers are visible on the current screen zoom.",
      "Image Compression: regions with uniform color are represented by larger nodes.",
    ],
    pitfalls: [
      "Degenerate cases: if many points are at the exact same coordinate, the tree can become extremely deep. Most implementations set a 'Max Depth'.",
      "Dynamic objects: if objects move constantly, re-inserting them into the QuadTree every frame can be expensive.",
    ],
  },
  {
    slug: "skip-list",
    title: "Skip List",
    category: "Data Structures",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Probabilistic search structure.",
    caption:
      "A linked list that acts like a balanced tree. Use 'express lanes' (higher levels) to skip large sections of data. Watch the coin-flip decide the height of each node during insertion. The simplicity of a list with the speed of a tree.",
    component: SkipList,
    skillTags: ["DSA", "Redis"],
    concept:
      "A Skip List is a probabilistic data structure that provides the same O(log N) search and insertion complexity as a balanced binary tree (like an AVL or Red-Black tree), but with a much simpler implementation based on linked lists.\n\nIt consists of multiple layers. The bottom layer is a standard sorted linked list. Each higher layer acts as an 'express lane' for the lists below. To find a value, you start at the top level and 'skip' forward until you would overshoot, then drop down a level.\n\nInsertion height is determined randomly (usually a 50% chance to grow a level), which statistically ensures that the layers maintain the proper density for O(log N) performance.",
    complexity: [
      { operation: "Search", time: "O(log N) avg", space: "O(N) avg" },
      { operation: "Insert", time: "O(log N) avg", space: "O(1) per node" },
    ],
    realWorld: [
      "Redis: the internal structure for `Sorted Sets` (ZSET).",
      "LevelDB / RocksDB: the implementation used for the in-memory MemTable.",
      "Lucene: used for some parts of the inverted index.",
    ],
    pitfalls: [
      "Worst-case performance is O(N) if the coin flips are extremely unlucky (all nodes height 1), though the probability is infinitesimally small.",
      "Pointer overhead: the multiple levels of pointers consume more memory than a compact array-based structure.",
    ],
  },
  {
    slug: "trie",
    title: "Trie (Prefix Tree)",
    category: "Data Structures",
    difficulty: "Beginner",
    readingTimeMin: 3,
    blurb: "The engine of autocomplete.",
    caption:
      "Store and search strings by their common prefixes. Watch as words like 'CAT' and 'CART' share the same initial nodes. Perfect for dictionaries, IP routing, and predictive text.",
    component: TrieLab,
    skillTags: ["DSA", "Strings"],
    concept:
      "A Trie (from 'retrieval') is a tree-based data structure used for storing a set of strings where each node represents a single character. Words with common prefixes share the same path from the root.\n\nUnlike a hash map, a Trie allows for efficient prefix-based queries ('find all words starting with 'tra''). Searching for a word of length L takes O(L) time, regardless of how many millions of words are in the Trie.\n\nWhile space-intensive for small sets, Tries become very efficient as the overlap between strings increases.",
    complexity: [
      { operation: "Insert", time: "O(L) where L = length", space: "O(L * alphabet_size)" },
      { operation: "Search", time: "O(L)", space: "O(1)" },
      { operation: "Prefix Search", time: "O(L + K) where K = matches", space: "O(1)" },
    ],
    realWorld: [
      "Search Engines: for 'as-you-type' suggestions (autocomplete).",
      "IP Routing: Longest Prefix Match (LPM) in network routers.",
      "T9 Predictive Text: on older mobile phones.",
      "Spell Checkers: for identifying valid word completions.",
    ],
    pitfalls: [
      "High Memory: for large datasets with little prefix overlap, a Trie can use much more memory than a sorted list or hash set. Use a **Radix Tree** (compressed Trie) to solve this.",
    ],
  },
  {
    slug: "astar-search",
    title: "A* Search",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Heuristic-based pathfinding.",
    caption:
      "Find the optimal path with intelligence. Compare A* to Dijkstra and watch how the heuristic (distance to goal) guides the search, pruning thousands of unnecessary explorations. The standard for game AI and GPS.",
    component: AStarSearch,
    skillTags: ["DSA", "AI"],
    concept:
      "A* is an extension of Dijkstra's algorithm that uses a heuristic to guide its search. While Dijkstra explores in all directions equally (circularly), A* prioritizes nodes that 'look' closer to the goal.\n\nIt uses the function `f(n) = g(n) + h(n)`:\n- `g(n)`: the actual cost from the start to node `n`.\n- `h(n)`: the estimated cost from `n` to the goal (the heuristic).\n\nIf the heuristic is **admissible** (it never overestimates the cost), A* is guaranteed to find the shortest path while exploring far fewer nodes than Dijkstra.",
    complexity: [{ operation: "Search", time: "O(E) worst case", space: "O(V)" }],
    realWorld: [
      "Video Games: for NPC movement and navigation meshes.",
      "Google Maps: as a base for routing (often with contraction hierarchies).",
      "Robotics: for motion planning in known environments.",
    ],
    pitfalls: [
      "Bad Heuristics: if your heuristic is not admissible, A* might find a sub-optimal path. If it's not consistent, it might be slower than Dijkstra.",
      "Memory: Like Dijkstra, A* keeps all visited nodes in memory, which can be an issue for massive graphs.",
    ],
  },
  {
    slug: "pagerank",
    title: "PageRank",
    category: "Algorithms",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "The logic of influence.",
    caption:
      "See the web through Google's original lens. Watch 'authority' flow between nodes via links. Adjust the damping factor and watch how the most connected and influential pages rise to the top of the rankings.",
    component: PageRankLab,
    skillTags: ["Algorithms", "Graphs", "Data Science"],
    concept:
      "PageRank is the algorithm that launched Google. it measures the importance of website pages by treating links as votes. A page is important if many other pages link to it, especially if those linking pages are themselves important.\n\nIt works via a 'random surfer' model: a user clicks random links, and occasionally jumps to a random page (the **Damping Factor**, usually 0.85). The PageRank of a node is the probability that the surfer ends up there after many steps.\n\nMathematically, it's an eigenvector problem: we repeatedly multiply a probability vector by a transition matrix until it converges.",
    complexity: [
      { operation: "Iteration", time: "O(V + E)", space: "O(V)" },
      { operation: "Convergence", time: "Depends on graph", space: "—" },
    ],
    realWorld: [
      "Search Engines: for ranking web pages by authority.",
      "Social Networks: identifying 'influencers' or key nodes in a social graph.",
      "Bioinformatics: ranking the importance of genes or proteins in biological pathways.",
      "Recommendation Systems: predicting which products a user might like based on graph similarity.",
    ],
    pitfalls: [
      "Link Farms: groups of pages that link to each other to artificially inflate their PageRank.",
      "Dangling Nodes: nodes with no outgoing links can 'drain' the PageRank from the system if not handled with a jump factor.",
    ],
    references: [
      {
        label: "The Anatomy of a Large-Scale Hypertextual Web Search Engine (Brin & Page, 1998)",
        href: "http://infolab.stanford.edu/~backrub/google.html",
      },
    ],
  },
  {
    slug: "levenshtein",
    title: "Levenshtein Distance",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Calculating the cost of change.",
    caption:
      "Find the minimum number of edits to turn one string into another. Watch the Dynamic Programming matrix fill up as it calculates the cost of Insertions, Deletions, and Substitutions. The foundation of diffing and spell-check.",
    component: LevenshteinLab,
    skillTags: ["Algorithms", "Strings", "Dynamic Programming"],
    concept:
      "Levenshtein Distance (or Edit Distance) measures the minimum number of single-character edits required to change one string into another. Edits include: Insertion, Deletion, and Substitution.\n\nIt is a classic application of **Dynamic Programming**. We build a 2D matrix where `dp[i][j]` represents the distance between the first `i` characters of string A and the first `j` characters of string B. \n\nEach cell is calculated from its neighbors: a match costs 0 + diagonal, while a mismatch costs 1 + the minimum of the three adjacent cells.",
    complexity: [
      { operation: "Compute", time: "O(M * N)", space: "O(M * N)" },
      { operation: "Optimized Space", time: "O(M * N)", space: "O(min(M, N))" },
    ],
    realWorld: [
      "Spell Checkers: suggesting the closest valid word to a typo.",
      "Git Diff: helping calculate which lines were modified.",
      "Bioinformatics: comparing DNA sequences to find mutations.",
      "NLP: fuzzy string matching for entity resolution.",
    ],
    pitfalls: [
      "Performance: O(M*N) is too slow for very long strings (e.g., full books). Use the **Wagner–Fischer** algorithm optimization or bit-parallelism for better performance.",
    ],
  },
  {
    slug: "rabin-karp",
    title: "Rabin-Karp",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Rolling hash string search.",
    caption:
      "Search for a needle in a haystack using math. Watch the rolling hash window slide across the text, updating its value in O(1) time. Efficiently detect pattern matches and potential collisions with cryptographic-like hashing.",
    component: RabinKarp,
    skillTags: ["Algorithms", "Strings", "Hashing"],
    concept:
      "Rabin-Karp is a string-searching algorithm that uses hashing to find any one of a set of pattern strings in a text. \n\nInstead of checking every character at every position (O(N*M)), it calculates a hash for the pattern and compares it to the hash of the current window in the text. To make this efficient, it uses a **Rolling Hash**: when the window slides, the new hash is calculated from the old hash in O(1) time by 'removing' the character that left and 'adding' the one that entered.\n\nIf the hashes match, the algorithm performs a character-by-character check to handle potential collisions.",
    complexity: [
      { operation: "Search", time: "O(N + M) average", space: "O(1)" },
      { operation: "Search (Worst)", time: "O(N * M)", space: "O(1)" },
    ],
    realWorld: [
      "Plagiarism Detection: finding identical passages across multiple documents.",
      "Intrusion Detection: searching network packets for multiple known malware signatures.",
      "Bioinformatics: finding specific gene sequences in a genome.",
    ],
    pitfalls: [
      "Hash Collisions: a bad hash function can lead to many 'spurious hits' where hashes match but strings don't, degrading performance to O(N*M).",
    ],
  },
  {
    slug: "jwt-anatomy",
    title: "JWT Anatomy",
    category: "Security",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Stateless auth and tampered tokens.",
    caption:
      "Deconstruct a JSON Web Token. Edit the payload and watch the signature turn red. Learn why JWTs are 'signed, not encrypted' and how to safely store user claims without a database round-trip.",
    component: JWTAnatomy,
    skillTags: ["Security", "Auth", "Backend"],
    concept:
      "A JSON Web Token (JWT) is a compact, URL-safe way to represent claims between two parties. It consists of three parts separated by dots: **Header**, **Payload**, and **Signature**.\n\n- **Header**: Contains the algorithm (e.g., HS256) and token type.\n- **Payload**: Contains the actual data (claims) like user ID or expiration time.\n- **Signature**: Used to verify that the sender is who they say they are and that the message wasn't tampered with.\n\nJWTs are usually signed with a secret (HMAC) or a public/private key pair (RSA/ECDSA). Crucially, the payload is only Base64-encoded, NOT encrypted — anyone with the token can read the data, but only those with the key can modify it without breaking the signature.",
    realWorld: [
      "Microservices: passing user identity between services without hitting a central session DB.",
      "Single Sign-On (SSO): OIDC uses JWTs as ID Tokens.",
      "Stateless Sessions: reducing DB load in high-traffic applications.",
    ],
    pitfalls: [
      "Sensitive Data: NEVER put passwords or credit card numbers in a JWT payload.",
      "The 'alg: none' attack: older libraries allowed tokens with no signature; always validate the algorithm on the server.",
      "Expiration: Stateless tokens can't be easily revoked. Use short-lived JWTs with long-lived Refresh Tokens.",
    ],
  },
  {
    slug: "tls-handshake",
    title: "TLS Handshake",
    category: "Security",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "The foundation of HTTPS.",
    caption:
      "Watch the 5-step dance that secures the internet. Animate the exchange of certificates, the Diffie-Hellman key agreement, and the transition from slow asymmetric encryption to fast, shared symmetric keys.",
    component: TLSHandshake,
    skillTags: ["Security", "Networking", "HTTPS"],
    concept:
      "Transport Layer Security (TLS) is the protocol that provides privacy and data integrity between two communicating applications. It is the 'S' in HTTPS.\n\nThe 'Handshake' is the initial negotiation where the client and server:\n1. Agree on the TLS version and cipher suites.\n2. Authenticate the server via its Certificate (and optionally the client).\n3. Establish a **Shared Session Key** using asymmetric encryption (RSA or Diffie-Hellman).\n\nOnce the handshake is complete, all further communication is encrypted using fast **Symmetric Encryption** (like AES) with the shared key established during the handshake.",
    realWorld: [
      "Every HTTPS website you visit.",
      "Secure Email (IMAPS, SMTPS).",
      "VPNs (OpenVPN, WireGuard).",
      "Database connections (SQL over TLS).",
    ],
    pitfalls: [
      "Certificate Pinning: can be brittle and break if certificates are rotated unexpectedly.",
      "Downgrade Attacks: attackers might try to force the connection to an older, insecure version like TLS 1.0 or SSL 3.0.",
    ],
    references: [
      {
        label: "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
        href: "https://datatracker.ietf.org/doc/html/rfc8446",
      },
    ],
  },
  {
    slug: "cors-lab",
    title: "CORS",
    category: "Security",
    difficulty: "Beginner",
    readingTimeMin: 4,
    blurb: "Origins and Preflights.",
    caption:
      "Demystify the most common web error. Simulate requests between different domains, watch the browser trigger 'Preflight' OPTIONS requests, and learn how to configure your headers to safely share resources.",
    component: CORSLab,
    skillTags: ["Security", "Web Development", "Backend"],
    concept:
      "Cross-Origin Resource Sharing (CORS) is a browser security mechanism that allows or restricts a web page from making requests to a domain different from the one that served it.\n\nBy default, browsers follow the **Same-Origin Policy**. If `app.com` tries to fetch from `api.com`, the browser blocks it unless `api.com` explicitly sends an `Access-Control-Allow-Origin` header.\n\nFor 'non-simple' requests (like those with JSON bodies or custom headers), the browser first sends a **Preflight** request (OPTIONS method) to ask the server for permission before sending the actual data.",
    realWorld: [
      "Frontend apps talking to a separate API server.",
      "Loading fonts or scripts from a CDN.",
      "Embedding third-party widgets or maps.",
    ],
    pitfalls: [
      "Access-Control-Allow-Origin: *: While easy, this allows ANY site to read your API data. Never use this for authenticated endpoints.",
      "Misconfigured Credential Support: If you allow credentials (cookies), you cannot use the wildcard `*`.",
      "Opaque Errors: Browsers don't always explain why a CORS request failed for security reasons; check the Network tab carefully.",
    ],
  },
  {
    slug: "webauthn",
    title: "WebAuthn / Passkeys",
    category: "Security",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "The end of the password.",
    caption:
      "Step into the future of authentication. Simulate a hardware-backed registration and login flow. See how public-key cryptography and biometrics replace vulnerable passwords with unphishable Passkeys.",
    component: WebAuthnLab,
    skillTags: ["Security", "Auth", "Passkeys"],
    concept:
      "WebAuthn (Web Authentication) is a web standard that allows users to log in to websites using secure, hardware-backed credentials like biometrics (TouchID/FaceID) or USB security keys (YubiKeys).\n\nUnlike passwords, which are sent to a server and can be stolen, WebAuthn uses **Public Key Cryptography**:\n1. The user's device creates a unique key pair for the site.\n2. The device sends the **Public Key** to the server.\n3. To log in, the server sends a 'challenge'. The device signs it with the **Private Key** (after biometric verification) and sends it back.\n\nThis is 'unphishable' because the device only signs challenges for the specific domain it was registered with.",
    realWorld: [
      "Google Passkeys: the default login method for Google Accounts.",
      "Apple iCloud Keychain: syncing passkeys across devices.",
      "GitHub: supports WebAuthn for 2FA and passwordless login.",
    ],
    pitfalls: [
      "Recovery: If a user loses their only hardware key, they are locked out. Always encourage multiple keys or secondary recovery methods.",
      "Browser Support: While broad, some older browsers or enterprise environments still lack full WebAuthn support.",
    ],
    references: [
      { label: "W3C Web Authentication Working Group", href: "https://www.w3.org/TR/webauthn-2/" },
      { label: "FIDO Alliance — How it works", href: "https://fidoalliance.org/how-fido-works/" },
    ],
  },
  {
    slug: "load-balancer",
    title: "Load Balancing",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    readingTimeMin: 5,
    blurb: "Route requests with round-robin, least-connections, and weighted strategies.",
    caption:
      "Send requests into three backend nodes and compare routing policies. Complete active requests to see why least-connections reacts better to slow servers than simple round-robin.",
    component: LoadBalancerLab,
    skillTags: ["Distributed Systems", "System Design", "Backend"],
    concept:
      "A load balancer spreads traffic across healthy backend instances so one machine does not become the bottleneck. The policy matters: round-robin is simple but ignores current load, least-connections tracks in-flight work, weighted routing sends more traffic to larger instances, and hash-based routing keeps related requests stable.\n\nReal production balancers also perform health checks, connection draining, TLS termination, sticky sessions, retries, outlier detection, and circuit breaking. The goal is not only even traffic; it is predictable latency during failure, deploys, and uneven workloads.",
    complexity: [
      { operation: "Round-robin route", time: "O(1)", space: "O(1)" },
      { operation: "Least-connections route", time: "O(n servers)", space: "O(n)" },
      { operation: "Weighted route", time: "O(1) to O(log n)", space: "O(n)" },
    ],
    realWorld: [
      "Nginx, HAProxy, Envoy, AWS ALB/NLB, and Cloudflare Load Balancing.",
      "Service meshes use local load balancing plus retries and outlier detection.",
    ],
    pitfalls: [
      "Retries can amplify overload if every client retries at once.",
      "Sticky sessions simplify state but reduce balancing quality.",
      "Health checks must detect partial failure, not just process liveness.",
    ],
  },
  {
    slug: "circuit-breaker",
    title: "Circuit Breaker",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Fail fast when a dependency is unhealthy instead of piling on retries.",
    caption:
      "Increase downstream failure rate and call the service. After repeated failures, the breaker opens, blocks requests, and probes with half-open recovery.",
    component: CircuitBreakerLab,
    skillTags: ["Distributed Systems", "Resilience", "Backend"],
    concept:
      "A circuit breaker protects callers from repeatedly waiting on a failing dependency. In the closed state, requests pass through. After enough failures, the breaker opens and fails fast. After a cooldown, it enters half-open and allows a small number of probe requests. A successful probe closes the circuit; another failure opens it again.\n\nThis pattern turns slow cascading failure into bounded degradation. It is usually paired with timeouts, bulkheads, fallback responses, retry budgets, and observability.",
    complexity: [
      { operation: "Record result", time: "O(1)", space: "O(1) or rolling window" },
      { operation: "Allow/deny call", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "Hystrix popularized the pattern; Resilience4j, Envoy, Linkerd, and Istio implement variants.",
      "Payment, search, recommendation, and email services often use fallbacks behind breakers.",
    ],
    pitfalls: [
      "A breaker without timeouts still lets calls hang.",
      "Aggressive retry plus open breakers can produce traffic bursts during recovery.",
      "Fallbacks must be intentionally degraded, not silently wrong.",
    ],
  },
  {
    slug: "crdt-counter",
    title: "CRDT G-Counter",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 5,
    blurb: "Conflict-free replicated data that converges without coordination.",
    caption:
      "Increment two replicas independently, then merge. The counter converges by taking the max value seen for each replica slot.",
    component: CRDTLab,
    skillTags: ["Distributed Systems", "Databases"],
    concept:
      "A CRDT is a data type designed so replicas can update independently and later merge into the same value. The G-Counter is the simplest example: each replica owns one slot in a vector and only increments its own slot. Merge takes the element-wise maximum. The visible count is the sum of the vector.\n\nBecause merge is associative, commutative, and idempotent, replicas converge even if messages arrive out of order, duplicate, or after partitions. More advanced CRDTs model sets, maps, registers, text editing, and presence.",
    complexity: [
      { operation: "Increment", time: "O(1)", space: "O(replicas)" },
      { operation: "Merge", time: "O(replicas)", space: "O(replicas)" },
      { operation: "Read", time: "O(replicas)", space: "O(1)" },
    ],
    realWorld: [
      "Riak, Redis Enterprise active-active, collaborative editors, counters, likes, reactions, and offline-first apps.",
    ],
    pitfalls: [
      "Metadata grows with replica count unless compacted.",
      "Not every invariant can be preserved without coordination.",
      "Deletes require more complex CRDTs such as OR-Sets or tombstones.",
    ],
  },
  {
    slug: "sharding-replication",
    title: "Sharding & Replication",
    category: "Distributed Systems",
    difficulty: "Advanced",
    readingTimeMin: 6,
    blurb: "Route keys to shards and compare quorum vs asynchronous replication.",
    caption:
      "Type a key to route it to a shard. Switch between quorum and async replication to see the consistency/latency tradeoff on writes.",
    component: ShardingReplicationLab,
    skillTags: ["Distributed Systems", "Databases", "System Design"],
    concept:
      "Sharding partitions data across machines, usually by hashing or ranges, so storage and write load scale horizontally. Replication copies each shard to multiple nodes for availability and read scale. Together, they form the backbone of large databases and search systems.\n\nWrites can wait for a quorum of replicas, which improves consistency but adds latency, or acknowledge on the primary and replicate asynchronously, which is faster but may lose recent writes during failover. Rebalancing, hot keys, secondary indexes, and cross-shard transactions are the hard parts.",
    complexity: [
      { operation: "Hash route key", time: "O(1)", space: "O(shards)" },
      { operation: "Quorum write", time: "O(replica RTT)", space: "O(replicas)" },
      { operation: "Scatter-gather query", time: "O(shards)", space: "O(shards)" },
    ],
    realWorld: [
      "DynamoDB partitions, Cassandra token ranges, MongoDB sharding, Elasticsearch shards, and Vitess keyspaces.",
    ],
    pitfalls: [
      "Hot keys overload one shard even if average load is low.",
      "Cross-shard joins and transactions are expensive.",
      "Resharding needs careful dual-write, backfill, and cutover plans.",
    ],
  },
  {
    slug: "backpressure",
    title: "Backpressure",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Keep producers from overwhelming consumers with buffers, drops, or throttling.",
    caption:
      "Adjust producer and consumer rates, then compare buffering, dropping, and throttling policies. Watch queue growth expose overload.",
    component: BackpressureLab,
    skillTags: ["Distributed Systems", "Streaming", "Backend"],
    concept:
      "Backpressure is the signal that a downstream component cannot keep up. Without it, queues grow until latency explodes or memory is exhausted. Systems respond by buffering, dropping low-value work, slowing producers, applying rate limits, or splitting load across more consumers.\n\nGood backpressure is explicit and measurable: queue depth, lag, max in-flight requests, bounded buffers, deadlines, and rejection rates. It changes overload from hidden collapse into a controlled product decision.",
    complexity: [
      { operation: "Enqueue/dequeue", time: "O(1)", space: "O(buffer)" },
      { operation: "Throttle decision", time: "O(1)", space: "O(1)" },
    ],
    realWorld: [
      "Kafka consumer lag, Node streams, TCP flow control, Reactive Streams, async worker queues, and API rate limits.",
    ],
    pitfalls: [
      "Unbounded queues trade visible errors for invisible latency.",
      "Dropping must be safe for the workload.",
      "Autoscaling from queue depth needs cooldowns to avoid oscillation.",
    ],
  },
  {
    slug: "topological-sort",
    title: "Topological Sort",
    category: "Algorithms",
    difficulty: "Intermediate",
    readingTimeMin: 4,
    blurb: "Order dependent work in a DAG with Kahn's algorithm.",
    caption:
      "Run tasks only when dependencies are complete. The ready queue reveals how topological ordering powers builds, migrations, and schedulers.",
    component: TopologicalSortLab,
    skillTags: ["DSA", "Algorithms"],
    concept:
      "Topological sort orders nodes in a directed acyclic graph so every dependency appears before the work that depends on it. Kahn's algorithm tracks each node's in-degree, pushes zero-dependency nodes into a queue, removes them one by one, and decreases the in-degree of their outgoing neighbors.\n\nIf nodes remain but the ready queue is empty, the graph contains a cycle. That makes topological sort useful both for scheduling valid work and detecting invalid dependency graphs.",
    complexity: [
      { operation: "Topological sort", time: "O(V + E)", space: "O(V + E)" },
      { operation: "Cycle detection", time: "O(V + E)", space: "O(V)" },
    ],
    realWorld: [
      "Build systems, package managers, database migrations, workflow engines, compiler passes, and spreadsheet recalculation.",
    ],
    pitfalls: [
      "Only works on DAGs; cycles must be reported clearly.",
      "Multiple valid orders can exist.",
      "Dynamic dependency graphs need incremental recomputation or invalidation.",
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
