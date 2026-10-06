// Complete trait metadata for ChainCrafter PFP collection (v2 isolated layers)

export const CATEGORIES = [
  {
    id: 'BACKGROUND',
    label: '1. Background',
    order: 1,
    folder: 'BACKGROUNDS',
    description: 'Canvas backdrop — opaque solids, grids & street art',
    icon: 'Layers'
  },
  {
    id: 'BASE_SKIN',
    label: '2. Base Skin',
    order: 2,
    folder: 'BASE_SKIN',
    description: 'Anime bust skin tone & bio-cybernetic texture',
    icon: 'User'
  },
  {
    id: 'OUTFITS',
    label: '3. Outfit',
    order: 3,
    folder: 'OUTFITS',
    description: 'Streetwear, techwear, kimono & mecha armor collar',
    icon: 'Shirt'
  },
  {
    id: 'MOUTH',
    label: '4. Mouth Expression',
    order: 4,
    folder: 'MOUTH',
    description: 'Stoic, smirk, bored, hype & aggressive mouth shapes',
    icon: 'Smile'
  },
  {
    id: 'EYES',
    label: '5. Eye Optics',
    order: 5,
    folder: 'EYES',
    description: 'Eye expressions & vibrant eye color optics',
    icon: 'Eye'
  },
  {
    id: 'HAIR_STYLES',
    label: '6. Hair Style',
    order: 6,
    folder: 'HAIR_STYLES',
    description: 'Anime hair cuts & vibrant neon color dye options',
    icon: 'Scissors'
  },
  {
    id: 'ACCESSORIES',
    label: '7. Accessory',
    order: 7,
    folder: 'ACCESSORIES',
    description: 'Cyber visors, halo, masks, horns, glasses & earrings',
    icon: 'Glasses'
  }
];

export const LAYER_OFFSETS = {
  BACKGROUND: { x: 0, y: 0, scale: 1.0 },
  BASE_SKIN: { x: 0, y: 0, scale: 1.0 },
  OUTFITS: { x: 0, y: 0, scale: 1.0 },
  MOUTH: { x: 0, y: 0, scale: 1.0 },
  EYES: { x: 0, y: 0, scale: 1.0 },
  HAIR_STYLES: { x: 0, y: 0, scale: 1.0 },
  ACCESSORIES: { x: 0, y: 0, scale: 1.0 },

  expressions: { x: 0, y: 0, scale: 1.0 },
  facial_expressions: { x: 0, y: 0, scale: 1.0 },
  hair: { x: 0, y: 0, scale: 1.0 },
  accessories: { x: 0, y: 0, scale: 1.0 }
};


export function getLayerOffset(categoryId, traitObj) {
  if (traitObj && traitObj.offset) {
    return {
      x: traitObj.offset.x ?? 0,
      y: traitObj.offset.y ?? 0,
      scale: traitObj.offset.scale ?? 1.0
    };
  }
  const catKey = categoryId ? categoryId.toUpperCase() : '';
  const aliasKey = categoryId ? categoryId.toLowerCase() : '';
  const offset = LAYER_OFFSETS[catKey] || LAYER_OFFSETS[aliasKey] || { x: 0, y: 0, scale: 1.0 };
  return {
    x: offset.x ?? 0,
    y: offset.y ?? 0,
    scale: offset.scale ?? 1.0
  };
}

