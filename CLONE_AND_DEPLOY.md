# Clone and Deployment Handoff

This records the proven path for creating a new executable descendant while preserving working ancestry.

The goal is not to reconstruct architecture from prose. Clone a living executable substrate, prove which source commit is authoritative, publish that exact source as an inspectable candidate, promote those exact bytes, then continue through repository writes without requiring the human to operate GitHub.

## 1. Clone executable ancestry, not history

Create or choose the destination repository. Copy the current source tree from the chosen source repository into it as a fresh snapshot. Do not replay experimental history and do not reconstruct the project from documentation.

The destination's first meaningful commit should contain the source tree intended to become its new ancestry.

Important distinction:

- `src/**`, `tools/**`, package files, and workflows are buildable source.
- root `index.html` is the last promoted stable release artifact.
- root `index.html` may therefore be older than source HEAD.
- Never infer current source state from root `index.html`.

After copying, compare important source blobs in the destination against the intended source HEAD. At minimum verify `src/main.js`, `src/runtime/**`, `src/shell.html`, `src/styles.css`, `tools/build.mjs`, `package.json`, and deployment workflows. Matching Git blob SHAs prove matching bytes.

Record the destination commit SHA. This is the candidate identity.

## 2. Fix repository-specific deployment seams

Inspect inherited workflows after cloning for repository-specific URLs or assumptions.

In particular, `.github/workflows/promote-candidate.yml` must recover preview identity from the destination repository's Pages URL, not the ancestor repository.

For this repository:

`https://bonoj.github.io/TabulaRasa/PREVIEW_SOURCE_COMMIT`

Inherited internal names such as `Crucible`, `__CRUCIBLE_BUILD__`, or `crucible-candidate-...` do not require cosmetic renaming. They are harmless ancestry unless they cause a real routing or deployment error.

## 3. One-time Pages bootstrap

A new repository may need one human repository-setting action:

**Settings → Pages → Source: GitHub Actions**

Copying workflow files does not establish this repository setting.

Once Pages uses GitHub Actions, ordinary deployment should not require the human to touch GitHub again.

## 4. Build the candidate from the correct HEAD

`Build candidate` runs automatically when buildable source changes on `main`.

It checks out the triggering source commit, installs dependencies, runs the build, produces self-contained `dist/index.html`, verifies it, and uploads it as an immutable artifact named for the source commit SHA.

The source SHA is embedded in the HTML as its build identity.

Do not substitute root `index.html`. Candidate construction must come from source.

## 5. Preview before promotion

A successful candidate build triggers `Publish Pages`.

Pages contains:

- `/` — currently promoted stable root `index.html`
- `/preview/` — newly built immutable candidate
- `/preview/SOURCE_COMMIT`
- `/PREVIEW_SOURCE_COMMIT`

Inspect:

`https://bonoj.github.io/TabulaRasa/preview/`

The visible build identity must match the intended source commit SHA.

Do not treat a green Actions run as proof that the correct world is in preview. Inspect the executable and its identity.

Root and preview are intentionally allowed to differ here. Preview is the candidate; root is the last accepted stable release.

## 6. Promote exact accepted bytes

Once preview is accepted, promote the candidate artifact itself. Do not rebuild it and do not copy source into root by hand.

Normal model-operated path:

1. write the accepted 40-character source SHA to `.promotion/candidate`;
2. commit that file to `main`;
3. `Promote candidate` triggers automatically;
4. it finds the immutable artifact for that SHA;
5. it downloads that exact artifact;
6. it verifies the SHA is embedded in the HTML;
7. it copies those exact bytes to root `index.html`;
8. it commits the stable release;
9. it triggers `Publish Pages` for the accepted candidate.

This means promotion does not require the human to press **Run workflow**.

Manual `workflow_dispatch` is a bootstrap/debug fallback, not the steady-state procedure.

## 7. Verify live independently

After promotion completes, inspect:

`https://bonoj.github.io/TabulaRasa/`

The live build identity must match the accepted candidate SHA. Also verify that `/preview/` identifies the intended candidate.

Do not conclude live is correct merely because promotion committed, Actions passed, root `index.html` changed, or a Pages artifact exists. The public executable identity is the final check.

If preview is correct but live appears old:

1. inspect root `index.html` at the promoted commit;
2. download/inspect the exact `github-pages` artifact from the successful Pages run;
3. verify root and preview files and embedded SHAs;
4. only then distinguish workflow/payload failure from stale Pages/CDN/browser serving.

A cache-busting query can test serving without mutating the release:

`https://bonoj.github.io/TabulaRasa/?release=<accepted-sha>`

Do not perturb correct source or rebuild a correct candidate merely to chase serving-layer cache.

## 8. Steady state: human touches nothing

After one-time repository/Pages bootstrap, the intended loop is:

**model edits source → commit/push → candidate builds automatically → preview publishes automatically → executable is inspected → accepted SHA is written to `.promotion/candidate` → promotion runs automatically → exact candidate bytes become stable → Pages publishes automatically → model verifies live identity**

The human's role is experiential and semantic: use the world, react to it, accept/reject it, change direction.

The human should not need to shuttle files, build locally, edit workflow YAML, copy HTML, press Actions buttons, type candidate SHAs into forms, or manually promote releases.

The model should operate the machinery through repository writes and workflow inspection.

If a repository-level permission or setting cannot be changed through the available GitHub connection, surface that single unavoidable human action explicitly. Do not turn ordinary deployment into a human procedure.

## 9. Deployment provenance

Trace identities rather than guessing:

**source commit → immutable candidate artifact → preview → accepted SHA → promoted root → Pages artifact → live URL**

Authority at each layer:

1. intended source HEAD says what should be built;
2. immutable candidate says what was previewed;
3. accepted SHA says what may be promoted;
4. promoted root must be byte-identical to that candidate;
5. Pages artifact must contain those promoted bytes;
6. public live executable identity is the final serving check.

That chain is the deployment provenance.
