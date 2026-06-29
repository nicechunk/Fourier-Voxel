# NiceChunk Fourier Voxel

Independent GPU-oriented voxel function program and documentation-first showcase.

## Official Links

GitHub: [https://github.com/nicechunk/Fourier-Voxel](https://github.com/nicechunk/Fourier-Voxel)

Website: [https://nicechunk.com/fourier-voxel/](https://nicechunk.com/fourier-voxel/)

## Project Overview

This repository contains Fourier Voxel, the independent NiceChunk GPU-oriented browser program for compact voxel asset functions. It loads local MagicaVoxel files, maps colors into the shared G0 palette, merges voxels into deterministic basis functions, and redraws the model from compact function bytes.

The project is intentionally scoped as a standalone GPU browser lab. It is useful for reviewing the asset-function idea, but CPU-only or headless environments should treat it as a documentation-only showcase rather than a runtime proof.

The repository is split from the main web client because voxel function research deserves a narrow review boundary. Reviewers can inspect the independent `fourier-voxel/` program, payload codec, proof-search preview, and documentation without scanning the full game client.

## System Principles

- Local input boundary: VOX files are selected in the browser and are not uploaded to a server.
- Evidence over claims: documentation states what can be reviewed statically and what requires GPU hardware.
- Compact deterministic payloads: the current codec records G0 palette indexes and box-basis bytes for redraw experiments.
- Research honesty: the surface does not claim to be a production miner, final chain codec, or complete benchmark suite.

## How It Works

- In CPU-only review environments, run the documentation audit and read the showcase document instead of claiming runtime validation.
- Inspect the page structure, local .vox input boundary, WebGL viewer setup, codec path, and proof-search preview source from the documented files.
- Use the display packet as the public demonstration material until GPU hardware is available.
- On a GPU workstation later, load a local .vox file, compute the function payload, and compare the source model against the function redraw.

## Why This Project Matters

NiceChunk needs a credible path from voxel assets to compact, inspectable payloads. Fourier Voxel makes that question visible as a concrete tool instead of a vague protocol idea.

A focused repository keeps this research auditable. External reviewers can verify the security boundary, GPU limitation, payload shape, and future work without depending on private assets or deployment infrastructure.

## Repository Layout

- `fourier-voxel/index.html`
- `fourier-voxel/main.js`
- `fourier-voxel/styles.css`
- `src/vox/ncm.js`
- `src/i18n.js`
- `docs/fourier-pickaxe-showcase.md`
- `docs/fourier-pickaxe-static-display.md`
- `docs/fourier-pickaxe-display-packet.md`
- `scripts/audit-fourier-pickaxe-docs.mjs`

## GPU/WebGL Code Entrypoints

- `fourier-voxel/main.js` is the primary GPU-facing source file. It creates three Three.js WebGL renderers with `powerPreference: "high-performance"`, builds instanced voxel meshes, runs the animation loop, and updates the source, function redraw, and proof candidate scenes.
- `fourier-voxel/index.html` defines the local `.vox` input, compute controls, proof-search controls, metrics, and the three canvas panes used by the GPU/WebGL review path.
- `fourier-voxel/styles.css` keeps the lab layout usable for side-by-side model inspection and documentation-only review.
- `src/vox/ncm.js` is the shared parser boundary for MagicaVoxel/NCM data. The browser page imports it directly instead of hiding voxel parsing in generated artifacts.
- `fourier-pickaxe/` remains only as a compatibility route in the main working tree and is intentionally not part of this focused Fourier Voxel split.

## Documentation Packet

- `fourier-voxel/README.md` documents the source-level workflow, GPU requirement, local-only file boundary, payload data flow, and security notes.
- `docs/fourier-pickaxe-showcase.md` is the full external-review narrative, including the GPU validation plan and non-GPU evidence checklist.
- `docs/fourier-pickaxe-static-display.md` is the approved CPU-only presentation packet for environments that cannot run WebGL meaningfully.
- `docs/fourier-pickaxe-display-packet.md` is the short display-ready handoff for agents, reviewers, or public repository summaries.

## Development Workflow

1. Clone the repository and inspect the focused source tree before changing shared contracts or generated artifacts.
2. Keep changes scoped to the domain of this repository. Cross-domain changes should be coordinated through the matching split repositories.
3. Run the smallest meaningful validation for the touched surface: build checks for programs, browser checks for pages, or fixture checks for deterministic libraries.
4. Update documentation and evidence when behavior, visible UI, public constants, or developer-facing workflows change. Only add screenshots when they were produced from the required runtime environment.

## Future Development Direction

- Add reviewer-supplied VOX fixtures and GPU-produced screenshots once target hardware is available.
- Benchmark proof-search responsiveness across representative models and browser/GPU combinations.
- Document codec compatibility rules before any on-chain storage commitment.
- Extract stable payload helpers into a reusable package if the research format matures.

## Maintenance Notes

This repository is a focused split from the main NiceChunk working tree. Keep the public surface explicit: avoid committing private keys, wallet files, deployment-only scripts, machine-specific configuration, or generated build artifacts. Runtime user-facing copy should stay behind the i18n layer where the project has an i18n surface.
