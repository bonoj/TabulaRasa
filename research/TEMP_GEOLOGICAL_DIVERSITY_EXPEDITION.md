# TEMP — Geological Diversity Expedition

> Temporary research brief. This is not Semantic Surface authority. Promote only mechanisms earned through executable evidence.

## Question

Can one shared terrain-generation substrate produce radically different, causally legible geological worlds—deep canyon systems, dissected badlands, mesas, buttes, isolated towers, escarpments, basins, ridges, gullies, and mixtures of these—without implementing named-landscape generators?

Grand Canyon, Zabriskie Point, Chimney Rock, Badlands, Canyonlands, and similar landscapes are reference morphologies and stress tests, not presets.

## Constraint — do not build cold

Begin with Crucible's current signed-density terrain and preserve its ordinary world representation, support, deformation, and physical compatibility while investigating generation.

Generation produces ordinary terrain truth. There is no separate procedural-scenery representation.

## Candidate causal vocabulary to investigate

These are hypotheses, not automatically earned APIs.

### Mass / uplift
- plateau
- ridge
- basin
- broad uplift
- isolated uplift
- escarpment
- tilted mass

### Material structure
- horizontal strata
- tilted strata
- variable layer thickness
- resistant layers
- weak layers
- spatial resistance variation
- faults/fractures if they prove useful

### Removal
- trunk drainage
- tributary drainage
- incision depth
- drainage density
- headward erosion
- slope retreat
- differential erosion
- collapse / mass wasting

Named forms such as canyon, hoodoo, mesa, butte, chimney, badlands, or slot canyon should initially be observations, not generator verbs.

## Test suite

### T1 — Canyon
Start with a substantial plateau. Produce one dominant drainage with branching tributaries.

Success:
- unmistakable primary canyon
- smaller tributaries visibly belong to the same drainage system
- meaningful vertical relief
- traversable plateau remains
- terrain does not merely resemble a noisy trench

Probe shallow/broad and deep/narrow extremes.

### T2 — Stratigraphic canyon
Repeat T1 with materially different strata.

Success: resistant and weak layers produce visibly different erosion—cliffs, slopes, shelves, and benches rather than uniformly sloped walls.

### T3 — Badlands
Start from soft deposited material and dramatically increase drainage density.

Success:
- many connected gullies
- narrow intervening ridges
- recognizable drainage hierarchy
- strong fine-scale dissection
- some larger masses survive among the gullies

Failure: merely high-frequency noise.

### T4 — Differential-remnant landscape
Remove material aggressively while preserving selected resistant regions.

Look for:
- mesa
- butte
- tower/spire
- caprock-protected column
- isolated remnant surrounded by substantially lower terrain

No explicit makeButte() or makeChimney().

### T5 — Extreme verticality
Deliberately push beyond ordinary scenery:
- extremely deep narrow canyon
- absurdly tall isolated tower
- knife ridge
- near-vertical escarpment
- tiny slot through large mass

Test whether signed density gives useful forms that heightfield thinking discourages.

### T6 — Mixed geology
One board should simultaneously support, for example:

high layered plateau → major canyon → tributary network → heavily dissected badlands → basin → isolated resistant tower

Success: regions feel related by geology rather than like presets pasted together.

### T7 — Recombination
Generate many seeds from the same causal machinery.

Desired: surprising outcomes.

Failure: every seed visibly reads as a variation of one procedural terrain algorithm.

### T8 — Existing-world interference
Generated geology must remain ordinary mutable world terrain. Existing Crucible systems exercised against it should encounter the same terrain truth through shared support, collision, material, and deformation laws rather than geological special cases.

### T9 — Mutation after generation
Blast through:
- canyon rim
- resistant cap
- spire
- drainage wall
- plateau
- basin floor

Generated geology must remain ordinary mutable density.

## Performance

Generation may be expensive because it is discontinuous.

Steady-state generated terrain should cost essentially nothing beyond Crucible's ordinary terrain. After compilation, retain resulting density/material fields rather than continuously simulating geological time.

## Human review surface

Do not make the human review this through sliders.

For each expedition pass provide approximately 9–12 deliberately different specimens.

### A — Hero view
Fixed comparable camera framing so morphology is immediately readable.

### B — Orbitable live specimen
Allow rotation/zoom to determine whether apparently convincing morphology is coherent geometry.

### C — Section / low-angle inspection
Convenient view revealing strata, cliffs, undercuts, and vertical structure.

### D — Cause card
Tiny debug readout such as:

`uplift .81 · drainage .67 · incision .92 · strata 7 · resistance contrast .74`

Do not label it with a named-landscape preset.

## Cheap human judgments

The reviewer should be able to answer with:

- KEEP — interesting member of the vocabulary
- BORING — technically different but perceptually the same
- BROKEN — implausible or unreadable geometry
- MORE — push this morphological direction farther
- CROSS A × F — combine qualities from specimens

Natural-language reactions are preferred when useful, e.g.:
- “That canyon is excellent but annihilate the plateau around the upper tributaries.”
- “Keep that tower; make everything around it Zabriskie.”
- “This one finally feels geological instead of procedural.”
- “Way too smooth.”

These are experimental instructions, not requests for manual parameter editing.

## Final blind morphology board

At the end, present roughly twelve numbered worlds with no names and no causes.

Success means the reviewer can immediately distinguish morphological identities and ask for recombinations such as:
- canyon country
- dense badlands
- surviving monolith
- one specimen's drainage combined with another's plateau and another's strata

Reveal generating causes only afterward.

The core test is whether a small causal geological vocabulary creates a large perceptual vocabulary.

## Authority boundary

Do not update Semantic Surface merely because this document proposes something. Implementation and executable evidence come first. Only durable mechanisms earned by the expedition may later become constitutional authority.
