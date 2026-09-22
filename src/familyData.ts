export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: 1 | 2 | 3 | 4;
  photoUrl: string;
  birthyear: string;
  shortBio: string;
  notableMilestones?: string[];
}

export const familyData: FamilyMember[] = [
  // ==========================================
  // GENERATION 1: AUTUMN (Current / Modern Era)
  // ==========================================
  {
    id: 'gen1-1',
    name: 'Justin Gabriel A Jose',
    relation: 'Me',
    generation: 1,
    photoUrl: '/justin.jpg',
    birthyear: '2006',
    shortBio: 'Eldest son of Cristina A Jose and Jefrey A Jose, born on September 27, 2006. Currently a third-year student at the Polytechnic University of the Philippines.',
  },
  {
    id: 'gen1-2',
    name: 'Lance Jeffrey A Jose',
    relation: 'Brother',
    generation: 1,
    photoUrl: '/lance.jpg',
    birthyear: '2010',
    shortBio: 'Second son of Cristina A Jose and Jefrey A Jose, born on April 7, 2010. Younger brother of Justin and currently a senior high school student.',
  },

  // ==========================================
  // GENERATION 2: SUMMER (Parents / Maturation)
  // ==========================================
  {
    id: 'gen2-1',
    name: 'Maria Cristina A Jose',
    relation: 'Mother',
    generation: 2,
    photoUrl: '/cristina.jpg',
    birthyear: '1979',
    shortBio: 'The youngest child of Domingo and Flordeliza Dela Cruz. She is a devoted teacher, wife, and mother to Justin and Lance.',
  },
  {
    id: 'gen2-2',
    name: 'Jeffrey A Jose',
    relation: 'Father',
    generation: 2,
    photoUrl: '/jefrey.jpg',
    birthyear: '1979',
    shortBio: 'The eldest child of Marcelino and Florida A Jose. He is a hardworking OFW, husband, and father to Justin and Lance.',
  },

  // ==========================================
  // GENERATION 3: SPRING (Grandparents / Foundations)
  // ==========================================
  {
    id: 'gen3-1',
    name: 'Domingo Dela Cruz',
    relation: 'Grandfather',
    generation: 3,
    photoUrl: '/domingo.jpg',
    birthyear: '1939',
    shortBio: 'A retired policeman with a commanding voice and a soft spot for family. Everyone remembers how he’d yell "Gaboooo!" across the house whenever he had an errand ready for his grandso, Justin.',
  },
  {
    id: 'gen3-2',
    name: 'Flordeliza Dela Cruz',
    relation: 'Grandmother',
    generation: 3,
    photoUrl: '/flordeliza.jpg',
    birthyear: '1942',
    shortBio: 'A graceful homemaker and loving wife, once remembered as the most beautiful dalaga of her time. A devoted mother to seven, she kept a pristine, squeaky-clean home filled with warmth and heart.',
  },

  // ==========================================
  // GENERATION 4: WINTER (Ancestors / Roots)
  // ==========================================
  {
    id: 'gen4-1',
    name: 'Timoteo Dela Cruz',
    relation: 'Great-Grandfather',
    generation: 4,
    photoUrl: '[PASTE GENERATION 4 PATRIARCH PHOTO URL]',
    birthyear: '1914',
    shortBio: 'A master furniture maker of his era, widely known across Santol as a respected craftsman. With patient hands and an eye for detail, he shaped sturdy heirlooms that stood the test of time, grounding his family with the same honesty and quiet dedication.',
  },
  {
    id: 'gen4-2',
    name: 'Maria Paguia',
    relation: 'Great-Grandmother',
    generation: 4,
    photoUrl: '[PASTE GENERATION 4 MATRIARCH PHOTO URL]',
    birthyear: '1910',
    shortBio: 'The gentle matriarch whose kitchen and prayers anchored the whole household. Remembered for her soft-spoken wisdom, remarkable patience, and the warm, open door she kept for anyone needing a hot meal or comforting words.',
  }
];
