import { hourLabels, pctOfSpan, minutesToTime, OPEN_HOUR, CLOSE_HOUR, SPAN_START } from '@/lib/timeUtils';

interface Props {
  currentMinutes: number;
  nowMarker?: boolean;
}

export default function DayTimeline({ currentMinutes, nowMarker = true }: Props) {
  const hours = hourLabels(OPEN_HOUR, CLOSE_HOUR);
  const nowWithinSpan =
    currentMinutes >= SPAN_START && currentMinutes <= CLOSE_HOUR * 60;

  return (
    <div className="relative h-7 select-none">
      <div className="absolute inset-x-0 top-0 flex">
        {hours.slice(0, -1).map((h) => (
          <div
            key={h}
            className="flex-1 border-l border-slate-200 pl-1 text-[10px] leading-4 text-slate-400"
          >
            {String(h).padStart(2, '0')}
          </div>
        ))}
        <div className="border-l border-slate-200 pl-1 text-[10px] leading-4 text-slate-400">
          {CLOSE_HOUR}
        </div>
      </div>
      {/* now marker */}
      {nowMarker && nowWithinSpan && (
        <div
          className="absolute top-0 z-20 flex flex-col items-center"
          style={{ left: `${pctOfSpan(currentMinutes)}%` }}
        >
          <div className="h-7 w-px bg-rose-500" />
          <span className="-mt-0.5 whitespace-nowrap rounded bg-rose-500 px-1 text-[9px] font-semibold leading-tight text-white shadow">
            Now
          </span>
        </div>
      )}
      {/* prevent unused warning for minutesToTime when nowWithinSpan false */}
      {!nowWithinSpan && <span className="hidden">{minutesToTime(currentMinutes)}</span>}
    </div>
  );
}