export const BACKGROUNDS = [
  { id: 'solid_obsidian', name: 'Solid Obsidian', file: '/nft_pfp_pack_v2/BACKGROUNDS/solid_obsidian.png', rarity: 'Common', colorHex: '#09090b', type: 'Solid' },
  { id: 'solid_electric_blue', name: 'Solid Electric Blue', file: '/nft_pfp_pack_v2/BACKGROUNDS/solid_electric_blue.png', rarity: 'Common', colorHex: '#0070f3', type: 'Solid' },
  { id: 'solid_hot_pink', name: 'Solid Hot Pink', file: '/nft_pfp_pack_v2/BACKGROUNDS/solid_hot_pink.png', rarity: 'Common', colorHex: '#ff007f', type: 'Solid' },
  { id: 'solid_neon_green', name: 'Solid Neon Green', file: '/nft_pfp_pack_v2/BACKGROUNDS/solid_neon_green.png', rarity: 'Common', colorHex: '#39ff14', type: 'Solid' },
  { id: 'solid_violet', name: 'Solid Violet', file: '/nft_pfp_pack_v2/BACKGROUNDS/solid_violet.png', rarity: 'Common', colorHex: '#8b5cf6', type: 'Solid' },
  { id: 'flat_cyber_grid', name: 'Flat Cyber Grid', file: '/nft_pfp_pack_v2/BACKGROUNDS/flat_cyber_grid.png', rarity: 'Uncommon', colorHex: '#18181b', type: 'Grid' },
  { id: 'cyberpunk_grid', name: 'Cyberpunk 3D Grid', file: '/nft_pfp_pack_v2/BACKGROUNDS/cyberpunk_grid.png', rarity: 'Rare', colorHex: '#0f172a', type: 'Grid' },
  { id: 'neon_gradient_magenta_cyan', name: 'Neon Gradient Cyan/Pink', file: '/nft_pfp_pack_v2/BACKGROUNDS/neon_gradient_magenta_cyan.png', rarity: 'Rare', colorHex: '#00f3ff', type: 'Gradient' },
  { id: 'abstract_graffiti_wall', name: 'Abstract Cyber Graffiti', file: '/nft_pfp_pack_v2/BACKGROUNDS/abstract_graffiti_wall.png', rarity: 'Legendary', colorHex: '#f43f5e', type: 'Art' }
];

export const BASE_SKINS = [
  // Pale
  { id: 'pale_smooth', name: 'Pale / Smooth', file: '/nft_pfp_pack_v2/BASE_SKIN/pale_smooth.png', tone: 'Pale', texture: 'Smooth', rarity: 'Common' },
  { id: 'pale_cyborg', name: 'Pale / Cyborg Seams', file: '/nft_pfp_pack_v2/BASE_SKIN/pale_cyborg.png', tone: 'Pale', texture: 'Cyborg', rarity: 'Uncommon' },
  { id: 'pale_alien', name: 'Pale / Alien Glow Veins', file: '/nft_pfp_pack_v2/BASE_SKIN/pale_alien.png', tone: 'Pale', texture: 'Alien', rarity: 'Rare' },
  { id: 'pale_reptilian', name: 'Pale / Reptilian Scales', file: '/nft_pfp_pack_v2/BASE_SKIN/pale_reptilian.png', tone: 'Pale', texture: 'Reptilian', rarity: 'Legendary' },
  // Tan
  { id: 'tan_smooth', name: 'Tan / Smooth', file: '/nft_pfp_pack_v2/BASE_SKIN/tan_smooth.png', tone: 'Tan', texture: 'Smooth', rarity: 'Common' },
  { id: 'tan_cyborg', name: 'Tan / Cyborg Seams', file: '/nft_pfp_pack_v2/BASE_SKIN/tan_cyborg.png', tone: 'Tan', texture: 'Cyborg', rarity: 'Uncommon' },
  { id: 'tan_alien', name: 'Tan / Alien Glow Veins', file: '/nft_pfp_pack_v2/BASE_SKIN/tan_alien.png', tone: 'Tan', texture: 'Alien', rarity: 'Rare' },
  { id: 'tan_reptilian', name: 'Tan / Reptilian Scales', file: '/nft_pfp_pack_v2/BASE_SKIN/tan_reptilian.png', tone: 'Tan', texture: 'Reptilian', rarity: 'Legendary' },
  // Dark Brown
  { id: 'darkbrown_smooth', name: 'Dark Brown / Smooth', file: '/nft_pfp_pack_v2/BASE_SKIN/darkbrown_smooth.png', tone: 'Dark Brown', texture: 'Smooth', rarity: 'Common' },
  { id: 'darkbrown_cyborg', name: 'Dark Brown / Cyborg Seams', file: '/nft_pfp_pack_v2/BASE_SKIN/darkbrown_cyborg.png', tone: 'Dark Brown', texture: 'Cyborg', rarity: 'Uncommon' },
  { id: 'darkbrown_alien', name: 'Dark Brown / Alien Glow Veins', file: '/nft_pfp_pack_v2/BASE_SKIN/darkbrown_alien.png', tone: 'Dark Brown', texture: 'Alien', rarity: 'Rare' },
  { id: 'darkbrown_reptilian', name: 'Dark Brown / Reptilian Scales', file: '/nft_pfp_pack_v2/BASE_SKIN/darkbrown_reptilian.png', tone: 'Dark Brown', texture: 'Reptilian', rarity: 'Legendary' },
  // Warm Olive
  { id: 'warmolive_smooth', name: 'Warm Olive / Smooth', file: '/nft_pfp_pack_v2/BASE_SKIN/warmolive_smooth.png', tone: 'Warm Olive', texture: 'Smooth', rarity: 'Common' },
  { id: 'warmolive_cyborg', name: 'Warm Olive / Cyborg Seams', file: '/nft_pfp_pack_v2/BASE_SKIN/warmolive_cyborg.png', tone: 'Warm Olive', texture: 'Cyborg', rarity: 'Uncommon' },
  { id: 'warmolive_alien', name: 'Warm Olive / Alien Glow Veins', file: '/nft_pfp_pack_v2/BASE_SKIN/warmolive_alien.png', tone: 'Warm Olive', texture: 'Alien', rarity: 'Rare' },
  { id: 'warmolive_reptilian', name: 'Warm Olive / Reptilian Scales', file: '/nft_pfp_pack_v2/BASE_SKIN/warmolive_reptilian.png', tone: 'Warm Olive', texture: 'Reptilian', rarity: 'Legendary' }
];

