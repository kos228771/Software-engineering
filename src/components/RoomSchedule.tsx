import { Lock, Users } from 'lucide-react';
import type { Room, Booking } from '@/lib/types';
import { pctOfSpan, minutesToTime, SPAN_START, CLOSE_HOUR } from '@/lib/timeUtils';

interface Props {
  rooms: Room[];
  bookings: Booking[];
  selectedRoomId: string | null;
  query: { start: number; end: number } | null;
  currentMinutes: number;
  onSelectRoom: (id: string) => void;
}

const ROOM_COLORS: Record<string, string> = {
  r1: 'bg-sky-500',
  r2: 'bg-emerald-500',
  r3: 'bg-slate-400',
  r4: 'bg-amber-500',
};

export default function RoomSchedule({
  rooms,
  bookings,
  selectedRoomId,
  query,
  currentMinutes,
  onSelectRoom,
}: Props) {
  return (
    <div className="space-y-1.5">
      {rooms.map((room) => {
        const roomBookings = bookings.filter((b) => b.roomId === room.id);
        const isSelected = room.id === selectedRoomId;

        const nowWithinSpan =
          currentMinutes >= SPAN_START && currentMinutes <= CLOSE_HOUR * 60;

        return (
          <div
            key={room.id}
            className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors sm:gap-3 ${
              isSelected ? 'bg-sky-50 ring-1 ring-sky-300' : 'hover:bg-slate-50'
            }`}
          >
            {/* label */}
            <button
              type="button"
              onClick={() => onSelectRoom(room.id)}
              className="w-20 shrink-0 text-left sm:w-28"
            >
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-800">
                {room.blocked && <Lock className="h-3 w-3 shrink-0 text-rose-500" />}
                Rm {room.name}
              </div>
              <div className="flex items-center gap-0.5 text-[11px] text-slate-400">
                <Users className="h-2.5 w-2.5" />
                {room.capacity}
              </div>
            </button>

            {/* track */}
            <div className="relative h-9 flex-1 overflow-hidden rounded-md bg-slate-100 ring-1 ring-inset ring-slate-200">
              {/* grid lines */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="flex-1 border-l border-slate-200/70" />
                ))}
              </div>

              {/* now line */}
              {nowWithinSpan && (
                <div
                  className="absolute top-0 z-10 h-full w-px bg-rose-500/70"
                  style={{ left: `${pctOfSpan(currentMinutes)}%` }}
                />
              )}

              {/* existing bookings */}
              {roomBookings.map((b) => {
                const within = b.end > SPAN_START && b.start < CLOSE_HOUR * 60;
                if (!within) return null;
                const clampedStart = Math.max(b.start, SPAN_START);
                const clampedEnd = Math.min(b.end, CLOSE_HOUR * 60);
                return (
                  <div
                    key={b.id}
                    className={`absolute top-1 z-[5] flex h-7 items-center overflow-hidden rounded px-1.5 text-[10px] font-medium text-white shadow-sm ${
                      ROOM_COLORS[room.id] ?? 'bg-slate-500'
                    }`}
                    style={{
                      left: `${pctOfSpan(clampedStart)}%`,
                      width: `${pctOfSpan(clampedEnd) - pctOfSpan(clampedStart)}%`,
                    }}
                    title={`${b.purpose} · ${minutesToTime(b.start)}–${minutesToTime(b.end)} · ${b.bookedBy}`}
                  >
                    <span className="truncate">{b.purpose}</span>
                  </div>
                );
              })}

              {/* query preview */}
              {query && isSelected && query.start < query.end && (
                <QueryBar start={query.start} end={query.end} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QueryBar({ start, end }: { start: number; end: number }) {
  const within = end > SPAN_START && start < CLOSE_HOUR * 60;
  if (!within) return null;
  const clampedStart = Math.max(start, SPAN_START);
  const clampedEnd = Math.min(end, CLOSE_HOUR * 60);
  return (
    <div
      className="absolute bottom-0.5 z-[8] flex h-2.5 items-center rounded border border-dashed border-sky-600 bg-sky-300/40"
      style={{
        left: `${pctOfSpan(clampedStart)}%`,
        width: `${pctOfSpan(clampedEnd) - pctOfSpan(clampedStart)}%`,
      }}
    >
      <span className="sr-only">Your selection</span>
    </div>
  );
}
