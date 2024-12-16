
export interface Nation {
    id?: number; // Optional as Id can be null
    name: string;
    religionId: number;
    cultureId: number;
  }
  
  // OwnedResource Model
  export interface OwnedResource {
    id?: number; // Optional as Id can be null
    resourceId: number;
    nationId: number;
    amount: number;
  }
  
  // WantedResource Model
  export interface WantedResource {
    id?: number; // Optional as Id can be null
    resourceId: number;
    tradeAgreementId: number;
    amount: number;
  }
  
  // OfferedResource Model
  export interface OfferedResource {
    id?: number; // Optional as Id can be null
    resourceId: number;
    tradeAgreementId: number;
    quantity: number;
  }
  
  // TradeAgreement Model
  export interface TradeAgreement {
    id?: number; // Optional as Id can be null
    oferingNationId: number;
    receivingNationId: number;
    isAccepted: boolean;
    duration: number;
  }
  