export const OUTFITS = [
  { id: 'minimalist_tee', name: 'Minimalist Tee', file: '/nft_pfp_pack_v2/OUTFITS/minimalist_tee.png', rarity: 'Common' },
  { id: 'casual_kimono', name: 'Casual Cyber Kimono', file: '/nft_pfp_pack_v2/OUTFITS/casual_kimono.png', rarity: 'Common' },
  { id: 'cyberpunk_hoodie', name: 'Cyberpunk Oversized Hoodie', file: '/nft_pfp_pack_v2/OUTFITS/cyberpunk_hoodie.png', rarity: 'Uncommon' },
  { id: 'techwear_jacket', name: 'Tactical Techwear Jacket', file: '/nft_pfp_pack_v2/OUTFITS/techwear_jacket.png', rarity: 'Rare' },
  { id: 'mecha_suit_collar', name: 'Mecha Exosuit Collar', file: '/nft_pfp_pack_v2/OUTFITS/mecha_suit_collar.png', rarity: 'Legendary' }
];

export const MOUTHS = [
  { id: 'stoic_neutral', name: 'Stoic Neutral', file: '/nft_pfp_pack_v2/MOUTH/stoic_neutral.png', rarity: 'Common' },
  { id: 'confident_smirk', name: 'Confident Smirk', file: '/nft_pfp_pack_v2/MOUTH/confident_smirk.png', rarity: 'Common' },
  { id: 'bored_lazy', name: 'Bored / Lazy Gaze', file: '/nft_pfp_pack_v2/MOUTH/bored_lazy.png', rarity: 'Common' },
  { id: 'hype_excited', name: 'Hype / Excited', file: '/nft_pfp_pack_v2/MOUTH/hype_excited.png', rarity: 'Uncommon' },
  { id: 'aggressive_ready', name: 'Aggressive / Ready', file: '/nft_pfp_pack_v2/MOUTH/aggressive_ready.png', rarity: 'Rare' }
];

