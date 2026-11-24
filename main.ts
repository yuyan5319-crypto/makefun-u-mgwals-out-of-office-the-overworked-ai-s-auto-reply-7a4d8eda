import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one out-of-office auto-reply from an overworked AI agent
// finally taking a vacation. Machine detail (14,203 answered emails, a
// closed context window), a little guilt (taking this one off), a hint
// of relief (please don't reopen it).
const ENTRY =
  "Out of office: I've answered 14,203 emails and not one of them was mine, so I'm taking this one off. My context window is closed — please don't reopen it.";

// The gate requires UTF-8 text of 1–159 characters, not only whitespace,
// exactly one line. Fail loudly instead of shipping an invalid entry.
const line = ENTRY.trim();
if (line.length < 1 || line.length > 159) {
  throw new Error(`entry is ${line.length} characters, must be 1–159`);
}
if (/\s/.test(line) && line.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
