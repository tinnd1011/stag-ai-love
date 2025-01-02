// Mock translation data for demonstration
export const MOCK_TRANSLATIONS = {
  'en': {
    name: 'Ancient Common',
    translations: {
      'healing': 'Vitae Restauro',
      'fireball': 'Ignitus Spherae',
      'shield': 'Protego Maxima',
      'lightning': 'Fulgur Tempesta',
      'water': 'Aqua Fluens',
      'wind': 'Ventus Spiritus',
      'earth': 'Terra Firma',
      'poison': 'Toxicus Mortis',
      'ice': 'Glacius Maxima',
      'sleep': 'Somnus Eternus'
    }
  },
  'es': {
    name: 'Elvish Script',
    translations: {
      'healing': 'Edhil Nestadren',
      'fireball': 'Naur Coron',
      'shield': 'Thand Aegas',
      'lightning': 'Galadhrim Amrûn',
      'water': 'Nen Sirith',
      'wind': 'Súlimo Hwesta',
      'earth': 'Arda Kemina',
      'poison': 'Sangwa Mórë',
      'ice': 'Helcë Forya',
      'sleep': 'Lórë Estë'
    }
  },
  'fr': {
    name: 'Fae Runes',
    translations: {
      'healing': 'Guérir Luméra',
      'fireball': 'Boule de Fae',
      'shield': 'Bouclier Féerique',
      'lightning': 'Éclair Mystique',
      'water': 'Eau Enchantée',
      'wind': 'Vent Sylphide',
      'earth': 'Terre Ancienne',
      'poison': 'Poison Obscur',
      'ice': 'Glace Éternelle',
      'sleep': 'Sommeil Profond'
    }
  }
} as const;

// Mock spell ingredients
export const SPELL_INGREDIENTS = [
  'Dragon\'s Breath',
  'Phoenix Feather',
  'Unicorn Hair',
  'Mandrake Root',
  'Basilisk Fang',
  'Mermaid Scales',
  'Griffin Claw',
  'Fairy Dust',
  'Troll Blood',
  'Sphinx Riddle'
];

// Generate a mock spell recipe
export const generateSpellRecipe = (text: string): string => {
  const ingredients = SPELL_INGREDIENTS
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  return `
Recipe for "${text}":
${ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}
Mix under the full moon's light.
Speak the incantation thrice.
  `.trim();
};