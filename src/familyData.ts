export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: 1 | 2 | 3 | 4;
  photoUrl: string;
  lifespan?: string;
  shortBio: string;
  notableMilestones?: string[];
}

export const familyData: FamilyMember[] = [
  // ==========================================
  // GENERATION 1: AUTUMN (Current / Modern Era)
  // ==========================================
  {
    id: 'gen1-1',
    name: '[PASTE GENERATION 1 CHILD NAME]',
    relation: 'Son / Daughter',
    generation: 1,
    photoUrl: '[PASTE GENERATION 1 CHILD PHOTO URL]',
    lifespan: '1990 - Present',
    shortBio: '[PASTE SHORT BIO HERE. The current generation, building on the foundation of those before...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
    ],
  },
  {
    id: 'gen1-2',
    name: '[PASTE GENERATION 1 CHILD NAME]',
    relation: 'Son / Daughter',
    generation: 1,
    photoUrl: '[PASTE GENERATION 1 CHILD PHOTO URL]',
    lifespan: '1995 - Present',
    shortBio: '[PASTE SHORT BIO HERE. Continuing the legacy with modern achievements...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
    ],
  },

  // ==========================================
  // GENERATION 2: SUMMER (Parents / Maturation)
  // ==========================================
  {
    id: 'gen2-1',
    name: '[PASTE GENERATION 2 FATHER NAME]',
    relation: 'Father',
    generation: 2,
    photoUrl: '[PASTE GENERATION 2 FATHER PHOTO URL]',
    lifespan: '1960 - Present',
    shortBio: '[PASTE SHORT BIO HERE. Flourishing and vibrant, guiding the modern family...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
    ],
  },
  {
    id: 'gen2-2',
    name: '[PASTE GENERATION 2 MOTHER NAME]',
    relation: 'Mother',
    generation: 2,
    photoUrl: '[PASTE GENERATION 2 MOTHER PHOTO URL]',
    lifespan: '1965 - Present',
    shortBio: '[PASTE SHORT BIO HERE. The warm center of the family...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
    ],
  },

  // ==========================================
  // GENERATION 3: SPRING (Grandparents / Foundations)
  // ==========================================
  {
    id: 'gen3-1',
    name: '[PASTE GENERATION 3 PATRIARCH NAME]',
    relation: 'Grandfather',
    generation: 3,
    photoUrl: '[PASTE GENERATION 3 PATRIARCH PHOTO URL]',
    lifespan: '1930 - 2010',
    shortBio: '[PASTE SHORT BIO HERE. Built upon the legacy with new growth...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
    ],
  },
  {
    id: 'gen3-2',
    name: '[PASTE GENERATION 3 MATRIARCH NAME]',
    relation: 'Grandmother',
    generation: 3,
    photoUrl: '[PASTE GENERATION 3 MATRIARCH PHOTO URL]',
    lifespan: '1935 - 2015',
    shortBio: '[PASTE SHORT BIO HERE. Nurtured the expanding branches of the tree...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
    ],
  },

  // ==========================================
  // GENERATION 4: WINTER (Ancestors / Roots)
  // ==========================================
  {
    id: 'gen4-1',
    name: '[PASTE GENERATION 4 PATRIARCH NAME]',
    relation: 'Great-Grandfather',
    generation: 4,
    photoUrl: '[PASTE GENERATION 4 PATRIARCH PHOTO URL]',
    lifespan: '1900 - 1980',
    shortBio: '[PASTE SHORT BIO HERE. He laid the foundation for the family...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
      '[PASTE MILESTONE 2]',
    ],
  },
  {
    id: 'gen4-2',
    name: '[PASTE GENERATION 4 MATRIARCH NAME]',
    relation: 'Great-Grandmother',
    generation: 4,
    photoUrl: '[PASTE GENERATION 4 MATRIARCH PHOTO URL]',
    lifespan: '1905 - 1985',
    shortBio: '[PASTE SHORT BIO HERE. She was the heart of the early family...]',
    notableMilestones: [
      '[PASTE MILESTONE 1]',
      '[PASTE MILESTONE 2]',
    ],
  }
];
