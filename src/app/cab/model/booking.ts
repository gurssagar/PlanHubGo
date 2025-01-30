import { CabCardDetails } from "./cabcard-details";
export interface Booking {
  cab: CabCardDetails;
  user: { 
    name: string;
    email: string
   };
   timestamp: number; 
}
