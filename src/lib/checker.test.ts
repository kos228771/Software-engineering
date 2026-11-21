import { describe, it, expect } from 'vitest';
import { checkAvailability } from './checker';
import type { Booking, Room } from './types';

const room: Room = { id: 'r1', name: '101', building: 'North Hall', capacity: 30, blocked: false };
const blockedRoom: Room = { ...room, id: 'r3', name: '201', blocked: true };

const bookings: Booking[] = [
  { id: 'b1', roomId: 'r1', start: 9 * 60, end: 10 * 60, purpose: 'Intro to CS', bookedBy: 'Prof. Chen' },
  { id: 'b2', roomId: 'r1', start: 14 * 60, end: 15 * 60, purpose: 'Faculty Mtg', bookedBy: 'Dr. Rao' },
];

const NOW = 9 * 60;

describe('checkAvailability', () => {
  it('AC1: rejects times outside the day', () => {
    const d = checkAvailability({ room, start: 10 * 60, end: 25 * 60, currentMinutes: NOW, bookings });
    expect(d.kind).toBe('unavailable');
    expect(d.kind === 'unavailable' && d.reasons.join(' ')).toContain('between 00:00 and 24:00');
  });

  it('AC1: rejects start not earlier than end', () => {
    const d = checkAvailability({ room, start: 11 * 60, end: 11 * 60, currentMinutes: NOW, bookings });
    expect(d.kind === 'unavailable' && d.reasons.join(' ')).toContain('earlier than end time');
  });

  it('AC1: rejects a start before the current time', () => {
    const d = checkAvailability({ room, start: 8 * 60, end: 10 * 60, currentMinutes: NOW, bookings });
    expect(d.kind === 'unavailable' && d.reasons.join(' ')).toContain('must be after the current time (09:00)');
  });

  it('AC1: rejects a start exactly at the current time', () => {
    const d = checkAvailability({ room, start: NOW, end: 10 * 60, currentMinutes: NOW, bookings: [] });
    expect(d.kind === 'unavailable' && d.reasons.join(' ')).toContain('must be after the current time (09:00)');
  });

  it('AC2: rejects a duration over 120 minutes', () => {
    const d = checkAvailability({ room, start: 10 * 60, end: 12 * 60 + 30, currentMinutes: NOW, bookings });
    expect(d.kind === 'unavailable' && d.reasons.join(' ')).toContain('150 min');
  });

  it('AC2: accepts exactly 120 minutes', () => {
    const d = checkAvailability({ room, start: 10 * 60, end: 12 * 60, currentMinutes: NOW, bookings });
    expect(d).toEqual({ kind: 'available' });
  });

  it('AC3: rejects a blocked room', () => {
    const d = checkAvailability({ room: blockedRoom, start: 10 * 60, end: 11 * 60, currentMinutes: NOW, bookings: [] });
    expect(d.kind === 'unavailable' && d.reasons.join(' ')).toContain('blocked for maintenance');
  });

  it('AC4: rejects a slot overlapping an existing booking', () => {
    const d = checkAvailability({ room, start: 9 * 60 + 30, end: 10 * 60 + 30, currentMinutes: NOW, bookings });
    expect(d.kind === 'unavailable' && d.reasons.join(' ')).toContain('"Intro to CS"');
  });

  it('AC4: allows a slot that touches an existing booking endpoint', () => {
    const d = checkAvailability({ room, start: 10 * 60, end: 11 * 60, currentMinutes: NOW, bookings });
    expect(d).toEqual({ kind: 'available' });
  });

  it('AC5: returns a pure decision and never mutates the bookings array', () => {
    const input = structuredClone(bookings);
    checkAvailability({ room, start: 9 * 60 + 30, end: 10 * 60 + 30, currentMinutes: NOW, bookings });
    expect(bookings).toEqual(input);
  });
});