export const EYES = [
  // Stoic Neutral
  { id: 'stoic_neutral_golden_amber', name: 'Stoic Neutral (Golden Amber)', file: '/nft_pfp_pack_v2/EYES/stoic_neutral_golden_amber.png', expression: 'Stoic', color: 'Amber', rarity: 'Common' },
  { id: 'stoic_neutral_emerald_green', name: 'Stoic Neutral (Emerald Green)', file: '/nft_pfp_pack_v2/EYES/stoic_neutral_emerald_green.png', expression: 'Stoic', color: 'Emerald Green', rarity: 'Uncommon' },
  { id: 'stoic_neutral_violet', name: 'Stoic Neutral (Violet)', file: '/nft_pfp_pack_v2/EYES/stoic_neutral_violet.png', expression: 'Stoic', color: 'Violet', rarity: 'Uncommon' },
  { id: 'stoic_neutral_crimson_red', name: 'Stoic Neutral (Crimson Red)', file: '/nft_pfp_pack_v2/EYES/stoic_neutral_crimson_red.png', expression: 'Stoic', color: 'Crimson Red', rarity: 'Rare' },
  { id: 'stoic_neutral_heterochromia_cyan_pink', name: 'Stoic Neutral (Heterochromia Cyan/Pink)', file: '/nft_pfp_pack_v2/EYES/stoic_neutral_heterochromia_cyan_pink.png', expression: 'Stoic', color: 'Heterochromia', rarity: 'Legendary' },

  // Confident Smirk
  { id: 'confident_smirk_golden_amber', name: 'Confident Smirk (Golden Amber)', file: '/nft_pfp_pack_v2/EYES/confident_smirk_golden_amber.png', expression: 'Smirk', color: 'Amber', rarity: 'Common' },
  { id: 'confident_smirk_emerald_green', name: 'Confident Smirk (Emerald Green)', file: '/nft_pfp_pack_v2/EYES/confident_smirk_emerald_green.png', expression: 'Smirk', color: 'Emerald Green', rarity: 'Uncommon' },
  { id: 'confident_smirk_violet', name: 'Confident Smirk (Violet)', file: '/nft_pfp_pack_v2/EYES/confident_smirk_violet.png', expression: 'Smirk', color: 'Violet', rarity: 'Uncommon' },
  { id: 'confident_smirk_crimson_red', name: 'Confident Smirk (Crimson Red)', file: '/nft_pfp_pack_v2/EYES/confident_smirk_crimson_red.png', expression: 'Smirk', color: 'Crimson Red', rarity: 'Rare' },
  { id: 'confident_smirk_heterochromia_cyan_pink', name: 'Confident Smirk (Heterochromia Cyan/Pink)', file: '/nft_pfp_pack_v2/EYES/confident_smirk_heterochromia_cyan_pink.png', expression: 'Smirk', color: 'Heterochromia', rarity: 'Legendary' },

  // Bored / Lazy
  { id: 'bored_lazy_golden_amber', name: 'Bored / Lazy (Golden Amber)', file: '/nft_pfp_pack_v2/EYES/bored_lazy_golden_amber.png', expression: 'Bored', color: 'Amber', rarity: 'Common' },
  { id: 'bored_lazy_emerald_green', name: 'Bored / Lazy (Emerald Green)', file: '/nft_pfp_pack_v2/EYES/bored_lazy_emerald_green.png', expression: 'Bored', color: 'Emerald Green', rarity: 'Uncommon' },
  { id: 'bored_lazy_violet', name: 'Bored / Lazy (Violet)', file: '/nft_pfp_pack_v2/EYES/bored_lazy_violet.png', expression: 'Bored', color: 'Violet', rarity: 'Uncommon' },
  { id: 'bored_lazy_crimson_red', name: 'Bored / Lazy (Crimson Red)', file: '/nft_pfp_pack_v2/EYES/bored_lazy_crimson_red.png', expression: 'Bored', color: 'Crimson Red', rarity: 'Rare' },
  { id: 'bored_lazy_heterochromia_cyan_pink', name: 'Bored / Lazy (Heterochromia Cyan/Pink)', file: '/nft_pfp_pack_v2/EYES/bored_lazy_heterochromia_cyan_pink.png', expression: 'Bored', color: 'Heterochromia', rarity: 'Legendary' },

  // Hype / Excited
  { id: 'hype_excited_golden_amber', name: 'Hype / Excited (Golden Amber)', file: '/nft_pfp_pack_v2/EYES/hype_excited_golden_amber.png', expression: 'Hype', color: 'Amber', rarity: 'Uncommon' },
  { id: 'hype_excited_emerald_green', name: 'Hype / Excited (Emerald Green)', file: '/nft_pfp_pack_v2/EYES/hype_excited_emerald_green.png', expression: 'Hype', color: 'Emerald Green', rarity: 'Uncommon' },
  { id: 'hype_excited_violet', name: 'Hype / Excited (Violet)', file: '/nft_pfp_pack_v2/EYES/hype_excited_violet.png', expression: 'Hype', color: 'Violet', rarity: 'Uncommon' },
  { id: 'hype_excited_crimson_red', name: 'Hype / Excited (Crimson Red)', file: '/nft_pfp_pack_v2/EYES/hype_excited_crimson_red.png', expression: 'Hype', color: 'Crimson Red', rarity: 'Rare' },
  { id: 'hype_excited_heterochromia_cyan_pink', name: 'Hype / Excited (Heterochromia Cyan/Pink)', file: '/nft_pfp_pack_v2/EYES/hype_excited_heterochromia_cyan_pink.png', expression: 'Hype', color: 'Heterochromia', rarity: 'Legendary' },

  // Aggressive / Ready
  { id: 'aggressive_ready_golden_amber', name: 'Aggressive (Golden Amber)', file: '/nft_pfp_pack_v2/EYES/aggressive_ready_golden_amber.png', expression: 'Aggressive', color: 'Amber', rarity: 'Rare' },
  { id: 'aggressive_ready_emerald_green', name: 'Aggressive (Emerald Green)', file: '/nft_pfp_pack_v2/EYES/aggressive_ready_emerald_green.png', expression: 'Aggressive', color: 'Emerald Green', rarity: 'Rare' },
  { id: 'aggressive_ready_violet', name: 'Aggressive (Violet)', file: '/nft_pfp_pack_v2/EYES/aggressive_ready_violet.png', expression: 'Aggressive', color: 'Violet', rarity: 'Rare' },
  { id: 'aggressive_ready_crimson_red', name: 'Aggressive (Crimson Red)', file: '/nft_pfp_pack_v2/EYES/aggressive_ready_crimson_red.png', expression: 'Aggressive', color: 'Crimson Red', rarity: 'Rare' },
  { id: 'aggressive_ready_heterochromia_cyan_pink', name: 'Aggressive (Heterochromia Cyan/Pink)', file: '/nft_pfp_pack_v2/EYES/aggressive_ready_heterochromia_cyan_pink.png', expression: 'Aggressive', color: 'Heterochromia', rarity: 'Legendary' }
];

