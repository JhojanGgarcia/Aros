"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ColorsBox } from "@/utils/ColorsBox";
import { SvgList } from "@/utils/SvgList";
import MockupsCard from "./UI/MockupsCard";
import "@/styles/inputRange.css";
import "@/styles/scrollbar.css";
import "@/styles/inputColors.css";

export default function Sidebar() {
  const [thickness, setThickness] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [color, setColor] = useState("#009ec7");
  const [name, setName] = useState("Aros");
  const [showModal, setShowModal] = useState(false);
  const [selectedSvg, setSelectedSvg] = useState(SvgList[0]);
  const [downloadSvg, setDownloadSvg] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, setShowModal]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleThicknessChange = (event) => {
    const currentValue = event.target.value;
    setThickness(currentValue);
  };

  const handleRotationChange = (event) => {
    const currentValue = event.target.value;
    setRotation(currentValue);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSvgSelect = (svg) => {
    setSelectedSvg(svg);
    setShowModal(false);
  };

  const handleDownloadSvg = () => {
    const { name, SvgString } = selectedSvg;
    const svgString = SvgString({
      color,
      rotation,
      thickness,
      width: 30,
      height: 30,
    });
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = svgUrl;
    link.download = `${name}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="h-full min-w-full  overflow-y-auto border-r border-white/5 drop-shadow-sm md:min-w-[240px] md:max-w-xs">
        <nav className="flex items-start over justify-between px-2 pt-6 md:flex border-b border-white/5">
          <h1 className="mb-6 text-lg flex items-center over font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 520 512"
              fill="none"
            >
              <g filter="url(#filter0_i_319_903)">
                <path
                  d="M100 394L190.538 328.028L258.137 226.56L324.942 328.028L419 394L309.855 118L209.145 118L100 394ZM190.538 328.028L258.756 166.875L324.942 328.028L258.137 226.56L190.538 328.028Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_319_903"
                  x="0"
                  y="-30"
                  width="520"
                  height="542"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="-30" />
                  <feGaussianBlur stdDeviation="41.65" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.74 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_319_903"
                  />
                </filter>
              </defs>
            </svg>
            <span className="w-10 h-10 absolute top-0 left-0 blur-2xl bg-white/30"></span>
            <a href="/">Aros</a>
            <div className="inline-flex animate-shine items-center mb-2 ml-1 justify-center rounded-full text-xs border border-neutral-800 bg-[linear-gradient(120deg,#0001,45%,#fff5 50%,50%,#0001)] bg-[length:200%_100%] px-2 py-1 font-medium text-neutral-400 transition-colors">
              Beta
            </div>
          </h1>
        </nav>
        <InputControl name={name} handleNameChange={handleNameChange} />
        <div className="border-px mx-auto ">
          <RotationControl
            inputValue={rotation}
            handleRotationChange={handleRotationChange}
          />
          <ThicknessControl
            inputValue={thickness}
            handleThicknessChange={handleThicknessChange}
          />
          <ColorsControl color={color} handleColorChange={handleColorChange} />
        </div>
        <Footer />
      </aside>
      <main className="flex-1  mx-auto overflow-auto">
        <header className="flex items-center  w-full h-[89px] border-b z-50 border-white/5 fixed top-0 backdrop-blur-xl">
          <button
            onClick={() => setShowModal(true)}
            className="ml-4 flex items-center gap-2 border bg-[radial-gradient(circle_at_top,rgba(250,250,250,0.05)_0%,transparent_60%)] border-white/5 p-2  rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#fff"
              fill="none"
            >
              <path
                d="M15.5 6.5C15.5 8.433 13.933 10 12 10C10.067 10 8.5 8.433 8.5 6.5C8.5 4.567 10.067 3 12 3C13.933 3 15.5 4.567 15.5 6.5Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M22 17.5C22 19.433 20.433 21 18.5 21C16.567 21 15 19.433 15 17.5C15 15.567 16.567 14 18.5 14C20.433 14 22 15.567 22 17.5Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M9 17.5C9 19.433 7.433 21 5.5 21C3.567 21 2 19.433 2 17.5C2 15.567 3.567 14 5.5 14C7.433 14 9 15.567 9 17.5Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            Choose a Logo
          </button>
          <button
            onClick={handleDownloadSvg}
            className="ml-4 flex items-center gap-2 border bg-[radial-gradient(circle_at_bottom,rgba(250,250,250,0.05)_0%,transparent_60%)] border-white/5 p-2  rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#fff"
              fill="none"
            >
              <path
                d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Download
          </button>
        </header>
        <div className="max-w-7xl mx-auto py-24">
          <MockupsCard
            name={name}
            colorSelection={color}
            rotationSelection={rotation}
            thicknessSelection={thickness}
            selectedSvg={selectedSvg}
          />
        </div>
      </main>
      {showModal && (
        <div
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative  rounded-lg p-4 w-full max-w-md z-10">
            <ul className="mt-4 relative grid bg-[radial-gradient(circle_at_top,rgba(250,250,250,0.1)_0%,transparent_60%)] border border-white/5 bg-black p-6 rounded-3xl grid-cols-4 place-items-center">
              <span class="absolute  w-full mx-auto inset-x-1 top-0 h-px bg-gradient-to-r from-fuchsia-400/0 via-white/10 to-fuchsia-400/0"></span>
              {SvgList.map((svg) => (
                <button
                  type="button"
                  onClick={() => handleSvgSelect(svg)}
                  key={svg.id}
                  className="py-2 opacity-50 hover:scale-110 transition-all duration-500" 
                >
                  {svg.Svg({ color: "#fff", rotation: 0, thickness: 0 })}
                </button>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="flex mt-16 items-center justify-center p-4  border-white/5">
      <span className="text-sm flex gap-2 items-center flex-col font-medium">
        <a
          href="https://github.com/JhojanGgarcia/Aros"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/5 p-1 bg-[radial-gradient(circle_at_bottom,rgba(250,250,250,0.05)_0%,transparent_60%)] rounded-lg text-white/50 hover:text-white transition-all duration-500 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#fff"
            fill="none"
            opacity="0.5"
          >
            <path
              d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Stars on Github
        </a>
        <a
          href="https://www.producthunt.com/posts/aros-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-aros&#0045;2"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=490273&theme=neutral"
            alt="Aros - SVG&#0032;logo&#0032;library&#0046;&#0032;Customize&#0032;colors&#0044;&#0032;rotation&#0044;&#0032;and&#0032;stroke&#0046; | Product Hunt"
            width="150"
            height="54"
          />
        </a>
      </span>
    </footer>
  );
};

const InputControl = ({ name, handleNameChange }) => {
  return (
    <div className="md:mt-4 mt-6 p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Name</span>
      </div>
      <div className="rounded-lg p-1 flex justify-between">
        <input
          maxLength="10"
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder="Your logo name"
          className="bg-transparent text-white outline-none placeholder:text-white/40 relative flex items-center border border-white/5 w-full rounded-xl p-2 transition-opacity duration-500"
        />
      </div>
    </div>
  );
};

const RotationControl = ({ inputValue, handleRotationChange }) => {
  return (
    <div className="mb-4 flex flex-col py-5 border-t p-4 border-white/5">
      <span className="text-sm font-medium mb-2 flex items-center gap-2">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          color="#fff"
          opacity="0.5"
          fill="none"
        >
          <path
            d="M15 17C18.2998 17 19.9497 17 20.9749 15.9749C22 14.9497 22 13.2998 22 10C22 6.70017 22 5.05025 20.9749 4.02513C19.9497 3 18.2998 3 15 3C11.7002 3 10.0503 3 9.02513 4.02513C8 5.05025 8 6.70017 8 10C8 13.2998 8 14.9497 9.02513 15.9749C10.0503 17 11.7002 17 15 17Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 14.4201L3.11013 13.0744C3.70104 12.3581 3.99649 12 4.36364 12L4.36364 13C4.36364 16.7712 4.36364 18.6569 5.53521 19.8284C6.70678 21 8.5924 21 12.3636 21L13 21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Rotation
      </span>
      <label className="slider relative flex gap-6">
        <input
          type="range"
          max="360"
          value={inputValue}
          onChange={handleRotationChange}
          className="level"
        />

        <span className="absolute right-2 pointer-events-none">
          {inputValue}°
        </span>
      </label>
    </div>
  );
};

const ThicknessControl = ({ inputValue, handleThicknessChange }) => {
  return (
    <div className="mb-4 flex flex-col py-3 border-t p-4 border-white/5">
      <span className="text-sm font-medium mb-5 flex items-center">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          color="#fff"
          opacity="0.5"
          fill="none"
        >
          <path
            d="M6 22V13.6944C6 12.1287 6 11.3459 6.21454 10.6077C6.42908 9.86948 6.84589 9.21812 7.6795 7.91542L10.3359 3.76419C11.0885 2.58806 11.4648 2 12 2C12.5352 2 12.9115 2.58806 13.6641 3.76419L16.3205 7.91542C17.1541 9.21812 17.5709 9.86948 17.7855 10.6077C18 11.3459 18 12.1287 18 13.6944V22"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 11C7.63152 11.3231 8.4887 11.9732 9.28009 11.9991C10.2988 12.0324 10.9868 11.1372 12 11.1372C13.0132 11.1372 13.7012 12.0324 14.7199 11.9991C15.5113 11.9732 16.3685 11.3231 17 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 12L12 22"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 5H14"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Thickness
      </span>
      <label className="slider relative flex gap-6">
        <input
          type="range"
          value={inputValue}
          onChange={handleThicknessChange}
          min="0"
          max="2"
          step="0.01"
          className="level"
        />
        <span className="absolute right-2 pointer-events-none">
          {inputValue}°
        </span>
      </label>
    </div>
  );
};

const ColorsControl = ({ color, handleColorChange }) => {
  const handleColorOptionClick = (color) => {
    handleColorChange({ target: { value: color } });
  };

  return (
    <div className="colors-control flex flex-col gap-5 p-4 border-b border-t border-white/5">
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#fff"
          opacity="0.5"
          fill="none"
        >
          <path
            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.8417 22 14 22.1163 14 21C14 20.391 13.6832 19.9212 13.3686 19.4544C12.9082 18.7715 12.4523 18.0953 13 17C13.6667 15.6667 14.7778 15.6667 16.4815 15.6667C17.3334 15.6667 18.3334 15.6667 19.5 15.5C21.601 15.1999 22 13.9084 22 12Z"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M7 15.002L7.00868 14.9996"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="9.5"
            cy="8.5"
            r="1.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <circle
            cx="16.5"
            cy="9.5"
            r="1.5"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
        Choose a Color
      </p>
      <label className="switch-color bg-[radial-gradient(circle_at_top,rgba(250,250,250,0.05)_0%,transparent_60%)] flex items-center justify-center gap-6 border rounded-md p-1 border-white/5">
        <input
          type="color"
          value={color} // Actualiza el valor del input de tipo color
          onChange={handleColorChange}
          style={{ background: color }}
          className="color-picker"
        />
        <motion.span
          key={color}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {color}
        </motion.span>
      </label>
      Solid Colors
      <div className="color-palette mt-3 flex flex-wrap items-center justify-center gap-2">
        {ColorsBox.map((colorOption, index) => (
          <div
            key={index}
            className="color-option h-8 w-8 cursor-pointer rounded-full"
            style={{ backgroundColor: colorOption }}
            onClick={() => handleColorOptionClick(colorOption)}
          ></div>
        ))}
      </div>
    </div>
  );
};
