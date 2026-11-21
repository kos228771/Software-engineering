import { useMemo } from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import type { Room, Booking, Decision } from '@/lib/types';
import { MAX_DURATION } from '@/lib/types';
import { checkAvailability } from '@/lib/checker';
import { minutesToTime, timeToMinutes } from '@/lib/timeUtils';

interface Props {
  rooms: Room[];
  bookings: Booking[];
  selectedRoomId: string;
  startStr: string;
  endStr: string;
  currentMinutes: number;
  onClear: () => void;
}

export default function AvailabilityChecker({
  rooms,
  bookings,
  selectedRoomId,
  startStr,
  endStr,
  currentMinutes,
  onClear,
}: Props) {
  const room = rooms.find((r) => r.id === selectedRoomId) ?? null;
  const start = startStr ? timeToMinutes(startStr) : NaN;
  const end = endStr ? timeToMinutes(endStr) : NaN;

  const decision: Decision | null = useMemo(() => {
    if (!room) return null;
    if (Number.isNaN(start) || Number.isNaN(end)) return null;
    return checkAvailability({ room, start, end, currentMinutes, bookings });
  }, [room, start, end, currentMinutes, bookings]);

  const duration = !Number.isNaN(start) && !Number.isNaN(end) ? end - start : 0;

  return (
    <div className="space-y-4">
      {/* summary stats */}
      <div className="grid grid-cols-2 gap-2">
        <Stat
          label="Duration"
          value={duration > 0 ? `${duration} min` : '—'}
          warn={duration > MAX_DURATION}
        />
        <Stat
          label="Time window"
          value={!Number.isNaN(start) && !Number.isNaN(end)
            ? `${minutesToTime(start)}–${minutesToTime(end)}`
            : '—'}
        />
      </div>

      {/* decision card */}
      {decision ? (
        decision.kind === 'available' ? (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
            <div>
              <h3 className="text-base font-bold text-emerald-800">Available</h3>
              <p className="text-sm text-emerald-700">
                Room {room!.name} is free from {minutesToTime(start)} to {minutesToTime(end)}. No existing bookings conflict with this time slot.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-rose-600" />
              <div>
                <h3 className="text-base font-bold text-rose-800">Unavailable</h3>
                <p className="text-sm text-rose-700">
                  This room can't be booked for the selected time. Here's why:
                </p>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {decision.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-rose-700">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Select a room and choose a start and end time above to see if it's available.
        </div>
      )}

      {decision && (
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          Clear selection
        </button>
      )}
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${warn ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`text-sm font-semibold ${warn ? 'text-amber-700' : 'text-slate-800'}`}>{value}</div>
    </div>
  );
}

