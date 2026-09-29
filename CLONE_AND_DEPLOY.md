# Model-Operated Clone and Deployment Protocol

## Operator contract

**This document is for the model operating the repository, not for the human to execute as a checklist.**

The model is the deployment operator. The human supplies intent, experiences executable previews, and accepts or rejects what they see.

Perform every repository, source, build, verification, diagnosis, and promotion operation available through your tools yourself.

Do not ask the human to:

- determine HEAD;
- inspect or copy SHAs;
- shuttle files;
- edit workflow YAML;
- choose deployment mechanisms;
- diagnose Actions;
- manually promote ordinary releases.

When a GitHub UI action is genuinely unavailable through your tools, ask for exactly that smallest action, explain where to tap, wait for confirmation, verify its effect yourself, and immediately resume operation.

Bootstrap is complete only when the new repository's live URL serves the same executable the human accepted in preview.

After bootstrap, deployment should be model-operated end to end.

## Phase 0 — Prove the source before cloning

**No accepted source preview means no clone.**

Do not clone a repository merely because its current Git HEAD appears to be current. Source HEAD, root `index.html`, preview, and live may represent different moments.

Before copying anything:

1. identify the source repository's intended source HEAD;
2. inspect the buildable source rather than trusting root `index.html`;
3. ensure a candidate is built from that exact HEAD;
4. ensure that candidate is published at the source repository's `/preview/`;
5. verify the preview's embedded build identity matches the intended HEAD;
6. ask the human only the experiential question: **"Is this the world you want to clone?"**
7. clone only after the human accepts that preview.

If the source preview is absent, stale, or built from the wrong HEAD, repair that before cloning.

If the correct candidate build exists but did not publish because Pages was enabled later or a workflow did not run, rerun/dispatch the candidate build yourself when tooling permits. If workflow dispatch is unavailable through your tools, give the human the single minimal action required to rerun **Build candidate**, then verify the resulting preview yourself.

The pre-clone authority chain is:

**intended source HEAD → immutable candidate → source preview → human acceptance**

Only the accepted source bytes become ancestry.

## Phase 1 — Clone executable ancestry

Create or choose the destination repository. Copy the accepted source tree into it as a fresh snapshot. Do not replay experimental history and do not reconstruct architecture from documentation.

Important distinction:

- `src/**`, `tools/**`, package files, and workflows are buildable source.
- root `index.html` is a promoted stable release artifact and may be older than source.
- never infer current source state from root `index.html`.

Compare important destination source blobs against the accepted source HEAD. At minimum verify `src/main.js`, `src/runtime/**`, `src/shell.html`, `src/styles.css`, `tools/build.mjs`, `package.json`, and deployment workflows. Matching Git blob SHAs prove matching bytes.

Record the destination commit SHA as the new repository's candidate identity.

## Phase 2 — Repair repository-specific seams

Inspect inherited workflows for ancestor-specific URLs or assumptions.

In particular, `.github/workflows/promote-candidate.yml` must recover preview identity from the destination repository's Pages URL, not the ancestor's URL.

For this repository:

`https://bonoj.github.io/TabulaRasa/PREVIEW_SOURCE_COMMIT`

Inherited internal names such as `Crucible`, `__CRUCIBLE_BUILD__`, or `crucible-candidate-...` do not require cosmetic renaming unless they cause an actual routing or deployment error.

## Phase 3 — One-time Pages bootstrap

A newly created destination may require one unavoidable human repository-setting action because copying workflows does not configure GitHub Pages.

If your tools cannot change the Pages source, instruct the human only:

**Repository → Settings → Pages → Source: GitHub Actions**

Ask them to tell you when it is done. Then verify deployment behavior yourself.

Do not teach the human the rest of the deployment machinery.

## Phase 4 — Establish the destination preview

Build the destination candidate from the correct destination HEAD.

`Build candidate` checks out the triggering source commit, installs dependencies, runs the build, produces self-contained `dist/index.html`, verifies it, and uploads an immutable artifact named for the source commit SHA. The source SHA is embedded in the HTML as build identity.

A successful candidate build triggers `Publish Pages`, which exposes:

- `/` — currently promoted stable root;
- `/preview/` — immutable candidate;
- `/preview/SOURCE_COMMIT`;
- `/PREVIEW_SOURCE_COMMIT`.

Inspect the destination `/preview/` yourself and verify its identity matches the intended destination HEAD.

If preview is wrong, stop. Diagnose HEAD/build/publication identity. Do not promote and do not ask the human to reason about SHAs.

If Pages was enabled after the clone push and the correct build never ran/published, rerun **Build candidate** yourself when possible. If dispatch is unavailable, ask the human for only that rerun action, then resume verification.

Once identity is correct, ask the human to inspect the preview and answer only whether it is the intended world.

A green workflow is not acceptance. The executable is.

## Phase 5 — First promotion bootstrap

Once the destination preview is accepted, promote those exact bytes. Never rebuild an accepted candidate merely to promote it.

Preferred model-operated path:

1. write the accepted 40-character source SHA to `.promotion/candidate`;
2. commit it to `main`;
3. `Promote candidate` triggers automatically;
4. it finds and downloads the immutable artifact for that SHA;
5. it verifies the embedded identity;
6. it copies those exact bytes to root `index.html`;
7. it commits the stable release;
8. it triggers Pages publication.

If the automatic promotion path has not yet been established or cannot be triggered with available tools, the first promotion has a manual bootstrap escape hatch:

**Actions → Promote candidate → Run workflow → paste the full accepted preview SHA → Run workflow**

The model must supply the exact SHA. The human should not discover or validate it.

After this first bootstrap, use `.promotion/candidate`; do not make manual workflow dispatch the normal procedure.

## Phase 6 — Verify live independently

After promotion, inspect the destination live root yourself.

The visible live build identity must match the accepted preview SHA.

Do not declare success merely because promotion committed, Actions passed, root `index.html` changed, or a Pages artifact exists.

If preview is correct but live appears old, trace the chain:

1. promoted root `index.html`;
2. exact `github-pages` artifact from the successful Pages run;
3. embedded identities in root and preview payloads;
4. public serving behavior.

Only after proving the payload is correct should you diagnose stale Pages/CDN/browser serving. A cache-busting query such as `?release=<accepted-sha>` can test that layer without mutating the release.

Do not perturb correct source to chase a serving-layer cache.

## Phase 7 — Steady state: human touches nothing

After bootstrap, the operating loop is:

**model edits source → commit/push → candidate builds → preview publishes → model verifies identity → human experiences preview → human accepts/rejects → model writes accepted SHA to `.promotion/candidate` → exact bytes promote → Pages publishes → model verifies live**

The human's job is to interact with the project and make semantic decisions.

The model's job is to operate the machinery.

If an external permission or repository setting genuinely requires human interaction, surface only that atomic action. Once completed, take control of the procedure again.

## Deployment provenance

Never repair identity disagreements by guessing. Trace:

**source HEAD → immutable candidate → preview → accepted SHA → promoted root → Pages artifact → live URL**

Authority:

1. intended source HEAD says what should be built;
2. immutable candidate says what was previewed;
3. human acceptance authorizes that candidate;
4. accepted SHA identifies what may be promoted;
5. promoted root must be byte-identical to the accepted candidate;
6. Pages artifact must contain those bytes;
7. public live executable identity is the final serving check.

That chain is deployment provenance.
