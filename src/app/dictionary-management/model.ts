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
  size: number;
  fortification: number;
  nationId: number;
}

export interface Population {
  id: number;
  socialGroupId?: number;
  cultureId?: number;
  religionId?: number;
  locationId?: number;
  happiness: number;
}

