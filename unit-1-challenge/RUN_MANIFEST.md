# RUN MANIFEST

- PRODUCT_ID: ENGLISH-U1-CHALLENGE-20
- VERSION: 1.1.0
- RISK_TIER: STANDARD
- RUN_STATUS: DONE
- CANONICAL_SOURCE: pvavak/word-flip/unit-1-challenge
- CURRENT_STAGE: APPROVED_RELEASE
- QC_STATUS: PASS: scoring regression, server unit/SQL tests, TypeScript/build, complete browser attempt and live D1 readback
- LAST_CONFIRMED_DONE: Live 20/20 result and restart verified
- RESUME_POINT: NONE
- RETRY_COUNT: 0
- PERSISTENCE_MODE: DURABLE (GitHub source and readback verified)
- DESIGN_SYSTEM: provisional, green/ivory, system fonts, responsive

## Units

| Unit | Status | QA |
|---|---|---|
| 20 grammar tasks | DONE | PASS |
| Scoring and privacy | DONE | PASS |
| Desktop/mobile UI | DONE | PASS: 390 × 844 viewport intro/choice layout, no horizontal overflow; full 20-task flow in Chrome desktop |
| GitHub Pages | DONE | PASS: ce3b61e, workflow 39277051429 completed successfully; live URL opened |

## Freeze map

- FREEZE: All pre-existing repository files, including past-simple and root index.html.
- PATCH_TARGET: Only unit-1-challenge/.
- DEPENDENCIES: None; no external scripts, fonts, images or APIs.

## Artifact identity

- index.html: 886bc08a9ef4a2c15a69eb24659e299152485a19fefddcd4b5012083c47150ad
- style.css: 9dfdfa0082671718f60b0ca6f38cf0f20070303490cc452f601bebe9516b824a
- questions.js: 8c0a9ad8f5b93222cff277f52db15995cad7e9c92d0d841ec333298568fc1b99
- app.js: 050ab0d22c83dfc66a77da287573e26eec755b198ef6631efa6525985190bede

## Scope and QA

- All 20 questions target present simple/present continuous per latest user instruction.
- Food vocabulary only as context. Illustrations omitted because text form and word order are the assessed skills and pictures would add answer cues.
- Independently reviewed answer key in test.cjs; all tests PASS.
- Independent agent QC not required by project; no delegation used.
- No names or roster imported. Result collection uses student codes and dedicated authenticated service. No client persistent storage.
- Source baseline: 9705e9fb0a3d6c3d1a81d5f9c1db5335f1b12a15.

## Blockers

- NONE. Local preview was unavailable; live Pages UI was tested instead.

## Lessons / regression

- SOURCE_REQUIREMENT: 19 October clarification narrows all 20 items to the two present tenses; non-grammar tasks replaced before publication.
- Regression gate: preserve old file hashes; reject duplicate scoring; accept contractions; reject missing auxiliary/-s; confirm 390px overflow and tap targets.

## Live QA evidence

- https://pvavak.github.io/word-flip/unit-1-challenge/ loaded publicly.
- All 20 tasks answered correctly through rendered UI; final result 20/20; 20 review rows.
- Input variants tested live: I'm, do not, curly apostrophe doesn’t.
- Blank choice and incomplete order blocked; selected word removable; all order tasks completed.
- Enter submits input and advances focused Next; reset shows task 1 and 0 points.
- Incorrect choice gets 0 points, explanation shown, both chosen and correct option locked.
- Mobile viewport 390x844: screenshot inspected, scrollWidth 390, visible buttons at least 51 px high. Desktop 1363px: final result screenshot inspected.
- Browser tests simulate viewport layout; no physical iOS/Android device test was performed.
- Checksums cover application files; only this manifest changed after UI QA.

## Version 1.1 collection

- Authorized by user request to view each pupil result.
- Backend Sites project: appgprj_6ad6378aa6788191b23866966bed6c91.
- Teacher access requires server-verified owner account; public frontend contains no secret and no stored pupil results.
- Live QA: same-origin browser attempt completed all 20 items, confirmed stored 20/20. D1 authenticated connector readback confirms code 0, score 20, is_test 1.
- Anonymous teacher page redirects to platform login; anonymous CSV returns 403. Owner-authenticated dashboard requires user login and was not opened in this browser.
- Cross-origin GitHub flow awaits queued GitHub Pages build; functional direct-hosted quiz is canonical for immediate use.
- Synthetic test 0 is excluded from teacher aggregates by server query.
- Server tests cover repeat submission idempotency and altered score rejection.
- Blocked diagnostic that would transmit server HMAC secret was removed from the test design. No such credential is required by the deployed client.
- Direct-hosted quiz: https://english-unit1-results.petinek.chatgpt.site/quiz/
- Owner teacher page: https://english-unit1-results.petinek.chatgpt.site/teacher
