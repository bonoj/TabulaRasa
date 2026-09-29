# TabulaRasa — Semantic Surface

This surface records truths present in the current executable source.

## ECS

`src/core/ecs.js` implements a small in-memory ECS.

- Entity identity is an incrementing integer. Living entity IDs are held in a `Set`.
- A component is a named `Map` from entity ID to value. Component values have no required class or schema.
- `world.add` requires a living entity and stores the supplied value in the component map.
- `world.remove` removes one component value. `world.destroy` removes the entity from the living set and from every component store.
- `world.query(...components)` returns living entity IDs present in every supplied component map. It iterates the smallest supplied component store first. A query with no components returns all living entities.
- Component stores are created by name at startup in `src/main.js`. The current names are `Transform`, `Body`, `Gravity`, `Support`, `RenderObject`, `Camera`, `CameraTarget`, `Viewport`, `ActiveCamera`, `CameraView`, `OrbitBehavior`, `Light`, `LightView`, `Locus`, `Meteor`, and `MeteorShower`.

There is no scheduler, component schema, inheritance hierarchy, event bus, serialization layer, or entity class in the ECS.

## Frame and systems

The animation frame in `src/main.js` runs, in order:

`physics → meteors.update → orbit.applyAll → lights.syncAll → renderSync → cameras.render`

The runtime systems are ordinary functions/modules called explicitly from that loop. There is no general system registry or scheduler.

The current `physics(dt)` pass queries entities carrying `Transform + Body + Gravity`. It integrates vertical acceleration and velocity. If the same entity also carries `Support`, it applies the terrain/apparatus sphere collision and ground-height settling path.

The current body collision vocabulary is spherical. `Body.radius`, `Body.restitution`, and `Body.drag` are the values consumed by that path. `Support.kind` is currently stored but not interpreted.

## ECS and Three.js

`Transform` is plain component data containing Three.js vectors/eulers in the current executable.

For entities carrying both `Transform` and `RenderObject`, `render-sync.js` copies ECS transform state into the referenced Three.js object each frame.

Not every visible object is represented by an ECS entity. Terrain chunks, the octagonal apparatus, the optional water volume, and meteor trails are managed directly as Three.js scene objects by their owning code. Cameras and lights are ECS entities whose realized Three.js objects are stored in `CameraView` and `LightView`.

## Terrain

`terrain-system.js` owns a dense `60 × 44 × 60` `Float32Array` scalar field spanning a fixed 3D volume.

Positive field values are treated as material and negative values as empty space by the polygonizer. The current seed function is `SURFACE_Y - y`, so the initial terrain is flat even though the stored field and polygonization machinery are volumetric.

The field is polygonized through tetrahedra. Generated surface triangles are clipped to the material octagon. Boundary edges are extended downward to form visible cut walls.

Terrain rendering is divided into x/z chunks. A local `impact` edits field samples in a bounded 3D region, then rebuilds only affected terrain chunks and the corresponding support region. `reset` restores the captured initial field. `randomize` resynthesizes the field with a new seed, but the current flat seed function does not use that seed.

`terrainHeight(x,z)` searches field columns from top downward for the uppermost positive-to-negative crossing. A separate `72 × 72` support grid caches ground heights for ordinary body settling. Within the apparatus footprint, ground support is never below the apparatus top.

The terrain system also owns geometric tests for the material octagon, apparatus footprint, spherical apparatus-wall collision, and segment intersection with the octagonal apparatus.

## Apparatus and scene

The physical presentation is bounded by an octagonal apparatus. Terrain material occupies a slightly smaller octagon, leaving the apparatus edge visible.

The scene currently contains a flat terrain state, the apparatus, one orbiting perspective camera, three lights, fog, an optional static water volume, and debug-triggered meteors. No loose matter is spawned automatically.

The water object is a toggleable transparent octagonal cylinder. It has no simulation behavior.

Meteors are ECS entities while falling. Their trajectories are time-parametric rather than gravity-driven. A terrain impact can edit the density field and impart impulses to ECS bodies with velocity. Meteor showers are timed ECS state that launches individual meteors.

## Camera, light, and rendering machinery

The camera is represented by ECS components. `OrbitBehavior` stores azimuth, polar angle, distance, and limits. Orbit input mutates that component state; the orbit system writes the resulting camera `Transform`.

The camera system realizes perspective or orthographic Three.js cameras from ECS camera data, synchronizes projection and pose, selects an `ActiveCamera`, and renders through it.

The light system realizes hemisphere, ambient, or directional Three.js lights from ECS light data and synchronizes their current values and positions.

The Three.js runtime owns the scene, WebGL renderer, resize observation, tone mapping, shadow configuration, rendering, and WebGL/shader diagnostics.

## Debug and inspection surface

`globalThis.crucible` exposes `spawnMatter`, `meteor`, `groundHeight`, and `inspect`.

`globalThis.crucibleDebug` exposes inspection of ECS entities/components, terrain, renderer state, system objects, selected entity IDs, and the water object.

The visible debug controls expose FPS, embedded build identity, meteor impact magnitude, meteor invocation, water visibility, terrain resynthesis, and refresh.

Runtime errors, unhandled promise rejections, shader errors, WebGL context loss, and a 30-second startup watchdog feed the visible diagnostics surface.

## Build boundary

The authored browser source lives under `src/`. `tools/build.mjs` bundles `src/main.js` with esbuild, inlines the stylesheet and bundled JavaScript into `src/shell.html`, embeds `GITHUB_SHA` as `globalThis.__CRUCIBLE_BUILD__`, and writes the self-contained executable to `dist/index.html`.

The repository-root `index.html` is not authored by that build script. It is the promoted release artifact managed by the deployment workflow described in `CLONE_AND_DEPLOY.md`.
