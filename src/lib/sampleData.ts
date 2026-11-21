import type { Room, Booking } from './types';

export const rooms: Room[] = [
  { id: 'r1', name: '101', building: 'North Hall', capacity: 30, blocked: false },
  { id: 'r2', name: '102', building: 'North Hall', capacity: 24, blocked: false },
  { id: 'r3', name: '201', building: 'North Hall', capacity: 45, blocked: true },
  { id: 'r4', name: '104', building: 'North Hall', capacity: 18, blocked: false },
];

export const sampleBookings: Booking[] = [
  { id: 'b1', roomId: 'r1', start: 9 * 60,  end: 10 * 60, purpose: 'Intro to CS', bookedBy: 'Prof. Chen' },
  { id: 'b2', roomId: 'r1', start: 14 * 60, end: 15 * 60, purpose: 'Faculty Mtg',  bookedBy: 'Dr. Rao' },
  { id: 'b3', roomId: 'r2', start: 11 * 60, end: 12 * 60 + 30, purpose: 'Workshop',  bookedBy: 'TA Kim' },
  { id: 'b4', roomId: 'r4', start: 9 * 60 + 30, end: 11 * 60, purpose: 'Study Group', bookedBy: 'Club Alpha' },
];
