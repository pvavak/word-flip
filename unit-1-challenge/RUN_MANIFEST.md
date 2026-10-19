# RUN MANIFEST

- PRODUCT_ID: ENGLISH-U1-CHALLENGE-20
- VERSION: 1.0.0
- RISK_TIER: STANDARD
- RUN_STATUS: IN_PROGRESS
- CANONICAL_SOURCE: pvavak/word-flip/unit-1-challenge
- CURRENT_STAGE: CONTENT_QA_PASS
- QC_STATUS: Content and scoring PASS; browser/mobile QA PENDING
- LAST_CONFIRMED_DONE: 20 grammar items and scoring tests
- RESUME_POINT: GitHub Pages publication and live UI test
- RETRY_COUNT: 0
- PERSISTENCE_MODE: ATTENDED_ONLY until committed
- DESIGN_SYSTEM: provisional, green/ivory, system fonts, responsive

## Units

| Unit | Status | QA |
|---|---|---|
| 20 grammar tasks | DONE | PASS |
| Scoring and privacy | DONE | PASS |
| Desktop/mobile UI | PENDING | Local preview blocked by host proc mount |
| GitHub Pages | PENDING | Existing Pages deployment verified in repository history |

## Freeze map

- FREEZE: All pre-existing repository files, including past-simple and root index.html.
- PATCH_TARGET: Only unit-1-challenge/.
- DEPENDENCIES: None; no external scripts, fonts, images or APIs.

## Artifact identity

- index.html: 5c2e483641bf24b6c33962c6b47e5f5fa5cd3f210b59e8a9c23a1494779f762c
- style.css: d0792f3e3f92deaf54ee069352fbffb78a5c049e1f56a1d9faa498928f702b97
- questions.js: 8c0a9ad8f5b93222cff277f52db15995cad7e9c92d0d841ec333298568fc1b99
- app.js: d66e7c35a50a8533ed47685943aeb2913856c6e3541139286b5be3969c919c3d

## Scope and QA

- All 20 questions target present simple/present continuous per latest user instruction.
- Food vocabulary only as context. Illustrations omitted because text form and word order are the assessed skills and pictures would add answer cues.
- Independently reviewed answer key in test.cjs; all tests PASS.
- Independent agent QC not required by project; no delegation used.
- No personal data imported; no client storage or network calls in app.
- Source baseline: 9705e9fb0a3d6c3d1a81d5f9c1db5335f1b12a15.

## Blockers

- Local managed preview cannot start: host does not permit proc mount. Continue UI verification on GitHub Pages.

## Lessons / regression

- SOURCE_REQUIREMENT: 19 October clarification narrows all 20 items to the two present tenses; non-grammar tasks replaced before publication.
- Regression gate: preserve old file hashes; reject duplicate scoring; accept contractions; reject missing auxiliary/-s; confirm 320px overflow and tap targets.
