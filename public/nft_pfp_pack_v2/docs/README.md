# Neon Arc — Anime PFP Layer Pack (v0.9)

Clean anime-inspired bust PFP assets for a Web3 generative collection.
Every file is **1000×1000 PNG**. Character layers use transparency. Backgrounds are opaque.

## Collection identity
Androgynous-masc anime bust, front-facing, bold line art, flat / cell shading.
One locked head-and-shoulder template so traits stay in the same pose family.

## Folder map
```
BASE_SKIN/            16 files  (4 tones × 4 textures)
HAIR_STYLES/          25 files  (5 styles × 5 colors)
FACIAL_EXPRESSIONS/    9 files  (5 expressions + 5 eye colors; stoic amber shared)
OUTFITS/               5 files
ACCESSORIES/           7 files
BACKGROUNDS/           8 files
PREVIEWS/              composite samples
docs/                  this file + trait table
```

## Trait list

### Base skin — tone
- Pale
- Tan
- Dark Brown
- Warm Olive

### Base skin — texture
- Smooth / Standard
- Cyborg / Metallic seams
- Alien / Neon glow veins
- Reptilian scales

### Hair style
- Spiky Shonen
- Messy Curtain
- Flowing Long
- Bob Cut
- Cyberpunk Undercut

### Hair color
- Obsidian Black
- Electric Blue
- Hot Pink
- Platinum Blonde
- Neon Green

### Expression
- Stoic / Neutral
- Confident Smirk
- Hype / Excited
- Bored / Lazy
- Aggressive / Ready

### Eye color (stoic variants)
- Golden Amber (default)
- Crimson Red
- Emerald Green
- Violet
- Heterochromia (Cyan / Pink)

### Outfit
- Cyberpunk Hoodie
- Techwear Jacket
- Minimalist Tee
- Mecha Suit Collar
- Casual Kimono

### Accessories
- Cyber Visor
- Retro Sunglasses
- Round Glasses
- Neon Halo
- Face Mask
- Cybernetic Horns
- Earrings

### Background
- Neon gradient (magenta → cyan)
- Cyberpunk perspective grid
- Flat cyber grid
- Abstract graffiti wall
- Solids: Obsidian, Hot Pink, Electric Blue, Neon Green, Violet

## How to stack
Recommended painter-order (bottom → top):

1. Background
2. Base skin
3. Outfit
4. Hair  *(these frames already include the face + hair — treat as a full bust replacement, not a hair-only overlay)*
5. Expression / eye-color bust *(same: full face replacement)*
6. Accessories

**Important production note**
These were generated from one locked template, then chroma-keyed to 1000×1000.
They are **pose-consistent**, not pixel-perfect Photoshop layers.

- Hair / expression / outfit / accessory files are **full bust frames**, not isolated strand/glasses-only overlays.
- Use them as **trait images in a generative pipeline** (Hashlips, Bueno, NFT-inator, custom compositor) by swapping the whole bust, or as style-locked references for a human illustrator to rebuild as true isolated layers.
- Green-screen JPEG compression leaves a faint fringe on some edges. For mint-ready art, run a 1px manual cleanup in Photoshop / Photopea, or trace in vector.

True isolated overlays (hair-only, glasses-only on empty canvas) require a hand-drawn master PSD. This pack is the art-direction + trait bible + usable preview compositor set.

## Suggested rarity
| Trait | Common | Uncommon | Rare | Legendary |
|---|---|---|---|---|
| Skin texture | Smooth | Cyborg | Alien | Reptilian |
| Hair | Curtain / Bob | Undercut / Long | Spiky | Neon Green + Spiky |
| Eyes | Amber | Emerald / Violet | Crimson | Heterochromia |
| Outfit | Tee / Kimono | Hoodie | Techwear | Mecha collar |
| Accessory | None / Earrings | Glasses / Halo | Visor / Mask | Horns |

## File naming
`{category}/{trait}_{variant}.png`

## Canvas
- Size: 1000 × 1000 px
- Color: sRGB
- Format: PNG-24 + alpha (backgrounds opaque)

## License for the buyer
You commissioned these assets. Use them for your collection, marketing, and derivatives.
Do not resell the raw pack as a stock asset pack.
