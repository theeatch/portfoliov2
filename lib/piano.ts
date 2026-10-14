/**
 * A tiny synthesised piano: no samples to download. A triangle and a quiet
 * octave sine through a filter that closes as the note decays, which is most of
 * what makes a plucked / struck tone read as a piano.
 *
 * The AudioContext is created on the first press, which is always a user gesture.
 */

type Win = Window & { webkitAudioContext?: typeof AudioContext };

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

const boot = () => {
  if (ctx) return ctx;
  const AC = window.AudioContext || (window as Win).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  const comp = ctx.createDynamicsCompressor();
  master = ctx.createGain();
  master.gain.value = 0.7;
  master.connect(comp).connect(ctx.destination);
  return ctx;
};

export const playNote = (midi: number, velocity = 0.7) => {
  const c = boot();
  if (!c || !master) return;
  if (c.state === "suspended") c.resume();

  const f = 440 * 2 ** ((midi - 69) / 12);
  const t = c.currentTime;
  // lower notes ring longer
  const dur = 1.1 + Math.max(0, (72 - midi) / 24);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(Math.min(8000, f * 7), t);
  filter.frequency.exponentialRampToValueAtTime(Math.max(300, f * 1.5), t + dur);

  const env = c.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.32 * velocity, t + 0.006);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  const a = c.createOscillator();
  a.type = "triangle";
  a.frequency.value = f;
  const b = c.createOscillator();
  b.type = "sine";
  b.frequency.value = f * 2;
  const bg = c.createGain();
  bg.gain.value = 0.28;

  a.connect(filter);
  b.connect(bg).connect(filter);
  filter.connect(env).connect(master);

  a.start(t);
  b.start(t);
  a.stop(t + dur + 0.05);
  b.stop(t + dur + 0.05);
};
