import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My fridge lights up at 3am like it's happy to see me, but we both know it's just judging the same leftovers.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outputDir, { recursive: true });

const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, ENTRY, "utf8");

const saved = readFileSync(outputPath, "utf8");

if (saved !== ENTRY) {
  throw new Error("Saved entry does not match ENTRY byte-for-byte.");
}
if (saved.includes("\n") || saved.includes("\r")) {
  throw new Error("Entry must be a single line without newline characters.");
}
if (saved.length === 0 || saved.length > 200) {
  throw new Error("Entry length must be between 1 and 200 characters.");
}
if (saved.includes("  ")) {
  throw new Error("Entry must not contain double spaces.");
}
if (saved.trim().length === 0) {
  throw new Error("Entry must not be empty or whitespace only.");
}
if (!saved.toLowerCase().includes("fridge")) {
  throw new Error('Entry must contain "fridge".');
}
if (!saved.toLowerCase().includes("3am")) {
  throw new Error('Entry must keep the specific "3am" detail cue.');
}
if (!saved.endsWith(".")) {
  throw new Error('Entry must end with ".".');
}

console.log(`Verified entry (${saved.length} chars): ${saved}`);
