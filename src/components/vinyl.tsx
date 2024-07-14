import React, { useState, useRef, useEffect } from "react";

type Props = {};

const Vinyl = (props: Props) => {
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startSpinning = () => {
    setIsSpinning(true);
    clearInterval(intervalRef.current);
    let spinSpeed = 20; // Initial spin speed (lower is faster)
    const spinDecay = 0.99; // Rate at which spin speed decreases
    intervalRef.current = setInterval(() => {
      setAngle((prevAngle) => prevAngle + spinSpeed);
      spinSpeed *= spinDecay; // Slowly decrease spin speed
      if (spinSpeed < 0.1) {
        stopSpinning();
      }
    }, 10);
  };

  const stopSpinning = () => {
    setIsSpinning(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => {
      startSpinning();
    };
  }, []);

  const handleButtonClick = () => {
    startSpinning();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSpinning) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const newAngle = Math.atan2(y, x) * (180 / Math.PI) + 180; // Calculate angle in degrees
      setAngle(newAngle);
    }
  };

  return (
    <div
      className="w-96 h-96 bg-neutral-900 rounded-full absolute scale-150 left-[40%] top-20 overflow-hidden mt-48 flex items-center justify-center shadow-lg shadow-white"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          width: 0,
          height: 0,
          borderLeft: "4.2rem solid transparent",
          borderRight: "4.2rem solid transparent",
          borderBottom: "10rem solid rgba(255, 255, 255, 0.3)",
          transform: `rotate(${angle}deg) translateX(50%)`,
          transition: isSpinning ? "none" : "transform 2s ease-out",
        }}
      ></div>
      <div
        className="absolute overflow-hidden"
        style={{
          width: 0,
          height: 0,
          borderLeft: "4.2rem solid transparent",
          borderRight: "4.2rem solid transparent",
          borderBottom: "10rem solid rgba(255, 255, 255, 0.3)",
          transform: `rotate(${angle + 180}deg) translateX(50%)`,
          transition: isSpinning ? "none" : "transform 2s ease-out",
        }}
      ></div>
      <div className="w-80 h-80 bg-neutral-900 border-2 rounded-full border-gray-700 flex items-center justify-center">
        <div className="w-64 h-64 bg-neutral-900 border-2 rounded-full border-gray-700 flex items-center justify-center">
          <div className="w-52 h-52 bg-neutral-400 border-2 rounded-full border-gray-700 flex items-center justify-center z-50">
            <button
              onClick={handleButtonClick}
              className="text-4xl text-slate-700 font-bold focus:outline-none flex flex-col items-center hove:cursor-pointer z-50"
            >
              <p>Explore</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vinyl;
