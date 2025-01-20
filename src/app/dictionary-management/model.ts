// models.ts

export interface Resource {
  id: number;
  name: string;
  isMain: boolean;
}

export interface Culture {
  id: number;
  name: string;
}

export interface Religion {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  baseSatisfaction: number;
  recruitmentSize: number;
}

export interface Localisation {
  id: number;
  name: string;
}

export interface Population {
  id: number;
  socialGroup?: Group;
  culture?: Culture;
  religion?: Religion;
  localisation?: Localisation;
  satisfaction: number;
  count: number;
}

export const cultures: Culture[] = [
  { id: 1, name: "Western" },
  { id: 2, name: "Eastern" },
  { id: 3, name: "Nomadic" }
];

export const groups: Group[] = [
  { id: 1, name: "Farmers", baseSatisfaction: 70, recruitmentSize: 50 },
  { id: 2, name: "Soldiers", baseSatisfaction: 60, recruitmentSize: 30 },
  { id: 3, name: "Nobles", baseSatisfaction: 80, recruitmentSize: 10 }
];

export const religions: Religion[] = [
  { id: 1, name: "Christianity" },
  { id: 2, name: "Islam" },
  { id: 3, name: "Buddhism" }
];

export const localisations: Localisation[] = [
  { id: 1, name: "Northern Province" },
  { id: 2, name: "Southern Province" },
  { id: 3, name: "Eastern Province" }
];

export const populations: Population[] = [
  {
    id: 1,
    socialGroup: groups[0],
    culture: cultures[0],
    religion: religions[0],
    localisation: localisations[0],
    satisfaction: 75,
    count: 1000
  },
  {
    id: 2,
    socialGroup: groups[1],
    culture: cultures[1],
    religion: religions[1],
    localisation: localisations[1],
    satisfaction: 60,
    count: 500
  },
  {
    id: 3,
    socialGroup: groups[2],
    culture: cultures[2],
    religion: religions[2],
    localisation: localisations[2],
    satisfaction: 85,
    count: 200
  }
];


