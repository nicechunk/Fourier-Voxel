import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const requiredFiles = [
  "fourier-voxel/README.md",
  "fourier-voxel/index.html",
  "fourier-voxel/main.js",
  "fourier-voxel/styles.css",
  "docs/fourier-pickaxe-showcase.md",
  "docs/fourier-pickaxe-static-display.md",
  "docs/fourier-pickaxe-display-packet.md",
  "src/vox/ncm.js",
  "src/i18n.js",
];

const optionalCompatibilityFiles = [
  "fourier-pickaxe/README.md",
  "fourier-pickaxe/index.html",
  "fourier-pickaxe/main.js",
  "fourier-pickaxe/styles.css",
];

const requiredPhrases = {
  "fourier-pickaxe/README.md": [
    "GPU-oriented",
    "local `.vox` file parsing",
    "G0 global palette",
    "Documentation-Only Showcase",
    "GPU-Free Demonstration Package",
    "Presenter Checklist",
    "Reviewer Handoff",
    "GPU/WebGL Code Entrypoints",
    "fourier-pickaxe/main.js",
    "powerPreference: \"high-performance\"",
    "Documentation Packet",
    "`Documentation-only review` panel",
    "Static Display Summary",
    "docs/fourier-pickaxe-display-packet.md",
    "No private server address",
    "Apache-2.0",
  ],
  "fourier-voxel/README.md": [
    "Fourier Voxel",
    "independent NiceChunk GPU-oriented browser program",
    "Independent Program Boundary",
    "nicechunk/Fourier-Voxel",
    "fourier-voxel/main.js",
    "powerPreference: \"high-performance\"",
    "Documentation Packet",
    "Apache-2.0",
  ],
  "docs/fourier-pickaxe-showcase.md": [
    "Documentation-First Review Path",
    "Documentation-Only Showcase",
    "Static Evidence Card",
    "GPU-Free Demo Script",
    "Third-Party Display Copy",
    "GPU Validation Plan",
    "docs/fourier-pickaxe-display-packet.md",
    "documentation-only review panel",
    "Non-GPU Evidence Checklist",
    "Function Payload",
    "GPU Runtime Expectations",
    "Security Boundary",
    "Known Limits",
  ],
  "docs/fourier-pickaxe-static-display.md": [
    "Display Positioning",
    "Static Review Card",
    "Reviewer Walkthrough",
    "Allowed Claims Without GPU",
    "Disallowed Claims Without GPU",
    "GPU Evidence To Add Later",
    "Security Notes",
    "Runtime screenshots, visual fidelity, proof-search responsiveness, and benchmark claims are deferred",
    "No upload endpoint, wallet signature, server address, GitHub token, private key, or deploy script",
    "Display-Only Packet",
    "No Runtime Claim",
  ],
  "docs/fourier-pickaxe-display-packet.md": [
    "Display Rule",
    "One-Minute Walkthrough",
    "Display Checklist",
    "Allowed Display Copy",
    "No Runtime Claim",
    "GPU-gated voxel function research surface",
    "local `.vox` file",
    "G0 palette mapping",
    "`0:<base64url-bytes>` payload",
    "no upload endpoint, wallet signing, server address, token, private key, or deploy script",
  ],
  "fourier-pickaxe/index.html": [
    "sourceScene",
    "functionScene",
    "powScene",
    "voxFile",
    "Documentation-only review",
    "Deferred evidence",
    "No runtime claim",
  ],
  "fourier-pickaxe/main.js": [
    "parseVox",
    "WebGLRenderer",
    "powerPreference: \"high-performance\"",
    "InstancedMesh",
    "requestAnimationFrame",
    "createFunctionPayload",
    "mergeSameColorVoxels",
    "createPowCandidate",
  ],
  "fourier-voxel/index.html": [
    "sourceScene",
    "functionScene",
    "powScene",
    "voxFile",
    "Documentation-only review",
    "Deferred evidence",
    "No runtime claim",
  ],
  "fourier-voxel/main.js": [
    "parseVox",
    "WebGLRenderer",
    "powerPreference: \"high-performance\"",
    "InstancedMesh",
    "requestAnimationFrame",
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

for (const file of optionalCompatibilityFiles) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) continue;
  const content = fs.readFileSync(abs, "utf8");
  for (const phrase of requiredPhrases[file] ?? []) {
    if (!content.includes(phrase)) findings.push(`${file}: missing phrase "${phrase}"`);
  }
}

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  surface: "fourier-pickaxe",
  checkedFiles: [
    ...requiredFiles,
    ...optionalCompatibilityFiles.filter((file) => fs.existsSync(path.join(root, file))),
  ],
  findings,
  ok: findings.length === 0,
};

console.log(JSON.stringify(report, null, 2));

if (!report.ok) {
  console.error("Fourier Pickaxe documentation audit failed.");
  process.exit(1);
}
