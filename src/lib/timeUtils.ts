/** "09:30" → 570 */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** 570 → "09:30" */
export function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Build a [09,10,11,...] hour list based on opening/closing hours. */
export function hourLabels(openHour = 8, closeHour = 22): number[] {
  const labels: number[] = [];
  for (let h = openHour; h <= closeHour; h++) labels.push(h);
  return labels;
}

export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 22;
export const SPAN_MINUTES = (CLOSE_HOUR - OPEN_HOUR) * 60;
export const SPAN_START = OPEN_HOUR * 60;

/** Map minutes-in-day → % position within the visible 08:00–22:00 span. */
export function pctOfSpan(mins: number): number {
  return ((mins - SPAN_START) / SPAN_MINUTES) * 100;
}
