export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  start: number; // minutes from 00:00
  end: number; // minutes from 00:00
  purpose: string;
  bookedBy: string;
}

export type Decision =
  | { kind: 'available' }
  | { kind: 'unavailable'; reasons: string[] };

export const DAY_MINUTES = 1440;
export const MAX_DURATION = 120;
