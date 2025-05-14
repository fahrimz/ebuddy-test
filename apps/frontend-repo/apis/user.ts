export interface User {
  id: string;
  name: string;
  email: string;
  totalAverageWeightRatings: number; // e.g. 4.3
  numberOfRents: number; // e.g. 30
  recentlyActive: number; // epoch time, e.g. 1738938812
}