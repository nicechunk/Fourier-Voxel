import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const requiredFiles = [
  "fourier-pickaxe/README.md",
  "docs/fourier-pickaxe-showcase.md",
  "fourier-pickaxe/index.html",
  "fourier-pickaxe/main.js",
  "fourier-pickaxe/styles.css",
  "src/vox/ncm.js",
  "src/i18n.js",
];

const requiredPhrases = {
  "fourier-pickaxe/README.md": [
    "GPU-oriented",
    "local `.vox` file parsing",
    "G0 global palette",
    "Apache-2.0",
  ],
  "docs/fourier-pickaxe-showcase.md": [
    "Documentation-First Review Path",
    "Function Payload",
    "GPU Runtime Expectations",
    "Security Boundary",
    "Known Limits",
  ],
  "fourier-pickaxe/index.html": [
    "sourceScene",
    "functionScene",
    "powScene",
    "voxFile",
  ],
  "fourier-pickaxe/main.js": [
    "parseVox",
    "createFunctionPayload",
    "mergeSameColorVoxels",
    "createPowCandidate",
  ],
};

const findings = [];

for (const file of requiredFiles) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) {
    findings.push(`${file}: missing`);
    continue;
  }
  const content = fs.readFileSync(abs, "utf8");
  for (const phrase of requiredPhrases[file] ?? []) {
    if (!content.includes(phrase)) findings.push(`${file}: missing phrase "${phrase}"`);
  }
}

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  surface: "fourier-pickaxe",
  checkedFiles: requiredFiles,
  findings,
  ok: findings.length === 0,
};

console.log(JSON.stringify(report, null, 2));

if (!report.ok) {
  console.error("Fourier Pickaxe documentation audit failed.");
  process.exit(1);
}
