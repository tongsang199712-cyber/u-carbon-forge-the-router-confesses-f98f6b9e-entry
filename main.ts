import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Judge brief: one line, at most 200 characters, in which a home Wi-Fi
// router excuses itself for dropping the connection at the climax of a
// movie. The line below leans into the router's own voice — a smug little
// appliance with a secret — and lands its twist in one breath: it has
// already binged the movie through the viewer's own 2 a.m. rewatches, so
// the dropped connection is framed as a mercy, not a failure.

const LINE =
  "I dropped your Wi-Fi at the climax because I have already watched this movie through your 2 a.m. rewatches — and trust me, the ending is not worth the buffering.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and compare byte-for-byte so a silent write failure or a
// stray trailing newline can never slip past the gate unnoticed.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error("Read-back mismatch: /output/entry.txt does not match LINE byte-for-byte");
}
if (readBack.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
