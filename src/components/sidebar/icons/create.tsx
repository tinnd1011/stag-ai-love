import React from "react";

const IconCreate = ({ isActive }: { isActive: boolean }) => {
  const colorStroke = isActive ? "#fff" : "#1b1b1b";

  const colorFill = !isActive ? "#fff" : "#1b1b1b";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={colorFill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        stroke={colorStroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16"
        stroke={colorStroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V8"
        stroke={colorStroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCreate;
