"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "@/styles/mask.css";
export default function MockupsCard({
  colorSelection,
  rotationSelection,
  thicknessSelection,
  name,
  selectedSvg,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [positions, setPositions] = useState({});
  const [opacities, setOpacities] = useState({});

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPositions((prevPositions) => ({
      ...prevPositions,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setOpacities((prevOpacities) => ({
      ...prevOpacities,
      [index]: 1,
    }));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setOpacities((prevOpacities) => ({
      ...prevOpacities,
      [hoveredIndex]: 0,
    }));
  };

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at bottom, ${colorSelection}  -1000%, transparent 90%)`,
  };
  const DoublegradientStyle = {
    backgroundImage: `radial-gradient(circle at bottom right, ${colorSelection}  -1000%, transparent 50%), radial-gradient(circle at top left, ${colorSelection}  -1000%, transparent 60%)`,
  };
  const svgProps = {
    color: colorSelection,
    rotation: rotationSelection,
    thickness: thicknessSelection,
    width: "40px",
    height: "40px",
  };
  const boxStyle =
    "border border-white/5 relative overflow-hidden rounded-xl border-white/5 min-w-[250px] min-h-[250px] rounded-xl flex flex-col items-center justify-center";

  return (
    <div className="m:p-10 h-full overflow-x-auto  scrollbar p-4">
      <div className="m-auto grid w-full min-w-full max-w-5xl auto-cols-auto grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 pb-0 lg:min-w-[900px]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            className={`${boxStyle} ${
              i === 0
                ? "col-span-1"
                : "" || i === 1
                ? "col-span-1"
                : "" || i === 1
                ? "row-span-2 "
                : "" || i === 3
            } `}
          >
            <input
              disabled={hoveredIndex !== i}
              style={{
                border: "1px solid rgb(255 255 255 / .2)",
                opacity: hoveredIndex === i ? opacities[i] : 0,
                WebkitMaskImage: `radial-gradient(30% 30px at ${
                  positions[i]?.x || 0
                }px ${positions[i]?.y || 0}px, black 45%, transparent)`,
              }}
              aria-hidden="true"
              className=" pointer-events-none absolute left-0 top-0 z-10 h-full w-full cursor-default rounded-xl border bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
            />

            {i === 0 && (
              <div
                class={`flex h-full w-full bg-[radial-gradient(circle_at_top,rgba(250,250,250,0.05)_0%,transparent_60%)] items-center justify-center`}
              >
                <div class="mt-2 flex mask items-center justify-center h-14 w-14">
                  {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={40} 
                      height={40} 
                    />
                  )}
                </div>
                <span class="pl-2 text-5xl font-bold tracking-tighter"></span>
              </div>
            )}
            {i === 1 && (
              <div
                style={DoublegradientStyle}
                class={`flex h-full w-full items-center justify-center`}
              >
                <div class="mt-2 flex items-center justify-center h-14 w-14">
                {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={40} 
                      height={40} 
                    />
                  )}
                </div>
                <motion.p
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,

                    bounce: 0.4, // Efecto de rebote al caer
                  }}
                  className="text-2xl font-bold"
                >
                  {name.split("").map((letter, index) => (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={index}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.p>

                <span class="pl-2 text-5xl font-bold tracking-tighter"></span>
              </div>
            )}
            {i === 2 && (
              <div className="relative h-full w-full select-none rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="absolute bottom-0 right-0">
                  <img
                    src="/context-chrome.png"
                    alt="context chrome"
                    className="w-[500px]"
                  />
                  <div className="absolute left-[41%] top-[24%] flex items-center">
                    <div className="h-6 w-6">
                    {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={25} 
                      height={25} 
                    />
                  )}
                    </div>
                    <span className="pl-[8px] text-[20px]  text-black">
                      {name}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {i === 3 && (
              <div className="relative h-full w-full rounded-xl  shadow-sm overflow-hidden flex items-center justify-center">
                <img
                  src="/iphone.png"
                  alt="context app"
                  className="  h-full max-w-[110%]  object-contain"
                />

                <div className=" bg-white backdrop-blur-3xl absolute flex items-center justify-center w-[24%] h-[26%]    left-[32%] top-[28%] rounded-[23%]">
                {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={60} 
                      height={60} 
                    />
                  )}
                </div>
              </div>
            )}
            {i === 4 && (
              <div className="relative rounded-b  flex h-full w-full items-center justify-center">
                <div
                  style={{ backgroundColor: colorSelection }}
                  className="absolute inset-0 opacity-10"
                />
                <div className="relative mt-2 flex items-center justify-center h-14 w-14">
                {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={40} 
                      height={40} 
                    />
                  )}
                </div>
                <span className="pl-2 text-5xl font-bold tracking-tighter"></span>
              </div>
            )}
            {i === 5 && (
              <div
                style={gradientStyle}
                class={`flex-col flex h-full w-full   items-center justify-center`}
              >
                <div class="mt-2 flex items-center justify-center gap-8 ">
                {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={30} 
                      height={30} 
                    />
                  )}
                  {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={40} 
                      height={40} 
                    />
                  )}
                  {selectedSvg && selectedSvg.Svg && (
                    <selectedSvg.Svg
                      color={colorSelection}
                      rotation={rotationSelection}
                      thickness={thicknessSelection}
                      width={50} 
                      height={50} 
                    />
                  )}
                </div>

                <span class="pl-2  text-5xl font-bold tracking-tighter"></span>
                <motion.p
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    bounce: 0.4,
                    staggerChildren: 0.1,
                  }}
                  className="text-sm absolute bottom-6 font-medium"
                >
                  {`www.${name}.com`.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                    >
                      {letter.toLowerCase()}
                    </motion.span>
                  ))}
                </motion.p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