export const HAIR_STYLES = [
  // Messy Curtain
  { id: 'messy_curtain_obsidian_black', name: 'Messy Curtain / Obsidian Black', file: '/nft_pfp_pack_v2/HAIR_STYLES/messy_curtain_obsidian_black.png', style: 'Messy Curtain', color: 'Obsidian Black', colorHex: '#18181b', rarity: 'Common' },
  { id: 'messy_curtain_electric_blue', name: 'Messy Curtain / Electric Blue', file: '/nft_pfp_pack_v2/HAIR_STYLES/messy_curtain_electric_blue.png', style: 'Messy Curtain', color: 'Electric Blue', colorHex: '#0070f3', rarity: 'Uncommon' },
  { id: 'messy_curtain_hot_pink', name: 'Messy Curtain / Hot Pink', file: '/nft_pfp_pack_v2/HAIR_STYLES/messy_curtain_hot_pink.png', style: 'Messy Curtain', color: 'Hot Pink', colorHex: '#ff007f', rarity: 'Uncommon' },
  { id: 'messy_curtain_platinum_blonde', name: 'Messy Curtain / Platinum Blonde', file: '/nft_pfp_pack_v2/HAIR_STYLES/messy_curtain_platinum_blonde.png', style: 'Messy Curtain', color: 'Platinum Blonde', colorHex: '#e4e4e7', rarity: 'Uncommon' },
  { id: 'messy_curtain_neon_green', name: 'Messy Curtain / Neon Green', file: '/nft_pfp_pack_v2/HAIR_STYLES/messy_curtain_neon_green.png', style: 'Messy Curtain', color: 'Neon Green', colorHex: '#39ff14', rarity: 'Rare' },

  // Bob Cut
  { id: 'bob_cut_obsidian_black', name: 'Bob Cut / Obsidian Black', file: '/nft_pfp_pack_v2/HAIR_STYLES/bob_cut_obsidian_black.png', style: 'Bob Cut', color: 'Obsidian Black', colorHex: '#18181b', rarity: 'Common' },
  { id: 'bob_cut_electric_blue', name: 'Bob Cut / Electric Blue', file: '/nft_pfp_pack_v2/HAIR_STYLES/bob_cut_electric_blue.png', style: 'Bob Cut', color: 'Electric Blue', colorHex: '#0070f3', rarity: 'Uncommon' },
  { id: 'bob_cut_hot_pink', name: 'Bob Cut / Hot Pink', file: '/nft_pfp_pack_v2/HAIR_STYLES/bob_cut_hot_pink.png', style: 'Bob Cut', color: 'Hot Pink', colorHex: '#ff007f', rarity: 'Uncommon' },
  { id: 'bob_cut_platinum_blonde', name: 'Bob Cut / Platinum Blonde', file: '/nft_pfp_pack_v2/HAIR_STYLES/bob_cut_platinum_blonde.png', style: 'Bob Cut', color: 'Platinum Blonde', colorHex: '#e4e4e7', rarity: 'Uncommon' },
  { id: 'bob_cut_neon_green', name: 'Bob Cut / Neon Green', file: '/nft_pfp_pack_v2/HAIR_STYLES/bob_cut_neon_green.png', style: 'Bob Cut', color: 'Neon Green', colorHex: '#39ff14', rarity: 'Rare' },

  // Cyberpunk Undercut
  { id: 'cyberpunk_undercut_obsidian_black', name: 'Cyber Undercut / Obsidian Black', file: '/nft_pfp_pack_v2/HAIR_STYLES/cyberpunk_undercut_obsidian_black.png', style: 'Cyber Undercut', color: 'Obsidian Black', colorHex: '#18181b', rarity: 'Uncommon' },
  { id: 'cyberpunk_undercut_electric_blue', name: 'Cyber Undercut / Electric Blue', file: '/nft_pfp_pack_v2/HAIR_STYLES/cyberpunk_undercut_electric_blue.png', style: 'Cyber Undercut', color: 'Electric Blue', colorHex: '#0070f3', rarity: 'Uncommon' },
  { id: 'cyberpunk_undercut_hot_pink', name: 'Cyber Undercut / Hot Pink', file: '/nft_pfp_pack_v2/HAIR_STYLES/cyberpunk_undercut_hot_pink.png', style: 'Cyber Undercut', color: 'Hot Pink', colorHex: '#ff007f', rarity: 'Uncommon' },
  { id: 'cyberpunk_undercut_platinum_blonde', name: 'Cyber Undercut / Platinum Blonde', file: '/nft_pfp_pack_v2/HAIR_STYLES/cyberpunk_undercut_platinum_blonde.png', style: 'Cyber Undercut', color: 'Platinum Blonde', colorHex: '#e4e4e7', rarity: 'Rare' },
  { id: 'cyberpunk_undercut_neon_green', name: 'Cyber Undercut / Neon Green', file: '/nft_pfp_pack_v2/HAIR_STYLES/cyberpunk_undercut_neon_green.png', style: 'Cyber Undercut', color: 'Neon Green', colorHex: '#39ff14', rarity: 'Rare' },

  // Flowing Long
  { id: 'flowing_long_obsidian_black', name: 'Flowing Long / Obsidian Black', file: '/nft_pfp_pack_v2/HAIR_STYLES/flowing_long_obsidian_black.png', style: 'Flowing Long', color: 'Obsidian Black', colorHex: '#18181b', rarity: 'Uncommon' },
  { id: 'flowing_long_electric_blue', name: 'Flowing Long / Electric Blue', file: '/nft_pfp_pack_v2/HAIR_STYLES/flowing_long_electric_blue.png', style: 'Flowing Long', color: 'Electric Blue', colorHex: '#0070f3', rarity: 'Uncommon' },
  { id: 'flowing_long_hot_pink', name: 'Flowing Long / Hot Pink', file: '/nft_pfp_pack_v2/HAIR_STYLES/flowing_long_hot_pink.png', style: 'Flowing Long', color: 'Hot Pink', colorHex: '#ff007f', rarity: 'Rare' },
  { id: 'flowing_long_platinum_blonde', name: 'Flowing Long / Platinum Blonde', file: '/nft_pfp_pack_v2/HAIR_STYLES/flowing_long_platinum_blonde.png', style: 'Flowing Long', color: 'Platinum Blonde', colorHex: '#e4e4e7', rarity: 'Rare' },
  { id: 'flowing_long_neon_green', name: 'Flowing Long / Neon Green', file: '/nft_pfp_pack_v2/HAIR_STYLES/flowing_long_neon_green.png', style: 'Flowing Long', color: 'Neon Green', colorHex: '#39ff14', rarity: 'Rare' },

  // Spiky Shonen
  { id: 'spiky_shonen_obsidian_black', name: 'Spiky Shonen / Obsidian Black', file: '/nft_pfp_pack_v2/HAIR_STYLES/spiky_shonen_obsidian_black.png', style: 'Spiky Shonen', color: 'Obsidian Black', colorHex: '#18181b', rarity: 'Rare' },
  { id: 'spiky_shonen_electric_blue', name: 'Spiky Shonen / Electric Blue', file: '/nft_pfp_pack_v2/HAIR_STYLES/spiky_shonen_electric_blue.png', style: 'Spiky Shonen', color: 'Electric Blue', colorHex: '#0070f3', rarity: 'Rare' },
  { id: 'spiky_shonen_hot_pink', name: 'Spiky Shonen / Hot Pink', file: '/nft_pfp_pack_v2/HAIR_STYLES/spiky_shonen_hot_pink.png', style: 'Spiky Shonen', color: 'Hot Pink', colorHex: '#ff007f', rarity: 'Rare' },
  { id: 'spiky_shonen_platinum_blonde', name: 'Spiky Shonen / Platinum Blonde', file: '/nft_pfp_pack_v2/HAIR_STYLES/spiky_shonen_platinum_blonde.png', style: 'Spiky Shonen', color: 'Platinum Blonde', colorHex: '#e4e4e7', rarity: 'Rare' },
  { id: 'spiky_shonen_neon_green', name: 'Spiky Shonen / Neon Green', file: '/nft_pfp_pack_v2/HAIR_STYLES/spiky_shonen_neon_green.png', style: 'Spiky Shonen', color: 'Neon Green', colorHex: '#39ff14', rarity: 'Legendary' }
];

