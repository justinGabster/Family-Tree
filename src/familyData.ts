export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: 1 | 2 | 3 | 4 | 5;
  photoUrl: string;
  shortBio?: string;
  notableMilestones?: string[];
}

export const familyData: FamilyMember[] = [
  // ==========================================
  // GENERATION 1: The Children / Future
  // ==========================================
  {
    id: 'justin',
    name: 'Justin Gabriel A Jose',
    relation: 'ME',
    generation: 1,
    photoUrl: '/justin.jpg',
    shortBio: 'Eldest son of Cristina and Jeffrey A Jose. Currently a third-year student at the Polytechnic University of the Philippines.'
  },
  {
    id: 'lance',
    name: 'Lance Jeffrey A Jose',
    relation: 'BROTHER',
    generation: 1,
    photoUrl: '/lance.jpg',
    shortBio: 'Second son of Cristina and Jeffrey A Jose. Younger brother of Justin and currently a senior high school student.'
  },

  // ==========================================
  // GENERATION 2: Parents & Direct Aunts/Uncles
  // ==========================================
  {
    id: 'cristina',
    name: 'Cristina Dela Cruz',
    relation: 'Mother',
    generation: 2,
    photoUrl: '/cristina.jpg',
    shortBio: 'The youngest child of Domingo and Flordeliza Dela Cruz. A devoted teacher, wife, and mother to Justin and Lance.'
  },
  {
    id: 'jeffrey',
    name: 'Jeffrey A Jose',
    relation: 'Father',
    generation: 2,
    photoUrl: '/jefrey.jpg',
    shortBio: 'The eldest child of Marcelino and Florida A Jose. A hardworking OFW, husband, and father to Justin and Lance.'
  },
  {
    id: 'janice',
    name: 'Janice A Jose',
    relation: 'Aunt',
    generation: 2,
    photoUrl: '/janice.jpg',
    shortBio: 'Daughter of Marcelino and Florida A Jose. Sister to Jeffrey, Jerome, and Jefferex.'
  },
  {
    id: 'jerome',
    name: 'Jerome A Jose',
    relation: 'Uncle',
    generation: 2,
    photoUrl: '/jerome.jpg',
    shortBio: 'Son of Marcelino and Florida A Jose. Brother to Jeffrey, Janice, and Jefferex.'
  },
  {
    id: 'jefferex',
    name: 'Jefferex A Jose',
    relation: 'Uncle',
    generation: 2,
    photoUrl: '/jefferex.jpg',
    shortBio: 'Son of Marcelino and Florida A Jose. Brother to Jeffrey, Janice, and Jerome.'
  },

  // ==========================================
  // GENERATION 3: Grandparents & Siblings
  // ==========================================
  {
    id: 'flordeliza',
    name: 'Flordeliza Paguia',
    relation: 'Grandmother',
    generation: 3,
    photoUrl: '/flordeliza.jpg',
    shortBio: 'A graceful homemaker and loving grandmother, remembered for her pristine home, warmth, and devotion to her family.'
  },
  {
    id: 'domingo',
    name: 'Domingo Dela Cruz',
    relation: 'Grandfather',
    generation: 3,
    photoUrl: '/domingo.jpg',
    shortBio: 'A retired policeman with a commanding voice and a soft spot for family. Grandfather to Justin and Lance.'
  },
  {
    id: 'marcelino',
    name: 'Marcelino A Jose',
    relation: 'Grandfather',
    generation: 3,
    photoUrl: '/marcelino.jpg',
    shortBio: 'Paternal grandfather, father of Jeffrey, Janice, Jerome, and Jefrex. Grounded the family with strength and guidance.'
  },
  {
    id: 'florida',
    name: 'Florida Calalang',
    relation: 'Grandmother',
    generation: 3,
    photoUrl: '/florida.jpg',
    shortBio: 'Paternal grandmother, wife to Marcelino A Jose and cherished daughter in the Calalang lineage.'
  },
  {
    id: 'filomena',
    name: 'Filomena Calalang',
    relation: 'Grand-Aunt',
    generation: 3,
    photoUrl: '/filomena.jpg',
    shortBio: 'Beloved member of the Calalang family and sister to Florida Calalang.'
  },

  // ==========================================
  // GENERATION 4: Roots & Extended Ancestry
  // ==========================================
  {
    id: 'timoteo',
    name: 'Timoteo Dela Cruz',
    relation: 'Great-Grandfather',
    generation: 4,
    photoUrl: '',
    shortBio: 'A master furniture maker of his era, widely known across Santol as a respected craftsman of sturdy heirlooms and honest values.'
  },
  {
    id: 'maria',
    name: 'Maria Paguia',
    relation: 'Great-Grandmother',
    generation: 4,
    photoUrl: '',
    shortBio: 'The gentle matriarch whose kitchen and prayers anchored the whole household with soft-spoken wisdom and patience.'
  },
  {
    id: 'gloria',
    name: 'Gloria Adornado',
    relation: 'Great-Grandmother',
    generation: 4,
    photoUrl: '',
    shortBio: 'Great-grandmother and matriarch of the extended Calalang lineage.'
  },
  {
    id: 'siblings',
    name: 'Siblings',
    relation: 'Ancestral Lineage',
    generation: 4,
    photoUrl: '',
    shortBio: 'The extended siblings and ancestral roots uniting the Calalang family lineage.'
  },
  {
    id: 'pablo',
    name: 'Pablo Calalang',
    relation: 'Great-Grandfather',
    generation: 4,
    photoUrl: '/pablo.jpg',
    shortBio: 'Patriarch of the Calalang lineage, father to the Calalang siblings.'
  },
  {
    id: 'ely',
    name: 'Ely Calalang',
    relation: 'Great-Uncle',
    generation: 4,
    photoUrl: '/ely.jpg',
    shortBio: 'Son of Pablo and Gloria, cherished member of the Calalang family.'
  },
  {
    id: 'anicia',
    name: 'Anicia Calalang',
    relation: 'Great-Aunt',
    generation: 4,
    photoUrl: '/anicia.jpg',
    shortBio: 'Daughter of Pablo and Gloria Calalang.'
  },
  {
    id: 'linda',
    name: 'Linda Calalang',
    relation: 'Great-Aunt',
    generation: 4,
    photoUrl: '/linda.jpg',
    shortBio: 'Daughter of Pablo and Gloria Calalang.'
  },
  {
    id: 'tricing',
    name: 'Tricing Calalang',
    relation: 'Great-Aunt',
    generation: 4,
    photoUrl: '/tricing.jpg',
    shortBio: 'Daughter of Pablo and Gloria Calalang.'
  },
  {
    id: 'corazon',
    name: 'Corazon Calalang',
    relation: 'Great-Aunt',
    generation: 4,
    photoUrl: '/corazon.jpg',
    shortBio: 'Daughter of Pablo and Gloria Calalang.'
  },
  {
    id: 'rody',
    name: 'Rody Calalang',
    relation: 'Great-Uncle',
    generation: 4,
    photoUrl: '/rody.jpg',
    shortBio: 'Son of Pablo and Gloria Calalang.'
  },
  {
    id: 'erming',
    name: 'Erming Calalang',
    relation: 'Great-Uncle',
    generation: 4,
    photoUrl: '/erming.jpg',
    shortBio: 'Son of Pablo and Gloria Calalang.'
  },
  {
    id: 'juanito',
    name: 'Juanito Calalang',
    relation: 'Great-Uncle',
    generation: 4,
    photoUrl: '/juanito.jpg',
    shortBio: 'Son of Pablo and Gloria Calalang.'
  },

  // ==========================================
  // GENERATION 5: Ancient Roots & Origins
  // ==========================================
  {
    id: 'francisco',
    name: 'Francisco Calalang',
    relation: 'Great-Great-Grandfather',
    generation: 5,
    photoUrl: ''
  },
  {
    id: 'anastacia',
    name: 'Anastacia Cruz',
    relation: 'Great-Great-Grandmother',
    generation: 5,
    photoUrl: ''
  }
];
