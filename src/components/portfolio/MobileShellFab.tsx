import { TerminalSquare } from "lucide-react";

/**
 * Mobile-only FAB that opens the TerminalShell. Desktop visitors have ⌘J,
 * the nav `shell` button, and the HUD dock — phones need a tap target.
 *
 * Dispatches the same global ⌘J keydown event TerminalShell already listens
 * for, so we don't introduce a parallel state channel.
 */
export function MobileShellFab() {
  function open() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "j", metaKey: true }),
    );
  }
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open shell"
      className="fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-terminal/40 bg-card/90 text-terminal shadow-lg backdrop-blur-md transition-colors hover:bg-terminal/15 md:hidden"
    >
      <TerminalSquare className="size-5" />
    </button>
  );
}