export const ACCESSORIES = [
  { id: 'none', name: 'None (Clean)', file: null, rarity: 'Common' },
  { id: 'earrings', name: 'Cyber Earrings', file: '/nft_pfp_pack_v2/ACCESSORIES/earrings.png', rarity: 'Common' },
  { id: 'round_glasses', name: 'Round Glasses', file: '/nft_pfp_pack_v2/ACCESSORIES/round_glasses.png', rarity: 'Uncommon' },
  { id: 'retro_sunglasses', name: 'Retro Sunglasses', file: '/nft_pfp_pack_v2/ACCESSORIES/retro_sunglasses.png', rarity: 'Uncommon' },
  { id: 'neon_halo', name: 'Neon Halo', file: '/nft_pfp_pack_v2/ACCESSORIES/neon_halo.png', rarity: 'Rare' },
  { id: 'cyber_visor', name: 'Cyber Visor', file: '/nft_pfp_pack_v2/ACCESSORIES/cyber_visor.png', rarity: 'Rare' },
  { id: 'face_mask', name: 'Tactical Face Mask', file: '/nft_pfp_pack_v2/ACCESSORIES/face_mask.png', rarity: 'Rare' },
  { id: 'cybernetic_horns', name: 'Cybernetic Horns', file: '/nft_pfp_pack_v2/ACCESSORIES/cybernetic_horns.png', rarity: 'Legendary' }
];

