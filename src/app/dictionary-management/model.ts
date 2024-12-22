// models.ts

export interface Resource {
    id: number;
    name: string;
    isMain: boolean;
  }
  
export interface Culture {
    id:  number;
    name: string;
  }
  
export interface Religion {
    id:  number;
    name: string;
  }
  
export interface Group {
    id:  number;
    name: string;
    baseSatisfaction: number;
    recruitmentSize: number;
  }
  