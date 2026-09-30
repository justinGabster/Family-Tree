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
  // GENERATION 1: The Future & Branches
  // ==========================================
  {
    id: 'justin',
    name: 'Justin A Jose',
    relation: 'Me',
    generation: 1,
    photoUrl: '/justin.jpg',
    birthyear: '2006',
    shortBio: 'Eldest son of Cristina A Jose and Jeffrey A Jose, born on September 27, 2006. Currently a third-year student at the Polytechnic University of the Philippines.',
  },
  {
    id: 'lance',
    name: 'Lance A Jose',
    relation: 'Brother',
    generation: 1,
    photoUrl: '/lance.jpg',
    birthyear: '2010',
    shortBio: 'Second son of Cristina A Jose and Jeffrey A Jose, born on April 7, 2010. Younger brother of Justin and currently a senior high school student.',
  },

  // ==========================================
  // GENERATION 2: The Parents & Trunks
  // ==========================================
  {
    id: 'cristina',
    name: 'Cristina Dela Cruz',
    relation: 'Mother',
    generation: 2,
    photoUrl: '/cristina.jpg',
    birthyear: '1979',
    shortBio: 'The youngest child of Domingo and Flordeliza Dela Cruz. She is a devoted teacher, wife, and mother to Justin and Lance.',
  },
  {
    id: 'jeffrey',
    name: 'Jeffrey A Jose',
    relation: 'Father',
    generation: 2,
    photoUrl: '/jefrey.jpg',
    birthyear: '1979',
    shortBio: 'The eldest child of Marcelino and Florida A Jose. He is a hardworking OFW, husband, and father to Justin and Lance.',
  },
  {
    id: 'janice',
    name: 'Janice A Jose',
    relation: 'Aunt',
    generation: 2,
    photoUrl: '/janice.jpg',
    birthyear: '1982',
    shortBio: 'Sister of Jeffrey A Jose.',
  },
  {
    id: 'jerome',
    name: 'Jerome A Jose',
    relation: 'Uncle',
    generation: 2,
    photoUrl: '/jerome.jpg',
    birthyear: '1985',
    shortBio: 'Brother of Jeffrey A Jose.',
  },
  {
    id: 'jefferex',
    name: 'Jefferex A Jose',
    relation: 'Uncle',
    generation: 2,
    photoUrl: '/jefferex.jpg',
    birthyear: '1988',
    shortBio: 'Brother of Jeffrey A Jose.',
  },

  // ==========================================
  // GENERATION 3: The Grandparents & Foundations
  // ==========================================
  {
    id: 'flordeliza',
    name: 'Flordeliza Paguia',
    relation: 'Grandmother',
    generation: 3,
    photoUrl: '/flordeliza.jpg',
    birthyear: '1942',
    shortBio: 'A graceful homemaker and loving wife, once remembered as the most beautiful dalaga of her time. A devoted mother to seven, she kept a pristine, squeaky-clean home filled with warmth and heart.',
  },
  {
    id: 'domingo',
    name: 'Domingo Dela Cruz',
    relation: 'Grandfather',
    generation: 3,
    photoUrl: '/domingo.jpg',
    birthyear: '1939',
    shortBio: 'A retired policeman with a commanding voice and a soft spot for family. Everyone remembers how he\'d yell "Gaboooo!" across the house whenever he had an errand ready for his grandson, Justin.',
  },
  {
    id: 'marcelino',
    name: 'Marcelino A Jose',
    relation: 'Grandfather',
    generation: 3,
    photoUrl: '/marcelino.jpg',
    birthyear: '1945',
    shortBio: 'Paternal grandfather, father of Jeffrey and his siblings.',
  },
  {
    id: 'florida',
    name: 'Florida Calalang',
    relation: 'Grandmother',
    generation: 3,
    photoUrl: '/florida.jpg',
    birthyear: '1948',
    shortBio: 'Paternal grandmother, mother of Jeffrey and his siblings.',
  },
  {
    id: 'filomena',
    name: 'Filomena Calalang',
    relation: 'Great Aunt',
    generation: 3,
    photoUrl: '/filomena.jpg',
    birthyear: '1950',
    shortBio: 'Sister of Florida Calalang.',
  },

  // ==========================================
  // GENERATION 4: The Great Grandparents & Roots
  // ==========================================
  {
    id: 'timoteo',
    name: 'Timoteo Dela Cruz',
    relation: 'Great-Grandfather',
    generation: 4,
    photoUrl: '',
    birthyear: '1914',
    shortBio: 'A master furniture maker of his era, widely known across Santol as a respected craftsman. With patient hands and an eye for detail, he shaped sturdy heirlooms that stood the test of time, grounding his family with the same honesty and quiet dedication.',
  },
  {
    id: 'maria',
    name: 'Maria Paguia',
    relation: 'Great-Grandmother',
    generation: 4,
    photoUrl: '',
    birthyear: '1910',
    shortBio: 'The gentle matriarch whose kitchen and prayers anchored the whole household. Remembered for her soft-spoken wisdom, remarkable patience, and the warm, open door she kept for anyone needing a hot meal or comforting words.',
  },
  {
    id: 'pablo',
    name: 'Pablo Calalang',
    relation: 'Great-Grandfather',
    generation: 4,
    photoUrl: '/pablo.jpg',
    birthyear: '1920',
    shortBio: 'Patriarch of the Calalang family.',
  },
  {
    id: 'gloria',
    name: 'Gloria Adornado',
    relation: 'Great-Grandmother',
    generation: 4,
    photoUrl: '',
    birthyear: '1925',
    shortBio: 'Matriarch of the Calalang family.',
  },
  // Calalang Siblings
  {
    id: 'rody',
    name: 'Rody Calalang',
    relation: 'Great Uncle',
    generation: 4,
    photoUrl: '/rody.jpg',
    birthyear: '',
    shortBio: '',
  },
  {
    id: 'ely',
    name: 'Ely Calalang',
    relation: 'Great Aunt',
    generation: 4,
    photoUrl: '/ely.jpg',
    birthyear: '',
    shortBio: '',
  },
  {
    id: 'anicia',
    name: 'Anicia Calalang',
    relation: 'Great Aunt',
    generation: 4,
    photoUrl: '/anicia.jpg',
    birthyear: '',
    shortBio: '',
  },
  {
    id: 'linda',
    name: 'Linda Calalang',
    relation: 'Great Aunt',
    generation: 4,
    photoUrl: '/linda.jpg',
    birthyear: '',
    shortBio: '',
  },
  {
    id: 'tricing',
    name: 'Tricing Calalang',
    relation: 'Great Aunt',
    generation: 4,
    photoUrl: '/tricing.jpg',
    birthyear: '',
    shortBio: '',
  },
  {
    id: 'corazon',
    name: 'Corazon Calalang',
    relation: 'Great Aunt',
    generation: 4,
    photoUrl: '/corazon.jpg',
    birthyear: '',
    shortBio: '',
  },
  {
    id: 'erming',
    name: 'Erming Calalang',
    relation: 'Great Uncle',
    generation: 4,
    photoUrl: '/erming.jpg',
    birthyear: '',
    shortBio: '',
  },
  {
    id: 'juanito',
    name: 'Juanito Calalang',
    relation: 'Great Uncle',
    generation: 4,
    photoUrl: '/juanito.jpg',
    birthyear: '',
    shortBio: '',
  }
];