export const PREVIEWS = [
  { id: 'preview_spiky_blue', name: 'Spiky Electric', file: '/nft_pfp_pack_v2/PREVIEWS/preview_spiky_blue.png', tags: ['Spiky', 'Electric Blue', 'Visor'] },
  { id: 'preview_long_pink', name: 'Neon Stardust', file: '/nft_pfp_pack_v2/PREVIEWS/preview_long_pink.png', tags: ['Flowing Long', 'Hot Pink', 'Halo'] },
  { id: 'preview_hoodie_grid', name: 'Grid Runner', file: '/nft_pfp_pack_v2/PREVIEWS/preview_hoodie_grid.png', tags: ['Hoodie', 'Cyber Grid'] },
  { id: 'preview_mecha_gradient', name: 'Mecha Sovereign', file: '/nft_pfp_pack_v2/PREVIEWS/preview_mecha_gradient.png', tags: ['Mecha Collar', 'Heterochromia'] },
  { id: 'preview_visor_obsidian', name: 'Obsidian Agent', file: '/nft_pfp_pack_v2/PREVIEWS/preview_visor_obsidian.png', tags: ['Cyborg', 'Visor', 'Techwear'] },
  { id: 'preview_kimono_graffiti', name: 'Graffiti Ronin', file: '/nft_pfp_pack_v2/PREVIEWS/preview_kimono_graffiti.png', tags: ['Kimono', 'Graffiti', 'Horns'] },
  { id: 'preview_hype', name: 'Hype Cyberpunk', file: '/nft_pfp_pack_v2/PREVIEWS/preview_hype.png', tags: ['Hype', 'Undercut'] },
  { id: 'preview_alien_pale', name: 'Alien Bio-Glow', file: '/nft_pfp_pack_v2/PREVIEWS/preview_alien_pale.png', tags: ['Alien Skin', 'Platinum'] }
];

