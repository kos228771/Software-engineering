import type { Room, Booking, Decision } from './types';
import { DAY_MINUTES, MAX_DURATION } from './types';
import { minutesToTime } from './timeUtils';

export interface CheckParams {
  room: Room | null;
  start: number; // minutes from 00:00
  end: number; // minutes from 00:00
  currentMinutes: number; // minutes from 00:00 — the "now" value
  bookings: Booking[];
}

/**
 * Core availability logic.
 * Pure function — never mutates `bookings`.
 */
export function checkAvailability({
  room,
  start,
  end,
  currentMinutes,
  bookings,
}: CheckParams): Decision {
  const reasons: string[] = [];

  // AC1 — validate time range and require a start strictly after current time
  if (start < 0 || end > DAY_MINUTES) {
    reasons.push('Times must be between 00:00 and 24:00. Please choose a time within that range.');
  } else if (start >= end) {
    reasons.push('Start time must be earlier than end time. Please pick a start time that comes before the end time.');
  } else if (start <= currentMinutes) {
    reasons.push(`Start time must be after the current time (${minutesToTime(currentMinutes)}). You cannot book a slot that has already begun.`);
  }

  // AC2 — duration cap
  const duration = end - start;
  if (duration > MAX_DURATION) {
    reasons.push(`The selected duration is ${duration} min, which exceeds the ${MAX_DURATION}-min maximum. Please shorten the booking.`);
  }

  // AC3 — blocked room
  if (room?.blocked) {
    reasons.push(`Room ${room.name} is currently blocked for maintenance and cannot be booked. Please choose a different room.`);
  }

  // AC4 — overlap check (touching endpoints allowed)
  if (room && start < end && start >= 0 && end <= DAY_MINUTES) {
    const overlapping = bookings.filter(
      (b) =>
        b.roomId === room.id &&
        b.start < end &&
        start < b.end,
    );
    for (const b of overlapping) {
      reasons.push(
        `This slot overlaps with "${b.purpose}" booked by ${b.bookedBy} from ${minutesToTime(b.start)} to ${minutesToTime(b.end)}. Pick a time that ends before or starts after that booking.`,
      );
    }
  }

  // AC5 — pure decision, no mutation
  return reasons.length === 0
    ? { kind: 'available' }
    : { kind: 'unavailable', reasons };
}
