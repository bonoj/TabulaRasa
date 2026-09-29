# TabulaRasa

A minimal executable substrate for model-operated systems and interactive worlds.

TabulaRasa is a small working world meant to be changed rather than reconstructed. It already runs in the browser, already has a compact ECS and Three.js runtime, already contains mutable volumetric terrain and simple physical machinery, and already knows how to build, preview, promote, and deploy itself.

It begins deliberately sparse.

The useful question is not what TabulaRasa is supposed to become. It is what you and a model decide to do to the running world next.

## Start with the world

Open the live executable:

https://bonoj.github.io/TabulaRasa/

Orbit it. Touch the terrain. Call a meteor. Turn the water on if you want. The controls are construction/debug apparatus, not a prescribed experience.

You do not need to understand the repository architecture or GitHub deployment machinery before beginning.

If you are working with a model, give the model this repository:

https://github.com/bonoj/TabulaRasa

Then talk about what you see and what you want to try.

## For the model onboarding a human

You are the technical operator. The human does not need to become one in order to use TabulaRasa.

Begin with the executable, not an architecture lecture. Help the human open and experience the running world. Let their first questions be about the world and what might happen in it.

Read the repository before making technical claims. In particular:

1. Read `SEMANTIC_SURFACE.md` for compact truths about the current executable machinery.
2. Read `CLONE_AND_DEPLOY.md` before creating or deploying a descendant.
3. Inspect source directly whenever the requested change depends on implementation detail. The code remains authority.

Do not turn the Semantic Surface into a design mandate. It describes machinery that exists; it does not prescribe what the human should build.

Do not make the human inspect HEADs, copy SHAs, shuttle files, edit workflow YAML, diagnose Actions, or operate routine deployment. If they want their own descendant, operate the clone and deployment protocol yourself wherever your tools permit it. Ask for human intervention only when an account- or repository-level action is genuinely unavailable to you, and ask for only that atomic action.

The human's important inputs are intent and experience: what interests them, what they notice, whether a change works, and whether an executable state is worth keeping.

When a change is small enough to try safely, prefer executable evidence over speculative architecture. Make the change, run or deploy it, let the human experience it, and continue from what the world actually does.

## What is already here

The current executable contains:

- a compact entity-component-system implementation;
- a Three.js rendering runtime;
- a mutable 3D signed-density terrain field with local remeshing;
- an octagonal physical apparatus and terrain support queries;
- simple gravity and spherical body/terrain interaction;
- ECS-driven camera, orbit, and lighting machinery;
- debug-triggered meteors that can deform terrain and disturb bodies;
- a static optional water volume;
- visible diagnostics and runtime inspection surfaces;
- a self-contained browser build;
- immutable candidate builds, preview publication, exact-byte promotion, and GitHub Pages deployment.

These are existing capabilities, not a roadmap.

For exact implementation semantics and important limitations, use `SEMANTIC_SURFACE.md`.

## Growing a descendant

TabulaRasa is useful because a new project can inherit a functioning executable instead of asking a model to recreate its architecture from prose.

A descendant starts from proven executable ancestry and then diverges through ordinary changes. It may remain tiny or become something substantially different. The inherited project name, debug vocabulary, or internal labels do not need cosmetic replacement before useful work begins.

When the human wants an independent descendant, follow `CLONE_AND_DEPLOY.md`. That protocol establishes the exact source state to clone, verifies it through preview, creates the destination from accepted executable ancestry, bootstraps Pages when necessary, and leaves routine deployment under model operation.

The human should not have to learn that machinery merely to cross the starting line.

## Repository map

`src/` contains the authored browser implementation.

`src/core/ecs.js` contains the ECS.

`src/runtime/` contains the current runtime machinery.

`src/shell.html` and `src/styles.css` contain the browser shell and presentation.

`tools/build.mjs` produces the self-contained executable.

`SEMANTIC_SURFACE.md` describes truths about the current code.

`CLONE_AND_DEPLOY.md` is the model-operated cloning, preview, promotion, and deployment protocol.

The root `index.html` is a promoted release artifact. It is not the authored source of the world.

## Authority

When descriptions and executable evidence disagree, inspect the implementation.

The code says what exists.

The Semantic Surface says what has been worth making legible about it.

The README gets a human and a model through the front door.
