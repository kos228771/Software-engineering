import { useMemo, useState } from 'react';
import { CalendarCheck, Clock, MapPin } from 'lucide-react';
import DayTimeline from '@/components/DayTimeline';
import RoomSchedule from '@/components/RoomSchedule';
import AvailabilityChecker from '@/components/AvailabilityChecker';
import { rooms, sampleBookings } from '@/lib/sampleData';
import { minutesToTime, timeToMinutes, OPEN_HOUR, CLOSE_HOUR } from '@/lib/timeUtils';

function App() {
  const [bookings] = useState(sampleBookings);
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
  const [startStr, setStartStr] = useState('10:00');
  const [endStr, setEndStr] = useState('11:00');
  const [currentStr, setCurrentStr] = useState('09:00');

  const currentMinutes = timeToMinutes(currentStr);

  const query = useMemo(
    () => ({
      start: timeToMinutes(startStr),
      end: timeToMinutes(endStr),
    }),
    [startStr, endStr],
  );

  // time input options
  const timeOptions = useMemo(() => {
    const opts: string[] = [];
    for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
      opts.push(`${String(h).padStart(2, '0')}:00`);
      if (h < CLOSE_HOUR) opts.push(`${String(h).padStart(2, '0')}:30`);
    }
    return opts;
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Smart Campus Room Availability Checker
              </h1>
              <p className="text-xs text-slate-500 sm:text-sm">
                Check if a lecture hall or classroom is free before you book it.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left — schedule visual */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-sky-600" />
                Today's Schedule · North Hall
              </h2>
              <label className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                Current time
                <input
                  type="time"
                  value={currentStr}
                  onChange={(e) => setCurrentStr(e.target.value || currentStr)}
                  className="rounded-md border border-slate-300 px-1.5 py-0.5 text-xs text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </label>
            </div>

            {/* timeline ruler */}
            <div className="mb-1 pl-[5.5rem] sm:pl-[7.5rem]">
              <DayTimeline currentMinutes={currentMinutes} />
            </div>

            {/* room rows */}
            <RoomSchedule
              rooms={rooms}
              bookings={bookings}
              selectedRoomId={selectedRoomId}
              query={query}
              currentMinutes={currentMinutes}
              onSelectRoom={setSelectedRoomId}
            />

            {/* legend */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded bg-sky-300/60 border border-dashed border-sky-600" />
                Your selection
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-px bg-rose-500" />
                Current time
              </span>
              <span>Touching endpoints are allowed</span>
            </div>
          </section>

          {/* Right — form + result */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-1 text-sm font-semibold text-slate-700">Check a room slot</h2>
              <p className="mb-3 text-xs text-slate-400">Pick a room and choose a start and end time. We'll tell you if it's free.</p>

              {/* room select */}
              <label className="mb-3 block">
                <span className="mb-1 block text-xs font-medium text-slate-500">Which room do you need?</span>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      Rm {r.name} · {r.building} · cap {r.capacity}
                      {r.blocked ? ' · (Blocked)' : ''}
                    </option>
                  ))}
                </select>
              </label>

              {/* start / end */}
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">Start time</span>
                  <select
                    value={startStr}
                    onChange={(e) => setStartStr(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">End time</span>
                  <select
                    value={endStr}
                    onChange={(e) => setEndStr(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

              <p className="mt-2 text-[11px] text-slate-400">
                Up to 120 min per booking · times between 08:00 and 22:00 · start must be after the current time ({minutesToTime(currentMinutes)}).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <AvailabilityChecker
                rooms={rooms}
                bookings={bookings}
                selectedRoomId={selectedRoomId}
                startStr={startStr}
                endStr={endStr}
                currentMinutes={currentMinutes}
                onClear={() => {
                  setStartStr('10:00');
                  setEndStr('11:00');
                  setSelectedRoomId(rooms[0].id);
                }}
              />
            </div>
          </section>
        </div>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Fictional sample data · No real bookings are created or modified.
        </footer>
      </main>
    </div>
  );
}

export default App;