export const PRESET_RECIPES = [
  {
    name: 'Cyberpunk Warlord',
    description: 'Aggressive mecha warlord with alien glow veins and cyber horns',
    traits: {
      BACKGROUND: 'cyberpunk_grid',
      BASE_SKIN: 'pale_alien',
      OUTFITS: 'mecha_suit_collar',
      MOUTH: 'aggressive_ready',
      EYES: 'aggressive_ready_golden_amber',
      HAIR_STYLES: 'spiky_shonen_neon_green',
      ACCESSORIES: 'cybernetic_horns'
    }
  },
  {
    name: 'Neon Angel',
    description: 'Etherial cyborg with platinum flowing hair and glowing halo',
    traits: {
      BACKGROUND: 'neon_gradient_magenta_cyan',
      BASE_SKIN: 'pale_cyborg',
      OUTFITS: 'casual_kimono',
      MOUTH: 'stoic_neutral',
      EYES: 'stoic_neutral_heterochromia_cyan_pink',
      HAIR_STYLES: 'flowing_long_platinum_blonde',
      ACCESSORIES: 'neon_halo'
    }
  },
  {
    name: 'Obsidian Assassin',
    description: 'Stealth techwear agent with black bob cut and tactical visor',
    traits: {
      BACKGROUND: 'solid_obsidian',
      BASE_SKIN: 'darkbrown_smooth',
      OUTFITS: 'techwear_jacket',
      MOUTH: 'stoic_neutral',
      EYES: 'stoic_neutral_crimson_red',
      HAIR_STYLES: 'bob_cut_obsidian_black',
      ACCESSORIES: 'cyber_visor'
    }
  },
  {
    name: 'Streetwear Rebel',
    description: 'Hype oversized hoodie look with electric blue undercut',
    traits: {
      BACKGROUND: 'abstract_graffiti_wall',
      BASE_SKIN: 'tan_smooth',
      OUTFITS: 'cyberpunk_hoodie',
      MOUTH: 'confident_smirk',
      EYES: 'confident_smirk_golden_amber',
      HAIR_STYLES: 'cyberpunk_undercut_electric_blue',
      ACCESSORIES: 'retro_sunglasses'
    }
  },
  {
    name: 'Reptilian Spectre',
    description: 'Scaley reptilian legend in minimalist tee with crimson gaze',
    traits: {
      BACKGROUND: 'flat_cyber_grid',
      BASE_SKIN: 'warmolive_reptilian',
      OUTFITS: 'minimalist_tee',
      MOUTH: 'bored_lazy',
      EYES: 'bored_lazy_crimson_red',
      HAIR_STYLES: 'messy_curtain_hot_pink',
      ACCESSORIES: 'face_mask'
    }
  }
];

export const RARITY_WEIGHTS = {
  Common: 10,
  Uncommon: 25,
  Rare: 50,
  Legendary: 100
};

export const RARITY_COLORS = {
  Common: { text: 'text-zinc-400', bg: 'bg-zinc-800', border: 'border-zinc-700' },
  Uncommon: { text: 'text-cyan-400', bg: 'bg-cyan-950', border: 'border-cyan-700' },
  Rare: { text: 'text-purple-400', bg: 'bg-purple-950', border: 'border-purple-700' },
  Legendary: { text: 'text-amber-400', bg: 'bg-amber-950', border: 'border-amber-600' }
};
