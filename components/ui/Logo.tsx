import React from "react";
const logo = "/images/logo.webp";

export const Logo: React.FC<{ className?: string }> = ({
  className = "w-8 h-8",
}) => {
  return (
    // image preserves size, rounded corners and covers the box
    <img
      src={logo}
      className={`${className} rounded-lg object-cover`}
      alt="Kortio logo"
    />
  );
};
