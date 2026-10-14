/**
 * The score: one sheet of music (a page of 2 systems x 2 measures) resting above
 * a 52-key keyboard, seen from the top. All numbers are world units; the camera
 * (context.tsx) pans and zooms over this plane.
 *
 * Reading order is the journey: About -> Projects (along the first system), then
 * the carriage return, down and back to the left, Experience -> Contact.
 */

export const MEASURE = { w: 800, h: 440 };
export const SYSTEM_GAP = 100;
export const SHEET = { w: MEASURE.w * 2, h: MEASURE.h * 2 + SYSTEM_GAP };
export const PAGE = { x: -60, y: -110, w: SHEET.w + 120, h: SHEET.h + 110 + 60 };

/** staff geometry inside a measure */
export const STAFF = { top: 110, gap: 55 };

/** measures in journey order: [col, row] on the page */
export const MEASURES = [
  { id: "about", col: 0, row: 0 },
  { id: "projects", col: 1, row: 0 },
  { id: "experience", col: 0, row: 1 },
  { id: "contact", col: 1, row: 1 },
] as const;

export const measureRect = (i: number) => {
  const m = MEASURES[i];
  return {
    x: m.col * MEASURE.w,
    y: m.row * (MEASURE.h + SYSTEM_GAP),
    w: MEASURE.w,
    h: MEASURE.h,
  };
};

/** keyboard: A0..C8, the real 52 white keys */
export const KEY = { w: 72, wHeight: 440, bw: 44, bHeight: 250, y: PAGE.y + PAGE.h + 40 };
const WHITE_COUNT = 52;
export const KEYBOARD_X = SHEET.w / 2 - (WHITE_COUNT * KEY.w) / 2;
/** the screen's bottom edge sits here at home, so the far ends of the keys run off the screen */
export const HOME_BOTTOM = KEY.y + 230;

const WHITE_PCS = [0, 2, 4, 5, 7, 9, 11];

export type PianoKey = { midi: number; black: boolean; x: number; w: number; h: number };

export const buildKeys = (): PianoKey[] => {
  const whites: PianoKey[] = [];
  const blacks: PianoKey[] = [];
  let wi = 0;
  for (let midi = 21; midi <= 108; midi++) {
    if (WHITE_PCS.includes(midi % 12)) {
      whites.push({ midi, black: false, x: KEYBOARD_X + wi * KEY.w, w: KEY.w, h: KEY.wHeight });
      wi++;
    } else {
      // a sharp straddles the seam between the white key before it and the next
      blacks.push({ midi, black: true, x: KEYBOARD_X + wi * KEY.w - KEY.bw / 2, w: KEY.bw, h: KEY.bHeight });
    }
  }
  return [...whites, ...blacks];
};

/** What the camera looks at: world point under the screen centre, and zoom. */
export type Cam = { x: number; y: number; s: number };

/** Home: the whole page and the keys, with room above for the title block. */
export const homeCam = (vw: number, vh: number): Cam => {
  const top = Math.min(292, vh * 0.36);
  const s = Math.min((vw * 0.95) / (PAGE.w + 40), (vh - top) / (HOME_BOTTOM - PAGE.y));
  return { x: SHEET.w / 2, y: HOME_BOTTOM - vh / 2 / s, s };
};

/** Inside a measure: it fills the width, and the next one peeks in at the edge. */
export const measureCam = (i: number, vw: number, vh: number): Cam => {
  const r = measureRect(i);
  return { x: r.x + r.w / 2, y: r.y + r.h / 2, s: Math.max(vw / 860, vh / 620) };
};

/** Camera for journey stop `i` (0 = home, 1.. = measures). */
export const camFor = (i: number, vw: number, vh: number): Cam =>
  i === 0 ? homeCam(vw, vh) : measureCam(i - 1, vw, vh);

/**
 * The zoom to pass through while travelling between two measures: far enough
 * out to see both of them, so the move reads as a pan across the page.
 */
export const dipScale = (from: number, to: number, vw: number, vh: number) => {
  const a = measureRect(from - 1);
  const b = measureRect(to - 1);
  const w = Math.max(a.x + a.w, b.x + b.w) - Math.min(a.x, b.x);
  const h = Math.max(a.y + a.h, b.y + b.h) - Math.min(a.y, b.y);
  return Math.min(vw / (w + 260), vh / (h + 260));
};

/** a measure's notes: step 0 = bottom staff line, each step is half a gap */
export const MELODIES: { beat: number; step: number; eighth?: boolean }[][] = [
  [{ beat: 0.2, step: 2 }, { beat: 0.38, step: 4 }, { beat: 0.56, step: 6 }, { beat: 0.74, step: 5 }],
  [{ beat: 0.18, step: 4 }, { beat: 0.34, step: 6, eighth: true }, { beat: 0.46, step: 7, eighth: true }, { beat: 0.64, step: 5 }, { beat: 0.82, step: 3 }],
  [{ beat: 0.2, step: 6 }, { beat: 0.4, step: 4 }, { beat: 0.58, step: 2, eighth: true }, { beat: 0.7, step: 3, eighth: true }, { beat: 0.86, step: 1 }],
  [{ beat: 0.18, step: 3 }, { beat: 0.36, step: 5 }, { beat: 0.54, step: 7 }, { beat: 0.72, step: 8 }],
];

export const TEMPO = ["Andante", "Allegro", "Maestoso", "Dolce"];
