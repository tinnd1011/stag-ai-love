import { useEffect, useRef, useState } from "react";

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const CustomSlider = ({
  value,
  onChange,
  min = 0,
  max = 100,
}: CustomSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateValue = (e: { clientX: number }) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      const newValue = Math.round((percentage / 100) * (max - min) + min); // Changed to round
      onChange(newValue);
    }
  };

  // Rest of the code remains the same
  const handleMouseDown = (e: { clientX: number }) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: { clientX: number }) => {
    if (isDragging) {
      updateValue(e);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className="relative h-2 mt-4 cursor-pointer w-full"
      onMouseDown={handleMouseDown}
    >
      <div className="absolute w-full h-full bg-gray-200 rounded-full" />
      <div
        className="absolute h-full bg-black rounded-full"
        style={{ width: `${percentage}%` }}
      />
      <div
        className="absolute w-[30px] h-[30px] -mt-[13px] bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 flex items-center justify-center"
        style={{ left: `${percentage}%` }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
      >
        <div className="w-4 h-4 bg-[#FF306E] rounded-full" />
      </div>
    </div>
  );
};

export default CustomSlider;
