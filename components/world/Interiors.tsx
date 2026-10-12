import { Bird, Fish, Leaf } from "./art";

/**
 * The two "rooms" you enter on the way down: a submarine in the ocean, a hollow
 * in the trunk in the forest. Fully opaque and purely decorative; the content
 * sits above them. Windows are small clipped scenes of their own, so there is
 * no masking and no blur anywhere.
 */

const Window = ({
  className,
  size,
  children,
  glass,
}: {
  className: string;
  size: string;
  children: React.ReactNode;
  glass: string;
}) => (
  <div className={`absolute ${className}`} style={{ width: size, height: size }}>
    <div className="bezel absolute inset-0 rounded-full" />
    <div
      className="absolute overflow-hidden rounded-full"
      style={{ inset: "7%", background: glass, boxShadow: "inset 0 0 40px 6px rgba(0,0,0,0.45)" }}
    >
      {children}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 32%)" }}
      />
    </div>
  </div>
);

export const SubInterior = () => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{ background: "linear-gradient(180deg,#1a2c3e 0%,#22394e 52%,#152537 100%)" }}
  >
    {/* riveted panel seams */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: [
          "linear-gradient(90deg, rgba(0,0,0,0.32) 0 2px, rgba(255,255,255,0.07) 2px 4px, transparent 4px)",
          "linear-gradient(0deg, rgba(0,0,0,0.3) 0 2px, rgba(255,255,255,0.07) 2px 4px, transparent 4px)",
          "radial-gradient(circle, rgba(255,255,255,0.22) 2px, transparent 2.6px)",
        ].join(","),
        backgroundSize: "24vw 100%, 100% 30vh, 24vw 30vh",
        backgroundPosition: "0 0, 0 0, 14px 14px",
      }}
    />
    {/* ceiling pipes */}
    <div
      className="absolute inset-x-0 top-0 h-[9vh]"
      style={{
        background:
          "linear-gradient(180deg,#0e1b29 0%,#2d4a63 18%,#587a96 30%,#2a4258 44%,#0e1b29 100%)",
      }}
    />
    <div
      className="absolute inset-x-0 top-[9vh] h-[1.2vh]"
      style={{ background: "repeating-linear-gradient(90deg,#f5b53d 0 5vw,#14202d 5vw 10vw)" }}
    />
    {/* floor grating */}
    <div
      className="absolute inset-x-0 bottom-0 h-[10vh]"
      style={{
        background:
          "repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0 2px, transparent 2px 14px), linear-gradient(180deg,#0f1c2a,#070f18)",
      }}
    />

    <Window
      className="left-[3%] top-[16%] sm:left-[5%]"
      size="min(32vh, 27vw)"
      glass="radial-gradient(circle at 40% 28%, #2aa4cf 0%, #0a4f79 55%, #031f36 100%)"
    >
      <div className="a-swim absolute left-0 top-[42%] w-[44%]" style={{ ["--dur" as string]: "16s", ["--dist" as string]: "260%" }}>
        <Fish color="#7dd3fc" fin="#38bdf8" />
      </div>
      <div className="a-ray absolute left-[30%] top-0 h-full w-[24%]" style={{ background: "linear-gradient(180deg, rgba(190,240,255,0.3), transparent)" }} />
    </Window>
    <Window
      className="right-[3%] top-[22%] hidden sm:block sm:right-[6%]"
      size="min(28vh, 26vw)"
      glass="radial-gradient(circle at 60% 30%, #1d8fba 0%, #08466e 55%, #031f36 100%)"
    >
      <div className="a-swim absolute right-0 top-[55%] w-[40%]" style={{ ["--dur" as string]: "20s", ["--dist" as string]: "-260%", ["--delay" as string]: "-6s" }}>
        <Fish color="#fde68a" fin="#f59e0b" style={{ transform: "scaleX(-1)" }} />
      </div>
    </Window>

    {/* status lights */}
    <div className="absolute right-[6%] top-[11.5vh] flex gap-2">
      {["#34d399", "#f5b53d", "#38bdf8"].map((c, i) => (
        <span key={c} className="a-blink h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}`, ["--delay" as string]: `${i * 0.5}s` }} />
      ))}
    </div>
  </div>
);

export const TrunkInterior = () => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{ background: "linear-gradient(180deg,#efdcb4 0%,#e3c995 55%,#d3b57d 100%)" }}
  >
    {/* planks and grain */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: [
          "linear-gradient(90deg, rgba(110,70,30,0.22) 0 2px, rgba(255,245,220,0.35) 2px 3px, transparent 3px)",
          "repeating-linear-gradient(0deg, rgba(120,80,40,0.05) 0 3px, transparent 3px 9px)",
        ].join(","),
        backgroundSize: "15vw 100%, 100% 100%",
      }}
    />
    {/* growth rings, growing out of the corner */}
    <div
      className="absolute -bottom-[40vh] -right-[20vw] h-[90vh] w-[90vh] rounded-full opacity-40"
      style={{
        background:
          "repeating-radial-gradient(circle at 50% 50%, rgba(130,85,40,0.35) 0 3px, transparent 3px 22px)",
      }}
    />
    {/* beams */}
    <div
      className="absolute inset-x-0 top-0 h-[9vh]"
      style={{ background: "linear-gradient(180deg,#5b3a1c 0%,#8a5e33 45%,#6b4524 100%)" }}
    />
    {/* floor: dark wood with moss */}
    <div
      className="absolute inset-x-0 bottom-0 h-[10vh]"
      style={{ background: "linear-gradient(180deg,#5aa05a 0 18%,#6b4524 18% 100%)" }}
    />

    <Window
      className="left-[3%] top-[16%] sm:left-[5%]"
      size="min(36vh, 34vw)"
      glass="linear-gradient(180deg,#bfe6f7 0%,#d7efc9 60%,#8fcf8a 100%)"
    >
      <Leaf className="a-sway absolute -right-[6%] top-[8%] w-[34%]" color="#3f9456" style={{ ["--dur" as string]: "5s" }} />
      <Leaf className="a-sway absolute -left-[8%] bottom-[6%] w-[40%] rotate-45" color="#58ad62" style={{ ["--dur" as string]: "6s" }} />
      <div className="a-swim absolute left-0 top-[30%] w-[22%]" style={{ ["--dur" as string]: "14s", ["--dist" as string]: "460%" }}>
        <Bird color="#2a3b1f" />
      </div>
    </Window>
    <Window
      className="right-[3%] top-[22%] hidden sm:block sm:right-[6%]"
      size="min(28vh, 26vw)"
      glass="linear-gradient(180deg,#cdeaf5 0%,#e4f3d2 55%,#9bd493 100%)"
    >
      <Leaf className="a-sway absolute left-[10%] top-[18%] w-[30%] -rotate-12" color="#4ea05f" style={{ ["--dur" as string]: "7s" }} />
    </Window>

    {/* hanging lanterns */}
    {[18, 52, 84].map((l, i) => (
      <div key={l} className="a-swing absolute top-[9vh]" style={{ left: `${l}%`, ["--dur" as string]: `${6 + i}s`, ["--delay" as string]: `${-i * 2}s` }}>
        <div className="mx-auto h-[5vh] w-px bg-[#5b3a1c]" />
        <div className="mx-auto h-5 w-4 rounded-md" style={{ background: "radial-gradient(circle,#fff6c9,#f5c451)", boxShadow: "0 0 22px 8px rgba(255,214,120,0.55)" }} />
      </div>
    ))}
  </div>
);
